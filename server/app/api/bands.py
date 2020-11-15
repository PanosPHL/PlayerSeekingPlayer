from flask import Blueprint, request, make_response
from app.models import db, Band, UserBand, User
from app.forms import BandForm, InvitationForm
from werkzeug.datastructures import MultiDict

from app.utils.errors import format_errors

band_routes = Blueprint('bands', __name__)

@band_routes.route('/', methods=["POST"])
def create_band():
    data = MultiDict(mapping=request.json)
    form = BandForm(data)
    if form.validate():
        data = request.json
        owner = User.query.get(data["owner"])
        new_band = Band(name=data["name"], isPublic=data["isPublic"], owner_id=data["owner"], style_id=data["style"])
        db.session.add(new_band)
        db.session.commit()
        new_user_band = UserBand(user_id=data["owner"], band_id=new_band.to_dict()["id"], isConfirmed=True)
        db.session.add(new_user_band)
        db.session.commit()
        return { "band": new_band.to_dict() }
    else:
        r = make_response({ "errors": format_errors(form.errors) }, 401)
        return r

@band_routes.route('/<int:band_id>/add_member', methods=["PUT"])
def manage_members(band_id):
    data = MultiDict(mapping=request.json)
    form = InvitationForm(data)
    if form.validate():
        data = request.json
        print(data)
    else:
        r = make_response({ "errors": form.errors }, 401)
        return r