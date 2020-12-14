from flask import Blueprint, request, make_response
from app.models import db, Band, UserBand, User, Invitation
from werkzeug.datastructures import MultiDict

from app.utils.errors import format_errors

invitation_routes = Blueprint('invitations', __name__)

@invitation_routes.route("/<int:invitation_id>/", methods=["DELETE"])
def delete_invitation(invitation_id):
    invitation = Invitation.query.get(invitation_id)
    db.session.delete(invitation)
    db.session.commit()

    return { "invitationId": invitation.to_dict() }

@invitation_routes.route("/<int:invitation_id>/", methods=["PUT"])
def update_invitation_status(invitation_id):
    data = request.json
    invitation = Invitation.query.get(invitation_id)
    invitation.status = data["status"]
    invitation_dict = invitation.to_dict()

    user_band = UserBand.query.filter(UserBand.band_id == invitation_dict["bandId"], UserBand.user_id == invitation_dict["recipientId"]).one()
    user_band_dict = user_band.to_dict()

    if invitation_dict["status"] == "Accepted":
        user_band.is_confirmed = True
        db.session.commit()
    else:
        db.session.delete(user_band)

    return {
        "invitationId": invitation_dict["id"],
        "status": invitation_dict["status"],
        "bandId": user_band_dict["bandId"],
        "userId": invitation_dict["recipientId"]
    }
