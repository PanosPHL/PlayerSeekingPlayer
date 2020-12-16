from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Profile, Instrument, Style, Recording, ProfileRecording, Band, Invitation, UserBand

from app.utils.biographies import kenny_garrett, harry_mack, mahalia

with app.app_context():
  db.drop_all()
  db.create_all()

  # Demo user / profile generation
  demo = User(first_name = 'Kenny', last_name = 'Garrett', email = "demouser@demo.com", DOB = "1960-10-09", password = "demo_password", lat = 34.05223, lng = -118.24368)
  demo_2 = User(first_name = "Kenny", last_name = "Werner", email = "kennywerner@gmail.com", DOB = "1961-10-10", password = "password", lat = 34.05223, lng = -118.24368)
  demo_3 = User(first_name = "Harry", last_name = "Mack", email = "harrymack@gmail.com", DOB = "1990-02-17", password = "password", lat = 34.05223, lng = -118.24368)
  demo_4 = User(first_name = "Tim", last_name="Henson", email = "timhenson@gmail.com", DOB = "1993-11-19", password = "password", lat = 34.05223, lng = -118.24368)
  demo_5 = User(first_name = "Mahalia", last_name="Burkmar", email = "mahaliaburkmar@gmail.com", DOB = "1998-05-01", password = "password", lat = 34.05223, lng = -118.24368)
  demo_6 = User(first_name = "Charlie", last_name="Puth", email = "charlieputh@gmail.com", DOB = "1991-12-01", password = "password", lat = 34.05223, lng = -118.24368)
  demo_7 = User(first_name = "Kamaal", last_name="Fareed", email = "qtiprapper@gmail.com", DOB = "1975-10-03", password = "password", lat = 34.05223, lng = -118.24368)

  demo_profile = Profile(biography = kenny_garrett(), location = "Los Angeles, CA 90012, USA", profile_pic="https://player-seeking-player.s3-us-east-2.amazonaws.com/profile_pictures/ODMZyH-U9OnBQl5xVkvDSw.png")
  demo_profile_2 = Profile(biography = "", location = "Los Angeles, CA 90012, USA", profile_pic="https://player-seeking-player.s3-us-east-2.amazonaws.com/profile_pictures/xyNI80ijRwCnmaIhgkIC9w.png")
  demo_profile_3 = Profile(biography = harry_mack(), location = "Los Angeles, CA 90012, USA", profile_pic="https://player-seeking-player.s3-us-east-2.amazonaws.com/profile_pictures/bfNsWUqh38DPbm483IlWbQ.png")
  demo_profile_4 = Profile(biography = "Guitarist for the Texas-based metal band Polyphia. They released their album Muse in April 2015.", location = "Los Angeles, CA 90012, USA", profile_pic="https://player-seeking-player.s3-us-east-2.amazonaws.com/profile_pictures/koi7ODiaMW41atCTW44x6A.png")
  demo_profile_5 = Profile(biography = mahalia(), location = "Los Angeles, CA 90012, USA", profile_pic="https://player-seeking-player.s3-us-east-2.amazonaws.com/profile_pictures/LaiIkNlrEiUKXf3y0FxOTg.png")
  demo_profile_6 = Profile(biography = "", location = "Los Angeles, CA 90012, USA", profile_pic="")
  demo_profile_7 = Profile(biography = "", location = "Los Angeles, CA 90012, USA", profile_pic="")

  demo_profile.user = demo
  demo_profile_2.user = demo_2
  demo_profile_3.user = demo_3
  demo_profile_4.user = demo_4
  demo_profile_5.user = demo_5
  demo_profile_6.user = demo_6
  demo_profile_7.user = demo_7

  db.session.add(demo)
  db.session.add(demo_2)
  db.session.add(demo_3)
  db.session.add(demo_4)
  db.session.add(demo_5)
  db.session.add(demo_6)
  db.session.add(demo_7)
  db.session.commit()

  # Instrument / Style seed data
  alto_sax = Instrument(name="Alto Saxophone")
  tenor_sax = Instrument(name="Tenor Saxophone")
  drum_kit = Instrument(name="Drum Kit")
  e_bass = Instrument(name="Electric Bass")
  keyboard = Instrument(name="Keyboard / Piano")
  e_guitar = Instrument(name="Electric Guitar")
  tenor_sax = Instrument(name="Tenor Sax")
  vocals_and_rap = Instrument(name="Vocals / Rap")

  db.session.add(tenor_sax)
  db.session.add(e_bass)
  db.session.add(drum_kit)


  jazz = Style(name="Jazz")
  funk = Style(name="Funk")
  pop = Style(name="Pop")
  rock = Style(name="Rock")
  country = Style(name="Country")
  hiphop = Style(name="Hip Hop")

  db.session.add(country)

  run_for_cover = Recording(url='https://www.youtube.com/watch?v=rqqEHV-5F6E')
  sing_a_song_of_song = Recording(url='https://www.youtube.com/watch?v=pn8Cs-PZfX8')
  night_and_day = Recording(url='https://www.youtube.com/watch?v=UYCI_vJg2hw')
  dolphin_dance = Recording(url='https://www.youtube.com/watch?v=oUYv172xFlQ')
  line_freestyle = Recording(url='https://www.youtube.com/watch?v=p_w3TNLXH3k')
  euphoria = Recording(url='https://www.youtube.com/watch?v=7C19ZGLuhlQ')
  missed_my_ex = Recording(url='https://www.youtube.com/watch?v=a7kT52xL-7g')
  attention = Recording(url='https://www.youtube.com/watch?v=nfs8NYg7yQM')
  abstractions = Recording(url='https://www.youtube.com/watch?v=_FIJ7TE5-Ss')

  demo_rfc = ProfileRecording(title="Run for Cover with Marcus Miller", description="Playing Run for Cover live with Marcus Miller, Hiram Bullock, Poogie Bell, and Patches Stewart")
  demo_sas = ProfileRecording(title="Sing A Song of Song", description='Track 4 off of my album "Songbook"')
  demo_nad = ProfileRecording(title="Night And Day", description='Track 2 off of my album "Triology"')
  demo_2_dd = ProfileRecording(title="Dolphin Dance", description="Playing Dolphin Dance at the Berklee College of Music")
  demo_3_lf = ProfileRecording(title="7 minute freestyle", description="Harry Mack freestyling in LA")
  demo_4_eu = ProfileRecording(title="Euphoria - Polyphia", description="From our album Renaissance")
  demo_5_mme = ProfileRecording(title="I Wish I Missed My Ex", description='Track 2 off of my album "Love and Compromise"')
  demo_6_att = ProfileRecording(title="Attention", description="One of the singles which launched my career")
  demo_7_abs = ProfileRecording(title="Abstractions ft. Kenny Garrett", description="""Kenny Garrett's feature on my album "Kamaal the Abstract\"""")

  demo_rfc.profile = demo_profile
  demo_sas.profile = demo_profile
  demo_nad.profile = demo_profile
  demo_2_dd.profile = demo_profile_2
  demo_3_lf.profile = demo_profile_3
  demo_4_eu.profile = demo_profile_4
  demo_5_mme.profile = demo_profile_5
  demo_6_att.profile = demo_profile_6
  demo_7_abs.profile = demo_profile_7

  demo_rfc.recording = run_for_cover
  demo_sas.recording = sing_a_song_of_song
  demo_nad.recording = night_and_day
  demo_2_dd.recording = dolphin_dance
  demo_3_lf.recording = line_freestyle
  demo_4_eu.recording = euphoria
  demo_5_mme.recording = missed_my_ex
  demo_6_att.recording = attention
  demo_7_abs.recording = abstractions

  demo_profile.instruments.append(alto_sax)
  demo_profile.instruments.append(keyboard)
  demo_profile_2.instruments.append(keyboard)
  demo_profile_3.instruments.append(vocals_and_rap)
  demo_profile_4.instruments.append(e_guitar)
  demo_profile_5.instruments.append(vocals_and_rap)
  demo_profile_6.instruments.append(vocals_and_rap)
  demo_profile_6.instruments.append(keyboard)
  demo_profile_7.instruments.append(vocals_and_rap)

  demo_profile.styles.append(jazz)
  demo_profile.styles.append(funk)
  demo_profile_2.styles.append(jazz)
  demo_profile_3.styles.append(hiphop)
  demo_profile_4.styles.append(rock)
  demo_profile_5.styles.append(pop)
  demo_profile_6.styles.append(pop)
  demo_profile_7.styles.append(hiphop)

  db.session.add(demo_profile)
  db.session.add(demo_profile_2)
  db.session.add(demo_profile_3)
  db.session.add(demo_profile_4)
  db.session.add(demo_profile_5)
  db.session.add(demo_profile_6)
  db.session.add(demo_profile_7)

  db.session.add(run_for_cover)
  db.session.add(sing_a_song_of_song)
  db.session.add(night_and_day)
  db.session.add(dolphin_dance)
  db.session.add(line_freestyle)
  db.session.add(euphoria)
  db.session.add(missed_my_ex)
  db.session.add(attention)
  db.session.add(abstractions)

  db.session.add(demo_rfc)
  db.session.add(demo_sas)
  db.session.add(demo_nad)
  db.session.add(demo_2_dd)
  db.session.add(demo_3_lf)
  db.session.add(demo_4_eu)
  db.session.add(demo_5_mme)
  db.session.add(demo_6_att)
  db.session.add(demo_7_abs)

  five_peace_band = Band(name="Five Peace Band")
  five_peace_band.owner = demo
  five_peace_band.style = jazz

  fpb_owner = UserBand(is_confirmed=True)
  fpb_owner.user = demo
  fpb_owner.band = five_peace_band

  db.session.add(five_peace_band)
  db.session.add(fpb_owner)

  kenny_to_kenny = Invitation(message="")
  kenny_to_kenny.sender = demo
  kenny_to_kenny.recipient = demo_2
  kenny_to_kenny.band = five_peace_band

  fpb_pending = UserBand(is_confirmed=False)
  fpb_pending.user = demo_2
  fpb_pending.band = five_peace_band

  db.session.add(kenny_to_kenny)
  db.session.add(fpb_pending)

  atcq_tribute = Band(name="A Tribe Called Quest Tribute Group")
  atcq_owner = UserBand(is_confirmed=True)
  atcq_tribute.owner = demo_3
  atcq_tribute.style = hiphop
  atcq_owner.user = demo_3
  atcq_owner.band = atcq_tribute

  db.session.add(atcq_tribute)
  db.session.add(atcq_owner)

  harry_to_kenny = Invitation(message="Hey Kenny!\nWould love to collaborate with you on a tribute to A Tribe Called Quest.\nBest,\nHarry Mack")
  harry_to_kenny.sender = demo_3
  harry_to_kenny.recipient = demo
  harry_to_kenny.band = atcq_tribute

  atcq_pending = UserBand(is_confirmed=False)
  atcq_pending.user = demo
  atcq_pending.band = atcq_tribute

  db.session.add(harry_to_kenny)
  db.session.add(atcq_pending)

  abstractions_band = Band(name='"Abstractions" Group')
  abstractions_owner = UserBand(is_confirmed=True)

  abstractions_band.owner = demo_7
  abstractions_band.style = hiphop

  abstractions_owner.user = demo_7
  abstractions_owner.band = abstractions_band

  db.session.add(abstractions_band)
  db.session.add(abstractions_owner)

  qtip_to_kenny = Invitation(message='Hey Kenny!\nLong time no chat. Would love to get you on my newest record, "Abstractions". Let me know what you think.\nBest,\nQ-Tip', status = "Accepted")
  qtip_to_kenny.sender = demo_7
  qtip_to_kenny.recipient = demo
  qtip_to_kenny.band = abstractions_band

  abs_kenny = UserBand(is_confirmed=True)
  abs_kenny.user = demo
  abs_kenny.band = abstractions_band

  db.session.add(qtip_to_kenny)
  db.session.add(abs_kenny)

  db.session.commit()