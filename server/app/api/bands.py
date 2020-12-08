from flask import Blueprint, request, make_response
from app.models import db, Band, UserBand, User, Invitation
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
        new_user_band = UserBand(user_id=data["owner"], band_id=new_band.to_dict()["id"], is_confirmed=True)
        db.session.add(new_user_band)
        db.session.commit()
        return { "band": new_band.to_dict() }
    else:
        r = make_response({ "errors": format_errors(form.errors) }, 401)
        return r

@band_routes.route('/<int:band_id>/', methods=["DELETE"])
def delete_band(band_id):
    band = Band.query.get(band_id)
    band.isPublic = False
    db.session.commit()

    return {
        "bandId": band_id
    }

@band_routes.route('/<int:band_id>/add_member/', methods=["PUT"])
def manage_members(band_id):
    bands = Band.query.filter(Band.owner_id == request.json["sender_id"]).all()
    data = MultiDict(mapping=request.json)
    form = InvitationForm(data)
    form.band_id.choices = [band.id for band in bands]
    if form.validate():
        data = request.json
        new_invitation = Invitation(sender_id=data["sender_id"], recipient_id=data["recipient_id"], band_id=data["band_id"], message=data["message"])
        new_user_band = UserBand(user_id=data["recipient_id"], band_id=data["band_id"], is_confirmed=False)

        db.session.add(new_invitation, new_user_band)
        db.session.commit()

        return {
            "invitation": new_invitation.to_dict(),
            "userBand": new_user_band.to_dict()
            }
    else:
        r = make_response({ "errors": format_errors(form.errors) }, 401)
        return r

@band_routes.route('/<int:band_id>/remove_member/<int:member_id>/', methods=["DELETE"])
def remove_member(band_id, member_id):
    user_band = UserBand.query.filter(UserBand.band_id == band_id, UserBand.user_id == member_id).one()
    db.session.delete(user_band)
    return {
        "bandId": band_id,
        "memberId": member_id
    }

@band_routes.route('/<int:band_id>/', methods=["PUT"])
def update_band_info(band_id):
    data = MultiDict(mapping=request.json)
    form = BandForm(data)
    if form.validate():
        data = request.json
        band = Band.query.get(band_id)
        band.name = data["name"]
        band.style_id = data["style"]
        db.session.commit()
        return {
            "band": band.to_dict()
        }
    else:
        r = make_response({ "errors": format_errors(form.errors) }, 401)
        return r
