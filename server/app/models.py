from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(64), nullable=False)
  last_name = db.Column(db.String(64), nullable=False)
  email = db.Column(db.String(256), nullable=False, unique=True)
  hashed_password = db.Column(db.String(256), nullable=False)
  DOB = db.Column(db.Date, nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
  updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

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
      "createdAt": self.created_at,
      "updatedAt": self.updated_at
    }


class Profile(db.Model):
  __tablename__ = 'profiles'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  biography = db.Column(db.Text)
  location = db.Column(db.String(64), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
  updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "biography": self.biography,
      "location": self.location,
      "createdAt": self.created_at,
      "updatedAt": self.updated_at
    }