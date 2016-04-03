from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required()
def home(request):
    """
    Controller for the app home page.
    """
    context = {}

    return render(request, 'hiking_app_js/home.html', context)

def viewshed(request):
    """
    Controller for the app home page.
    """
    context = {}

    return render(request, 'hiking_app_js/viewshed.html', context)


def bufferpoint(request):
    """
    Controller for the app home page.
    """
    context = {}

    return render(request, 'hiking_app_js/bufferpoint.html', context)

def hikingmap(request):
    """
    Controller for the app home page.
    """
    context = {}

    return render(request, 'hiking_app_js/hikingmap.html', context)