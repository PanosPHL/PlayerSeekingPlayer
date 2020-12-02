from flask import Blueprint, request, make_response
from app.models import db, Band, UserBand, User, Invitation
from werkzeug.datastructures import MultiDict

from app.utils.errors import format_errors

invitation_routes = Blueprint('bands', __name__)

@invitation_routes.route("/<int:invitation_id>/", methods=["DELETE"])
def delete_invitation(invitation_id):
    invitation = Invitation.get(Invitation.id == invitation_id)
    db.session.delete(invitation)
    return { "message": "Success" }