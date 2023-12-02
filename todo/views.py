from django.http import HttpResponse

from .impls.product import product_index
from .impls.product import product_image
from .impls.criteria import criteria
from .impls.weights import weights
from .impls.scores import result

def goaltree(request):
    url = "product/goaltree.svg"
    with open(url, "rb") as f:
        return HttpResponse(f.read(), content_type="image/svg+xml")

