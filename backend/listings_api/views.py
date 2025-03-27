from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import AirbnbListing
from .serializers import AirbnbListingSerializer

# Create your views here.

class AirbnbListingViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Airbnb listings
    """
    queryset = AirbnbListing.objects.all().order_by('-created_at')
    serializer_class = AirbnbListingSerializer

    def create(self, request, *args, **kwargs):
        # Check if data is a list (bulk create) or a single object
        if isinstance(request.data, list):
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
        # Default single object creation
        return super().create(request, *args, **kwargs)
