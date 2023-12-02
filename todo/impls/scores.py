from django.views.decorators.csrf import csrf_exempt
from ..models import Product, Criteria, Subcriteria, Variable
from django.http import HttpResponse

import re
import json
import inspect

from .criteria import get_goaltree_asdict
from .treenode import TreeNode

################################################################################

def make_partial_tree(tree, udata):
    key = tree["key"]
    if key not in udata:
        return None

    if key == "root":
        root = TreeNode("root", 5)
        root.weight = 1.0
        for child in tree["children"]:
            sub_tree = make_partial_tree(child, udata)
            if sub_tree is not None:
                root.add(sub_tree)
        return root

    if   key.startswith('cri'): model = Criteria
    elif key.startswith('sub'): model = Subcriteria
    elif key.startswith('var'): model = Variable

    obj = model.objects.get(pk=int(key[3:]))
    node = TreeNode(obj, int(udata[key]))

    for child in tree["children"]:
        sub_tree = make_partial_tree(child, udata)
        if sub_tree is not None:
            node.add(sub_tree)
    return node

def compute_weights(udata):
    structure = get_goaltree_asdict()
    root = make_partial_tree(structure, udata)
    root.compute_weights()

    leaves = root.sort_leaves()
    leaves = sorted(leaves, key=lambda x: x[1], reverse=True)
    leaves = [(a.title, b) for a, b in leaves]
    return leaves

################################################################################
# Each node has 5 properties: key, title, text, func, children.

def traverse(root):
    def traverse_acc(root, acc):
        acc.append({
            'key': root['key'],
            'func': root['func'],
        })
        for child in root['children']:
            traverse_acc(child, acc)
    acc = []
    traverse_acc(root, acc)
    return acc

def get_util_nodes():
    nodes = []
    for cri in Criteria.objects.all():
        nodes += traverse(cri.to_dict())
    util_nodes = [node for node in nodes if node['func']]
    return util_nodes

################################################################################

def parse_function_body(body, goalname):
    # Find all variables, which are inside double curly braces.
    variables = re.findall("{{\s*[a-zA-Z0-9]+\s*}}", body)
    variables = set(variables)

    # Rename variables, save them as parameters.
    parameters = []
    for var in variables:
        param = var
        param = param[2:-2]       # remove curly braces
        param = param.upper()     # rename to upper case
        parameters.append(param)

    # Replace variables in the function body by their new names.
    for var, param in zip(variables, parameters):
        body = body.replace(var, param)

    # Find all meta functions, which are inside double square brackets.
    metafuncs = re.findall("\[\[.\s*[a-z0-9]+\s*\]\]", body)

    if metafuncs:
        # Compute meta function values.
        products = Product.objects.all()
        values = [json.loads(prod.aux)[goalname] for prod in products]

        field_min = min(values)
        field_max = max(values)

        # Replace meta function values.
        for meta in metafuncs:
            if meta == '[[.min]]': body = body.replace(meta, str(field_min))
            if meta == '[[.max]]': body = body.replace(meta, str(field_max))

    return body, parameters

def create_function(text, goalname):
    # The identifier x is present in every function.
    body, parameters = parse_function_body(text, goalname)
    parameters.insert(0, 'X')

    # Create Python code.
    code = 'def {}'.format("foo")
    code += '({}):\n'.format(', '.join(parameters))
    for line in body.split('\n'):
        code += "    {}\n".format(line.rstrip())
    code += "    return Y\n"
    return code

################################################################################

def realize_utility_functions(util_nodes):
    util_code = {}
    utility_functions = {}

    for node in util_nodes:
        if (node['key'].startswith('cri')): model = Criteria
        elif (node['key'].startswith('sub')): model = Subcriteria
        else: model = Variable

        pk = int(node['key'][3:])
        obj = model.objects.get(pk=pk)
        goalname = obj.title
        
        code = create_function(node['func'], goalname)
        util_code[goalname] = code

        code += 'utility_functions["{}"] = foo'.format(goalname)
        exec(code)

    return utility_functions


# budget, systemPref, sizePref, weightPref, brandPref.

def getargs(body):
    request_data = json.loads(body)
    uargs = {key.upper(): val for key, val in request_data['inputs'].items()}
    return uargs

# 1. retrieve weights (leaf nodes only)
# 2. search request body for function arguments
# 3. compute utility values
# 4. compute final scores
# 5. sort products

@csrf_exempt
def result(request):

    ########## utility functions ###############

    util_nodes = get_util_nodes()
    utility_functions = realize_utility_functions(util_nodes)

    ########## weights ###############

    request_data = json.loads(request.body)
    udata = request_data['ratings']
    udata["root"] = "5"

    weights = compute_weights(udata)
    uargs = getargs(request.body)

    ###################################

    scores = {}
    for prod in Product.objects.all():
        score = compute_score(prod, weights, utility_functions, uargs)
        scores[prod.model] = score

    scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    highest = max([s[1] for s in scores])
    scores = [(goalname, s / highest) for (goalname, s) in scores]

    obj = {'weights': weights, 'scores': scores}
    return HttpResponse(json.dumps(obj))

def compute_score(prod, weights, utility_funcs, uargs):
    aux = json.loads(prod.aux)

    scores = {}
    for goalname, weight in weights:
        func = utility_funcs[goalname]

        params = inspect.signature(func).parameters
        params = [t[0] for t in params.items()]

        arguments = {'X': aux[goalname]}
        for param in params[1:]:
            arguments[param] = uargs[param]

        score = func(**arguments)
        score = max(score, 0)
        scores[goalname] = score

    final_score = 0
    for (goalname, weigth) in weights:
        final_score += scores[goalname] * weight
    
    return final_score

