import requests
import os
from flask import Blueprint, request, make_response
from sqlalchemy import and_
from app.models import db, Recording, ProfileRecording
from app.forms import RecordingForm
from werkzeug.datastructures import MultiDict

from app.utils.errors import format_errors

recording_routes = Blueprint('recordings', __name__)

@recording_routes.route('/', methods=["POST"])
def create_recording():
    data = MultiDict(mapping=request.json)
    form = RecordingForm(data)
    if form.validate():
        data = request.json
        new_recording = Recording(url=data["url"])
        db.session.add(new_recording)
        db.session.commit()
        new_pr = ProfileRecording(profile_id=data["profileId"], recording_id=new_recording.to_dict()["id"], title=data["title"], description=data["description"])
        db.session.add(new_pr)
        db.session.commit()
        return { "recording": new_recording.to_dict(), "profileRecording": new_pr.to_dict() }
    else:
        r = make_response({ "errors": format_errors(form.errors) }, 401)
        return r


@recording_routes.route('/<int:recording_id>/profiles/<int:profile_id>/', methods=["PUT"])
def update_profile_recording(recording_id, profile_id):
    profile_recording = ProfileRecording.query.filter_by(recording_id = int(recording_id), profile_id = int(profile_id)).first()
    data = MultiDict(mapping=request.json)
    form = RecordingForm(data)
    if form.validate():
        data = request.json
        profile_recording.title = data["title"]
        profile_recording.description = data["description"]
        db.session.commit()
        return { "profileRecording": profile_recording.to_dict() }
    else:
        r = make_response({ "errors": format_errors(form.errors) }, 401)
        return r

@recording_routes.route('/<int:recording_id>/profile/<int:profile_id>/', methods=["DELETE"])
def delete_recording(recording_id, profile_id):
    profile_recording = ProfileRecording.query.filter(and_(ProfileRecording.recording_id == recording_id, ProfileRecording.profile_id == profile_id)).one()
    db.session.delete(profile_recording)
    return {
        "recordingId": recording_id,
        "profileId": profile_id
        }
