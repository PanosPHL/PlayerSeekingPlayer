from math import pi, asin, sin, cos, acos

R = 6371

def reverse_haversine(target_distance, lat, lng):
    # Convert miles to km
    km_distance = target_distance * 1.609344

    # Convert lat and lng to radians
    lat_radians = lat * (pi/180)
    lng_radians = lng * (pi/180)
    r = km_distance / R

    # Calculating min and max latitudes
    min_lat = lat_radians - r
    max_lat = lat_radians + r

    # Calculating min and max longitudes
    lat_t = asin(sin(lat_radians)/cos(r))
    d_lng = asin(sin(r) / cos(lat_radians))
    min_lng = lng_radians - d_lng
    max_lng = lng_radians + d_lng

    return {
        "min_lat": (min_lat * 180) / pi,
        "max_lat": (max_lat * 180) / pi,
        "min_lng": (min_lng * 180) / pi,
        "max_lng": (max_lng * 180) / pi
    }

print(reverse_haversine(target_distance=10, lat=34.05223, lng=-118.24368))