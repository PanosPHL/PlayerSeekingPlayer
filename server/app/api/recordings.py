import requests
import os
from flask import Blueprint, request
from app.models import db, Recording, ProfileRecording
from app.forms import RecordingForm
from werkzeug.datastructures import MultiDict

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
        return { "Hi": "mom" }


@recording_routes.route('/<int:recording_id>/profiles/<int:profile_id>/', methods=["PUT"])
def update_profile_recording(recording_id, profile_id):
    print(recording_id, profile_id)
    profile_recording = ProfileRecording.query.filter_by(recording_id = int(recording_id), profile_id = int(profile_id)).first()
    print(profile_recording)
    data = MultiDict(mapping=request.json)
    form = RecordingForm(data)
    if form.validate():
        data = request.json
        profile_recording.title = data["title"]
        profile_recording.description = data["description"]
        db.session.commit()
        print(profile_recording.to_dict())
        return { "profileRecording": profile_recording.to_dict() }
    else:
        return { "Hi": "mom" }
