import boto3
import os
import base64
from secrets import token_urlsafe
from flask import Blueprint, jsonify, request, make_response
from app.models import db, User, Profile, Instrument, Style
from app.forms import SignUpForm, OverviewForm, BioForm, ProfilePicForm
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
    return new_user_dict
  else:
    res = make_response({ "errors": format_errors(form.errors) }, 401)
    return res

@user_routes.route('/<int:user_id>/overview/', methods=["PUT"])
def update_overview(user_id):
  data = MultiDict(mapping=request.json)
  form = OverviewForm(data)
  if form.validate():
    data = request.json
    user = User.query.get(user_id)
    user.DOB = data["date_of_birth"]
    user.lat = data["lat"]
    user.lng = data["lng"]

    profile = Profile.query.filter(Profile.user_id == user_id).first()
    profile.location = data["location"]
    profile.instruments = db.session.query(Instrument).filter(Instrument.id.in_(data["instruments"])).all()
    profile.styles = db.session.query(Style).filter(Style.id.in_(data["styles"])).all()

    db.session.commit()
    return user.to_dict()
  else:
    res = make_response({ "errors": format_errors(form.errors) }, 401)
    return res

@user_routes.route('/<int:user_id>/bio/', methods=["PUT"])
def update_bio(user_id):
  data = MultiDict(mapping=request.json)
  form = BioForm(data)
  if form.validate():
    data = request.json
    profile = Profile.query.filter(Profile.user_id == user_id).one()
    profile.biography = data["bio"]
    db.session.commit()
    return profile.user.to_dict()
  else:
    res = make_response({ "errors": format_errors(form.errors) }, 401)
    return res

@user_routes.route('/<int:user_id>/profile_picture/', methods=["PUT"])
def update_profile_picture(user_id):
  data = MultiDict(mapping=request.json)
  form = ProfilePicForm(data)
  if form.validate():
    data = request.json
    s3 = boto3.client('s3', region_name=os.environ.get('AWS_REGION_NAME'),
    aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"))

    file_name_with_extension = token_urlsafe(16) + '.png'
    clean_bit64 = data["img"][22:]
    imgData = base64.b64decode(clean_bit64)
    bucket_name = os.environ.get('AWS_BUCKET_NAME')

    s3.put_object(Bucket=bucket_name, Key=f"profile_pictures/{file_name_with_extension}", Body=imgData, ACL='public-read')
    location = boto3.client('s3').get_bucket_location(Bucket=bucket_name)['LocationConstraint']
    pic_location = f"https://{bucket_name}.s3-{location}.amazonaws.com/profile_pictures/{file_name_with_extension}"

    profile = Profile.query.filter(Profile.user_id == user_id).one()
    profile.profile_pic = pic_location
    db.session.commit()
    return { "profile": profile.to_dict() }