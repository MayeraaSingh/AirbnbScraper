$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    title = "Cozy Beach Studio"
    location = "Miami, FL"
    address = "123 Ocean Drive, Miami, FL 33139"
    price_per_night = 120.00
    currency = "USD" 
    total_price = 350.00
    image_urls = @("https://images.unsplash.com/photo-1560448204-603b3fc33bd5", "https://images.unsplash.com/photo-1564078516393-cf04bd966897")
    rating = 4.85
    description = "Enjoy this beautiful beachfront studio with stunning ocean views. Perfect for a weekend getaway."
    number_of_reviews = 32
    amenities = @("Wifi", "Air conditioning", "Kitchen", "Beach access")
    host_name = "Sarah"
    host_image = "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    host_since = "2018"
    property_type = "Apartment"
}

$jsonBody = $body | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/listings/" -Method Post -Headers $headers -Body $jsonBody 