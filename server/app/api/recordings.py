import requests
import os
from flask import Blueprint, request

recording_routes = Blueprint('recordings', __name__)

@recording_routes.route('/', methods=["POST"])
def create_recording():
    pass