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