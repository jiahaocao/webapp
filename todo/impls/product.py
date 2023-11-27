from django.http import HttpResponse
from ..models import Product
import json

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

def product_image(request, pk):
    prod = Product.objects.get(pk=pk)
    with open(prod.image.path, "rb") as f:
        return HttpResponse(f.read(), content_type="image/jpeg")