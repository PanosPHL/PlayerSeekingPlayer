from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, FloatField, SelectMultipleField, BooleanField, IntegerField, SelectField
from wtforms.fields.html5 import EmailField, DateField, URLField
from wtforms.validators import InputRequired, Email, EqualTo, URL, ValidationError, NumberRange
from wtforms.ext.sqlalchemy.fields import QuerySelectField, QuerySelectMultipleField
from app.models import Instrument, Style, User, Band
import os
import requests
import datetime

def get_instrument_choices():
    return Instrument.query.all()

def get_style_choices():
    return Style.query.all()

def get_all_users():
    return User.query.all()

def get_band_choices():
    return Band.query.all()

class SignUpForm(FlaskForm):
    first_name = StringField("First Name", validators=[InputRequired("Enter a first name.")])
    last_name = StringField("Last Name", validators=[InputRequired("Enter a last name.")])
    email = EmailField("Email", validators=[InputRequired("Enter an email address."), Email("Enter a valid email address.")])
    password = PasswordField("Password", validators=[InputRequired("Enter a password."), EqualTo("confirm_password", message="Ensure that your password matches your confirmed password.")])
    confirm_password = PasswordField("Confirm Password", validators=[InputRequired("Enter a confirmation of your password.")])
    date_of_birth = StringField("Date of Birth", validators=[InputRequired("Enter a date of birth.")])
    location = StringField("Location", validators=[InputRequired("Enter a location.")])

    def validate_date_of_birth(form, field):
        year = datetime.timedelta(days=365)
        sixteen_years = year * 16
        today = datetime.date.today()
        if (datetime.date.fromisoformat(field.data)) > (today - sixteen_years):
            raise ValidationError("You must be 16 years or older to sign up.")


class LoginForm(FlaskForm):
    email = EmailField("Email", validators=[InputRequired("Please provide an email address."), Email("Please provide a valid email address.")])
    password = PasswordField("Password", validators=[InputRequired("Please provide a password.")])


class RecordingForm(FlaskForm):
    url = URLField("URL", validators=[InputRequired("Please provide a URL."), URL(message="Please provide a valid URL.")])
    title = StringField("Title", validators=[InputRequired("Please provide a title for your recording.")])
    description = StringField("Description")

    def validate_url(form, field):
        YOUTUBE_API_KEY = os.environ.get("YOUTUBE_API_KEY")
        fetch_url = f"https://www.googleapis.com/youtube/v3/videos?id={field.data.split('v=')[1]}&key={YOUTUBE_API_KEY}"
        r = requests.get(fetch_url)
        r_json = r.json()
        if not r.ok:
            raise ValidationError("Please provide a valid YouTube URL.")


class OverviewForm(FlaskForm):
    date_of_birth = StringField("Date of Birth", validators=[InputRequired("Enter a date of birth.")])
    instruments = QuerySelectMultipleField("Instruments", validators=[InputRequired("Please select a valid instrument")], query_factory=get_instrument_choices, allow_blank=False)
    styles = QuerySelectMultipleField("Styles", validators=[InputRequired("Please select a valid style")], query_factory=get_style_choices, allow_blank=False)
    location = StringField("Location", validators=[InputRequired("Please provide a location.")])
    validLocation = BooleanField("is_valid_location")
    lat = FloatField("Latitude", validators=[InputRequired("Please provide a latitude.")])
    lng = FloatField("Longitude", validators=[InputRequired("Please provide a longitude.")])

    def validate_validLocation(form, field):
        if not field.data:
            raise ValidationError("Please use the autocomplete field to provide your location")

    def validate_date_of_birth(form, field):
        year = datetime.timedelta(days=365)
        sixteen_years = year * 16
        today = datetime.date.today()
        if (datetime.date.fromisoformat(field.data)) > (today - sixteen_years):
            raise ValidationError("You must be 16 years or older use this site.")

class BioForm(FlaskForm):
    bio = StringField("Biography")

class SearchForm(FlaskForm):
    firstName = StringField("First Name")
    lastName = StringField("Last Name")
    radius = IntegerField("Radius", validators=[InputRequired("Please provide a mile radius to search within.")])
    instruments = QuerySelectMultipleField("Instruments", validators=[InputRequired("Please provide at least one instrument")], query_factory=get_instrument_choices, allow_blank=False)
    styles = QuerySelectMultipleField("Styles", validators=[InputRequired("Please provide at least one style")],  query_factory=get_style_choices, allow_blank=False)

class ProfilePicForm(FlaskForm):
    img = StringField("Image", validators=[InputRequired("Please crop your provided image")])

class BandForm(FlaskForm):
    name = StringField("Name", validators=[InputRequired("Please give your new band a name")])
    isPublic = BooleanField("Public?", validators=[InputRequired("Please specify whether your band should be public or private")])
    owner = QuerySelectField("Owner", validators=[InputRequired("Please specify a band owner")], query_factory=get_all_users, allow_blank=False)
    style = QuerySelectField("Style", validators=[InputRequired("Please provide a style")], query_factory=get_style_choices, allow_blank=False)

class InvitationForm(FlaskForm):
    sender_id = QuerySelectField("Recipient", validators=[InputRequired("Please provide a valid recipient")], query_factory=get_all_users, allow_blank=False)
    recipient_id = QuerySelectField("Recipient", validators=[InputRequired("Please provide a valid recipient")], query_factory=get_all_users, allow_blank=False)
    band_id = SelectField("Band", validators=[InputRequired("Please select a band")])
    message = StringField("Message")
