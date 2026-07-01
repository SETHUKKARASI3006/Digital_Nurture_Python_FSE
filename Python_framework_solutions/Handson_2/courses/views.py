from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def hello_view(request):
    return HttpResponse("<h1> Course Management API is running </h1>")