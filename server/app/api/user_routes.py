from flask import Blueprint, jsonify, request
from app.models import db, User, Profile
from app.forms import SignUpForm
from werkzeug.datastructures import MultiDict

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def index():
  response = User.query.all()
  print("user route______")
  return { "users": [user.to_dict() for user in response] }

@user_routes.route('/', methods=["POST"])
def signup_user():
  data = MultiDict(mapping=request.json)
  form = SignUpForm(data)
  if form.validate():
    data = request.json
    new_user = User(first_name = data["firstName"], last_name = data["lastName"], email = data["email"], DOB = data["dateOfBirth"])
    db.session.add(new_user)
    db.session.commit()
    new_user_dict = new_user.to_dict()
    new_user_profile = Profile(user_id = new_user_dict["id"], biography = "", location = data["location"])
    db.session.add(new_user_profile)
    db.session.commit()
    new_user_dict["profile_info"] = new_user_profile.to_dict()
    return new_user_dict
  else:
    errors = []
    for error in form.errors:
      errors += form.errors[error]
    return { "errors": errors }