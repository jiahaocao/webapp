from ..models import Criteria, Subcriteria, Variable
from django.http import HttpResponse
import json

def get_goaltree_asdict():
    root = {
        'key': 'root',
        'title': 'Root',
        'text': '',
        'children': [],
    }
    for cri in Criteria.objects.all():
        root['children'].append(cri.to_dict())
    return root

def get_goaltree_astree():
    pass


def criteria(request):
    root = get_goaltree_asdict()
    return HttpResponse(json.dumps(root))
