import os
from flask import Blueprint, make_response, request
from flask_wtf.csrf import generate_csrf
from flask_login import login_user, current_user, logout_user
from datetime import timedelta
from werkzeug.datastructures import MultiDict
from app.models import User
from app.auth import login_manager
from app.forms import LoginForm

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


@session_routes.route('/map-api-token', methods=["GET"])
def map_api_token():
    return { "api_key": os.getenv("GOOGLE_MAPS_API_KEY") }

@session_routes.route('/csrf', methods=["GET"])
def csrf():
    res = make_response()
    res.set_cookie("XSRF-TOKEN", generate_csrf())
    return res