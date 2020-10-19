from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Profile, Instrument, Style, Recording, ProfileRecording

from app.utils.biographies import kenny_garrett

with app.app_context():
  db.drop_all()
  db.create_all()

  # Demo user / profile generation
  demo = User(first_name = 'Kenny', last_name = 'Garrett', email = "demouser@demo.com", DOB = "1960-10-09", password="demo_password", lat = 34.05223, lng = -118.24368)
  db.session.add(demo)
  db.session.commit()
  demo_profile = Profile(user_id = demo.to_dict()["id"], biography = kenny_garrett(), location = "Los Angeles, CA 90012, USA")

  # Instrument / Style seed data
  alto_sax = Instrument(name="Alto Saxophone")
  keyboard = Instrument(name="Keyboard / Piano")
  e_guitar = Instrument(name="Electric Guitar")
  tenor_sax = Instrument(name="Tenor Sax")


  jazz = Style(name="Jazz")
  funk = Style(name="Funk")
  asian = Style(name="Asian")

  run_for_cover = Recording(url='https://www.youtube.com/watch?v=rqqEHV-5F6E')
  sing_a_song_of_song = Recording(url='https://www.youtube.com/watch?v=pn8Cs-PZfX8')
  night_and_day = Recording(url='https://www.youtube.com/watch?v=UYCI_vJg2hw')
  demo_profile.instruments.append(alto_sax)
  demo_profile.instruments.append(keyboard)
  demo_profile.instruments.append(tenor_sax)
  demo_profile.styles.append(jazz)
  demo_profile.styles.append(funk)
  demo_profile.styles.append(asian)
  db.session.add(demo_profile)
  db.session.add(run_for_cover)
  db.session.add(sing_a_song_of_song)
  db.session.add(night_and_day)
  db.session.commit()

  demo_rfc = ProfileRecording(profile_id=demo_profile.to_dict()["id"], recording_id=run_for_cover.to_dict()["id"], title="Run for Cover with Marcus Miller", description="Playing Run for Cover live with Marcus Miller, Hiram Bullock, Poogie Bell, and Patches Stewart")
  demo_sas = ProfileRecording(profile_id=demo_profile.to_dict()["id"], recording_id=sing_a_song_of_song.to_dict()["id"], title="Sing A Song of Song", description='Track 4 off of my album "Songbook"')
  demo_nad = ProfileRecording(profile_id=demo_profile.to_dict()["id"], recording_id=night_and_day.to_dict()["id"], title="Night And Day", description='Track 2 off of my album "Triology"')
  db.session.add(demo_rfc)
  db.session.add(demo_sas)
  db.session.add(demo_nad)
  db.session.commit()