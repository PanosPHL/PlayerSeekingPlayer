from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.fields.html5 import EmailField, DateField, URLField
from wtforms.validators import InputRequired, Email, EqualTo, URL, ValidationError
import os
import requests
import datetime


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
