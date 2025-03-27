from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AirbnbListingViewSet

router = DefaultRouter()
router.register(r'listings', AirbnbListingViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 