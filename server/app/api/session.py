import os
from flask import Blueprint

session_routes = Blueprint("session", __name__)

@session_routes.route('/map-api-token', methods=["GET"])
def map_api_token():
    return { "api_key": os.getenv("GOOGLE_MAPS_API_KEY") }