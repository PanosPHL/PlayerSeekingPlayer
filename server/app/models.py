from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import app

db = SQLAlchemy()

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(64), nullable=False)
  last_name = db.Column(db.String(64), nullable=False)
  email = db.Column(db.String(256), nullable=False, unique=True)
  hashed_password = db.Column(db.String(256), nullable=False)
  DOB = db.Column(db.Date, nullable=False)
  lat = db.Column(db.Float, nullable=False)
  lng = db.Column(db.Float, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
  updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

  profile = db.relationship("Profile", back_populates="user")
  bands = db.relationship("UserBand", back_populates="user")
  owned_band = db.relationship("Band", back_populates="owner")

  @property
  def password(self):
        return self.hashed_password

  @password.setter
  def password(self, password):
        self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
        return check_password_hash(self.password, password)

  def to_dict(self):
    return {
      "id": self.id,
      "firstName": self.first_name,
      "lastName": self.last_name,
      "email": self.email,
      "dateOfBirth": self.DOB,
      "lat": self.lat,
      "lng": self.lng,
      "createdAt": self.created_at,
      "updatedAt": self.updated_at,
      "profileInfo": self.profile[0].to_dict() if self.profile else []
    }


profile_instruments = db.Table("profile_instruments",
  db.Column("profile_id", db.Integer, db.ForeignKey("profiles.id"), primary_key=True, nullable=False),
  db.Column("instrument_id", db.Integer, db.ForeignKey("instruments.id"), primary_key=True, nullable=False)
)


profile_styles = db.Table("profile_styles",
  db.Column("profile_id", db.Integer, db.ForeignKey("profiles.id"), primary_key=True, nullable=False),
  db.Column("style_id", db.Integer, db.ForeignKey("styles.id"), primary_key=True, nullable=False)
)


class ProfileRecording(db.Model):
  __tablename__ = "profile_recordings"
  profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), primary_key=True)
  recording_id = db.Column(db.Integer, db.ForeignKey('recordings.id'), primary_key=True)
  title = db.Column(db.String(256), unique=True, nullable=False)
  description = db.Column(db.Text)

  profile = db.relationship("Profile")
  recording = db.relationship("Recording")

  def to_dict(self):
    return {
      "profile_id": self.profile_id,
      "recording_id": self.recording_id,
      "title": self.title,
      "description": self.description
    }


class Profile(db.Model):
  __tablename__ = 'profiles'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  biography = db.Column(db.Text)
  location = db.Column(db.String(256), nullable=False)
  profile_pic = db.Column(db.Text)
  created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
  updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

  user = db.relationship("User", back_populates="profile")
  instruments = db.relationship("Instrument", secondary=profile_instruments)
  styles = db.relationship("Style", secondary=profile_styles)
  recordings = db.relationship("ProfileRecording", back_populates="profile")

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "biography": self.biography,
      "location": self.location,
      'profile_pic': self.profile_pic,
      "instruments": [instrument.to_dict()["id"] for instrument in self.instruments],
      "recordings": self.get_recordings_info(self.recordings),
      "styles": [style.to_dict()["id"] for style in self.styles],
      "createdAt": self.created_at,
      "updatedAt": self.updated_at
    }

  def get_recordings_info(self, recordings):
    recordings_dict = dict()
    for recording in recordings:
      recording_dict = recording.to_dict()
      recordings_dict[recording_dict["recording_id"]] = recording_dict
    return recordings_dict

class Instrument(db.Model):
  __tablename__ = "instruments"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(128), unique=True, nullable=False)

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name
    }


class Recording(db.Model):
  __tablename__ = "recordings"

  id = db.Column(db.Integer, primary_key=True)
  url = db.Column(db.String(256), nullable=False)

  profiles = db.relationship("ProfileRecording", back_populates="recording")

  def to_dict(self):
    return {
      "id": self.id,
      "url": self.url
    }


class Style(db.Model):
  __tablename__ = 'styles'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(64), unique=True, nullable=False)

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name
    }


class Band(db.Model):
  __tablename__ = 'bands'

  id = db.Column(db.Integer, primary_key=True, nullable=False)
  name = db.Column(db.String(256), unique=True, nullable=False)
  isPublic = db.Column(db.Boolean, nullable=False, default=True)
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  style_id = db.Column(db.Integer, db.ForeignKey("styles.id"), nullable=False)

  style = db.relationship("Style")
  owner = db.relationship("User", back_populates="owned_band")
  users = db.relationship("UserBand", back_populates="band")

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "isPublic": self.isPublic,
      "ownerId": self.owner_id,
      "styleId": self.style_id,
      "members": [user.to_dict()["id"] for user in self.users]
    }


class UserBand(db.Model):
  __tablename__ = 'user_bands'

  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False)
  band_id = db.Column(db.Integer, db.ForeignKey('bands.id'), primary_key=True, nullable=False)
  isConfirmed = db.Column(db.Boolean, nullable=False, default=False)

  user = db.relationship("User")
  band = db.relationship("Band")