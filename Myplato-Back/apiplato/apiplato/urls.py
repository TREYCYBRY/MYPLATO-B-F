
from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from api import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('api.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
