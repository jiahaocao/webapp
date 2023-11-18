from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo, Product, Criteria, Subcriteria, Variable
from django.http import HttpResponse
import json

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

def product_image(request, pk):
    prod = Product.objects.get(pk=pk)
    with open(prod.image.path, "rb") as f:
        return HttpResponse(f.read(), content_type="image/jpeg")

def product_index(request):
    products = Product.objects.all()
    response = {'results': []}
    for prod in products:
        response['results'].append({
            'id': prod.pk,
            'brand': prod.brand,
            'model': prod.model,
            'system': prod.system,
            'price': prod.price,
            'ram': prod.ram,
            'rom': prod.rom,
        })
    return HttpResponse(json.dumps(response))

################################################################################



################################################################################

class Node:
    def __init__(self, val):
        self.val = val
        self.rating = 0
        self.weight = 0
        self.children = {}

    def addchild(self, child):
        self.children[child.pk] = Node(child)

    def __getitem__(self, key):
        return self.children[key]

    def __str__(self):
        text = str(self.val) + '\n'
        for key, child in self.children.items():
            text += str(child)
        return text

def get_data():
    out = {
        'key': 'root',
        'title': 'Root',
        'text': '',
        'children': [],
    }
    for cri in Criteria.objects.all():
        out['children'].append(cri.to_dict())
    return out

def criteria(request):
    out = get_data()
    return HttpResponse(json.dumps(out))


################################################################################

class TreeNode:
    def __init__(self, obj, rating):
        self.obj = obj
        self.rating = rating
        self.weight = 0
        self.children = []

    def add(self, obj):
        self.children.append(obj)

    def __str__(self):
        out = '(' + str(self.obj) + ','
        out += str(self.rating) + ')'
        for child in self.children:
            out += str(child)
        return out

    def sort_leaves(self):
        def helper(root, result):
            if not root.children:
                result.append((root.obj, root.weight))
                return
            for child in root.children:
                helper(child, result)
        result = []
        helper(self, result)
        return result

    def compute_weights(self):
        total = sum([x.rating for x in self.children])
        for child in self.children:
            child.weight = self.weight * child.rating / total
            child.compute_weights()
        return 0


def make_tree(structure, udata):
    key = structure["key"]
    if key not in udata:
        return None

    if key == "root":
        root = TreeNode("root", 5)
        root.weight = 1.0
        for child in structure["children"]:
            sub_tree = make_tree(child, udata)
            if sub_tree is not None:
                root.add(sub_tree)
        return root

    if   key.startswith('cri'): model = Criteria
    elif key.startswith('sub'): model = Subcriteria
    elif key.startswith('var'): model = Variable

    obj = model.objects.get(pk=int(key[3:]))
    node = TreeNode(obj, int(udata[key]))

    for child in structure["children"]:
        sub_tree = make_tree(child, udata)
        if sub_tree is not None:
            node.add(sub_tree)
    return node

@csrf_exempt
def weights(request):

    structure = get_data()

    request_data = json.loads(request.body)
    udata = request_data['ratings']
    udata["root"] = "5"

    root = make_tree(structure, udata)

    root.compute_weights()

    leaves = root.sort_leaves()
    leaves = sorted(leaves, key=lambda x: x[1], reverse=True)

    obj = {"result": []}
    for leaf in leaves:
        obj["result"].append((str(leaf[0]),  leaf[1]))

    return HttpResponse(json.dumps(obj))


################################################################################

def parse_function_body(body):
    # Find all variables, which are inside double curly braces.
    variables = re.findall("{{\s*[a-z0-9]+\s*}}", body)

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

    return body, parameters

def create_function(text):
    # The identifier x is present in every function.
    body, parameters = parse_function_body(text)
    parameters.insert(0, 'x')

    # Create Python code.
    code = 'def foo({}):\n'.format(', '.join(parameters))
    for line in body.split('\n'):
        code += "    {}\n".format(line)
    code += "    return y\n"
    return code


