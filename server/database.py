from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Profile

with app.app_context():
  db.drop_all()
  db.create_all()

  demo = User(first_name = 'Demo', last_name = 'User', email = "demouser@demo.com", DOB = "1995-10-30", password="demo_password")
  db.session.add(demo)
  db.session.commit()
  demo_profile = Profile(user_id = demo.to_dict()["id"], biography = "", location = "40.6589912, -74.3473717")
  db.session.add(demo_profile)
  db.session.commit()
