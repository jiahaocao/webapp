from django.urls import path, include
from . import views

urlpatterns = [
    path('product/', views.product_index, name="product_index"),
    path('product/<int:pk>/', views.product_image, name="product_image"),
    path('criteria/', views.criteria, name="criteria"),
    path('weights/', views.weights, name="weights"),
    #path('product_info/', views.product_info, name="product_info"),
]


