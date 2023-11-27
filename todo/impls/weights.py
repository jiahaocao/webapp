from django.views.decorators.csrf import csrf_exempt
from ..models import Criteria, Subcriteria, Variable
from django.http import HttpResponse
import json

from .treenode import TreeNode
from .criteria import get_goaltree_asdict

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

@csrf_exempt
def weights(request):
    request_data = json.loads(request.body)
    udata = request_data['ratings']
    udata["root"] = "5"

    leaves = compute_weights(udata)
    print(leaves)

    obj = {"result": leaves}

    return HttpResponse(json.dumps(obj))

