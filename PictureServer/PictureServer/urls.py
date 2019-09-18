"""PictureServer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from mainapp.views import get_index,get_upload,testbutton,get_pic_api,delet_pic_api,upload_pic

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index',get_index),
    path('upload',get_upload),
    path('testbutton',testbutton),
    path('api/get_pic',get_pic_api),
    path('api/del_pic',delet_pic_api),
    path('api/upload_pic',upload_pic)
]
