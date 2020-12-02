from flask import Blueprint, request, make_response
from app.models import db, Band, UserBand, User, Invitation
from werkzeug.datastructures import MultiDict

from app.utils.errors import format_errors

invitation_routes = Blueprint('invitations', __name__)

@invitation_routes.route("/<int:invitation_id>/", methods=["DELETE"])
def delete_invitation(invitation_id):
    invitation = Invitation.query.get(invitation_id)
    db.session.delete(invitation)
    return { "invitation": invitation.to_dict() }