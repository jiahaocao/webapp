from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo, Product, Criteria
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
        })
    return HttpResponse(json.dumps(response))

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
    return json.dumps(out)

def criteria(request):
    return HttpResponse(get_data())


