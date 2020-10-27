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
  demo_2 = User(first_name = "Kenny", last_name = "Werner", email = "kennywerner@gmail.com", DOB = "1961-10-10", password="password", lat = 34.05223, lng = -118.24368)
  demo_3 = User(first_name = "Harry", last_name = "Mack", email = "harrymack@gmail.com", DOB = "1990-02-17", password="password", lat = 34.05223, lng = -118.24368)
  db.session.add(demo)
  db.session.add(demo_2)
  db.session.add(demo_3)
  db.session.commit()
  demo_profile = Profile(user_id = demo.to_dict()["id"], biography = kenny_garrett(), location = "Los Angeles, CA 90012, USA")
  demo_profile_2 = Profile(user_id = demo_2.to_dict()["id"], biography = "", location = "Los Angeles, CA 90012, USA")
  demo_profile_3 = Profile(user_id = demo_3.to_dict()["id"], biography = "", location = "Los Angeles, CA 90012, USA")

  # Instrument / Style seed data
  alto_sax = Instrument(name="Alto Saxophone")
  tenor_sax = Instrument(name="Tenor Saxophone")
  drum_kit = Instrument(name="Drum Kit")
  e_bass = Instrument(name="Electric Bass")
  keyboard = Instrument(name="Keyboard / Piano")
  e_guitar = Instrument(name="Electric Guitar")
  tenor_sax = Instrument(name="Tenor Sax")
  vocals_and_rap = Instrument(name="Vocals / Rap")

  db.session.add(e_guitar)
  db.session.add(tenor_sax)
  db.session.add(e_bass)
  db.session.add(drum_kit)
  db.session.add(vocals_and_rap)


  jazz = Style(name="Jazz")
  funk = Style(name="Funk")
  classical = Style(name="Classical")
  bluegrass = Style(name="Bluegrass")
  country = Style(name="Country")
  hiphop = Style(name="Hip Hop")


  db.session.add(classical)
  db.session.add(bluegrass)
  db.session.add(country)
  db.session.add(hiphop)

  run_for_cover = Recording(url='https://www.youtube.com/watch?v=rqqEHV-5F6E')
  sing_a_song_of_song = Recording(url='https://www.youtube.com/watch?v=pn8Cs-PZfX8')
  night_and_day = Recording(url='https://www.youtube.com/watch?v=UYCI_vJg2hw')
  dolphin_dance = Recording(url='https://www.youtube.com/watch?v=oUYv172xFlQ')
  line_freestyle = Recording(url='https://www.youtube.com/watch?v=p_w3TNLXH3k')

  demo_profile.instruments.append(alto_sax)
  demo_profile.instruments.append(keyboard)
  demo_profile_2.instruments.append(keyboard)
  demo_profile_3.instruments.append(vocals_and_rap)

  demo_profile.styles.append(jazz)
  demo_profile.styles.append(funk)
  demo_profile_2.styles.append(jazz)
  demo_profile_3.styles.append(hiphop)

  db.session.add(demo_profile)
  db.session.add(demo_profile_2)
  db.session.add(demo_profile_3)
  db.session.add(run_for_cover)
  db.session.add(sing_a_song_of_song)
  db.session.add(night_and_day)
  db.session.add(dolphin_dance)
  db.session.add(line_freestyle)
  db.session.commit()

  demo_rfc = ProfileRecording(profile_id=demo_profile.to_dict()["id"], recording_id=run_for_cover.to_dict()["id"], title="Run for Cover with Marcus Miller", description="Playing Run for Cover live with Marcus Miller, Hiram Bullock, Poogie Bell, and Patches Stewart")
  demo_sas = ProfileRecording(profile_id=demo_profile.to_dict()["id"], recording_id=sing_a_song_of_song.to_dict()["id"], title="Sing A Song of Song", description='Track 4 off of my album "Songbook"')
  demo_nad = ProfileRecording(profile_id=demo_profile.to_dict()["id"], recording_id=night_and_day.to_dict()["id"], title="Night And Day", description='Track 2 off of my album "Triology"')

  demo_2_dd = ProfileRecording(profile_id=demo_profile_2.to_dict()["id"], recording_id=dolphin_dance.to_dict()["id"], title="Dolphin Dance", description="Playing Dolphin Dance at the Berklee College of Music")

  demo_3_lf = ProfileRecording(profile_id=demo_profile_3.to_dict()["id"], recording_id=line_freestyle.to_dict()["id"], title="7 minute freestyle", description="Harry Mack freestyling in LA")

  db.session.add(demo_rfc)
  db.session.add(demo_sas)
  db.session.add(demo_nad)
  db.session.add(demo_2_dd)
  db.session.add(demo_3_lf)
  db.session.commit()