from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'header', HeaderViewSet),
router.register(r'ContactNumber', ContactNumberViewSet),
router.register(r'EmailAddress', EmailViewSet),
router.register(r'StotraAndStutiCategory', StotraAndStutiCategoryViewSet),
router.register(r'StotraAndStuti', StotraAndStutiViewSet),

urlpatterns = [
    path('', include(router.urls)),
    
]

