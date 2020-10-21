from flask import Blueprint, jsonify, request, make_response
from app.models import db, User, Profile
from app.forms import SignUpForm, OverviewForm
from werkzeug.datastructures import MultiDict

from app.utils.errors import format_errors

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def index():
  users = User.query.all()
  users_list = list()
  for user in users:
    user_dict = user.to_dict()
    profile = Profile.query.filter(Profile.user_id == user_dict["id"]).first()
    user_dict["profileInfo"] = profile.to_dict()
    users_list.append(user_dict)
  return { "users": users_list }

@user_routes.route('/', methods=["POST"])
def signup_user():
  data = MultiDict(mapping=request.json)
  print(data)
  form = SignUpForm(data)
  if form.validate():
    data = request.json
    new_user = User(first_name = data["first_name"], last_name = data["last_name"], email = data["email"], DOB = data["date_of_birth"], password=data["password"], lat = data["lat"], lng = data["lng"])
    db.session.add(new_user)
    db.session.commit()
    new_user_dict = new_user.to_dict()
    new_user_profile = Profile(user_id = new_user_dict["id"], biography = "", location = data["location"])
    db.session.add(new_user_profile)
    db.session.commit()
    new_user_dict["profile_info"] = new_user_profile.to_dict()
    return new_user_dict
  else:
    print(form.errors)
    res = make_response({ "errors": format_errors(form.errors) }, 401)
    return res

@user_routes.route('/<int:user_id>/overview/', methods=["PUT"])
def update_overview(user_id):
  print(request.json)
  data = MultiDict(mapping=request.json)
  form = OverviewForm(data)
  if form.validate():
    data = request.json
    user = User.query.get(user_id)
  else:
    print(form.errors)
    res = make_response({ "errors": format_errors(form.errors) }, 401)
    return res