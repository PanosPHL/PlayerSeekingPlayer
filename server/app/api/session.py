import os
from flask import Blueprint, make_response
from flask_wtf.csrf import generate_csrf

session_routes = Blueprint("session", __name__)

@session_routes.route('/map-api-token', methods=["GET"])
def map_api_token():
    return { "api_key": os.getenv("GOOGLE_MAPS_API_KEY") }

@session_routes.route('/csrf', methods=["GET"])
def csrf():
    res = make_response()
    res.set_cookie("XSRF-TOKEN", generate_csrf())
    return res