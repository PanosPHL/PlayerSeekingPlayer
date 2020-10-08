from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(64), nullable=False)
  last_name = db.Column(db.String(64), nullable=False)
  email = db.Column(db.String(256), nullable=False, unique=True)
  DOB = db.Column(db.Date, nullable=False)

  def to_dict(self):
    return {
      "id": self.id,
      "firstName": self.first_name,
      "lastName": self.last_name,
      "email": self.email,
      "dateOfBirth": self.DOB
    }


class Profile(db.Model):
  __tablename__ = 'profiles'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  biography = db.Column(db.Text)
  location = db.Column(db.String(64), nullable=False)

  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "biography": self.biography,
      "location": self.location
    }