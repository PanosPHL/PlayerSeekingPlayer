import os
from sqlalchemy import between, and_
from flask import Blueprint, make_response, request
from flask_wtf.csrf import generate_csrf
from flask_login import login_user, current_user, logout_user
from datetime import timedelta
from werkzeug.datastructures import MultiDict
from app.models import User, Instrument, Style, Recording, profile_instruments
from app.auth import login_manager
from app.forms import LoginForm, SearchForm
from app.utils.distance import reverse_haversine

session_routes = Blueprint("session", __name__)

@session_routes.route('/login', methods=["PUT"])
def login():
    data = MultiDict(mapping=request.json)
    form = LoginForm(data)
    if form.validate():
        user = User.query.filter(User.email == data["email"]).first()
        if user and user.check_password(data["password"]):
            login_user(user, remember=True, duration=timedelta(days=7))
            return { "id": user.to_dict()["id"] }
        else:
            res = make_response({ "errors": ["Invalid credentials"] }, 401)
            return res
    else:
        errors = []
        for error in form.errors:
            errors += form.errors[error]
        res = make_response({ "errors": errors }, 401)
        return res

@session_routes.route('/logout', methods=["PUT"])
def logout():
    logout_user()
    return { "message": "User successfully logged out" }


@session_routes.route('/data', methods=["GET"])
def data():
    data_dict = dict()
    users = User.query.all()
    instruments = Instrument.query.all()
    styles = Style.query.all()
    recordings = Recording.query.all()
    data_dict["users"] = list()
    data_dict["instruments"] = list()
    data_dict["styles"] = list()
    data_dict["recordings"] = list()
    for user in users:
        user_dict = user.to_dict()
        profile = user.profile
        user_dict["profileInfo"] = profile[0].to_dict()
        data_dict["users"].append(user_dict)
    for instrument in instruments:
        instrument_dict = instrument.to_dict()
        data_dict["instruments"].append(instrument_dict)
    for style in styles:
        style_dict = style.to_dict()
        data_dict["styles"].append(style_dict)
    for recording in recordings:
        recording_dict = recording.to_dict()
        data_dict["recordings"].append(recording_dict)
    return data_dict

@session_routes.route('/map-api-token', methods=["GET"])
def map_api_token():
    return { "api_key": os.getenv("GOOGLE_MAPS_API_KEY") }

@session_routes.route('/csrf', methods=["GET"])
def csrf():
    res = make_response()
    res.set_cookie("XSRF-TOKEN", generate_csrf())
    return res

@session_routes.route('/search', methods=["PUT"])
def get_search_results():
    data = MultiDict(mapping=request.json)
    form = SearchForm(data)
    if form.validate():
        data = request.json
        print(data)
        user = User.query.get(data["userId"])
        user_dict = user.to_dict()

        user_lat = user_dict["lat"]
        user_lng = user_dict["lng"]
        coords_dict = reverse_haversine(target_distance=data["radius"], lat=user_lat, lng=user_lng)

        min_lat = coords_dict["min_lat"]
        max_lat = coords_dict["max_lat"]
        min_lng = coords_dict["min_lng"]
        max_lng = coords_dict["max_lng"]

        profiles = [profile.to_dict()["profile_id"] for profile in
        profile_instruments.query.filter(profile_instruments.instrument_id.in_(data["instruments"]))]

        return {"Hey": "mom"}

    else:
        return {"Hi": "mom"}