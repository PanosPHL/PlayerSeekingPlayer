from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Profile, Instrument, Style, Recording, ProfileRecording

with app.app_context():
  db.drop_all()
  db.create_all()

  # Demo user / profile generation
  demo = User(first_name = 'Kenny', last_name = 'Garrett', email = "demouser@demo.com", DOB = "1995-10-30", password="demo_password", lat = 34.05223, lng = -118.24368)
  db.session.add(demo)
  db.session.commit()
  demo_profile = Profile(user_id = demo.to_dict()["id"], biography = "", location = "Los Angeles, CA 90012, USA")

  # Instrument / Style seed data
  alto_sax = Instrument(name="Alto Saxophone")
  jazz = Style(name="Jazz")
  ts = Recording(url='https://www.youtube.com/watch?v=rqqEHV-5F6E')
  demo_profile.instruments.append(alto_sax)
  demo_profile.styles.append(jazz)
  db.session.add(demo_profile)
  db.session.add(ts)
  db.session.commit()

  demo_ts = ProfileRecording(profile_id=demo_profile.to_dict()["id"], recording_id=ts.to_dict()["id"], title="TS with the Vibe Plus Five", description="")
  db.session.add(demo_ts)
  db.session.commit()