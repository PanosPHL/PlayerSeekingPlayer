from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Profile, Instrument, Style

with app.app_context():
  db.drop_all()
  db.create_all()

  # Demo user / profile generation
  demo = User(first_name = 'Demo', last_name = 'User', email = "demouser@demo.com", DOB = "1995-10-30", password="demo_password", lat = 34.05223, lng = -118.24368)
  db.session.add(demo)
  db.session.commit()
  demo_profile = Profile(user_id = demo.to_dict()["id"], biography = "", location = "Los Angeles, CA 90012, USA")
  db.session.add(demo_profile)

  # Instrument / Style seed data
  alto_sax = Instrument(name="Alto Saxophone")
  jazz = Style(name="Jazz")
  db.session.add(alto_sax)
  db.session.add(jazz)


  db.session.commit()
