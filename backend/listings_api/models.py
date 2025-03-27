from django.db import models

# Create your models here.

class AirbnbListing(models.Model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    address = models.TextField()
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image_urls = models.JSONField(default=list)
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    description = models.TextField()
    number_of_reviews = models.IntegerField(default=0)
    amenities = models.JSONField(default=list)
    host_name = models.CharField(max_length=255)
    host_image = models.URLField(max_length=1000, null=True, blank=True)
    host_since = models.CharField(max_length=100, null=True, blank=True)
    property_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
