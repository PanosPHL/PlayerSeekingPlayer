from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.fields.html5 import EmailField, DateField
from wtforms.validators import InputRequired, Email, EqualTo, ValidationError
import datetime


class SignUpForm(FlaskForm):
    first_name = StringField("First Name", validators=[InputRequired("Please provide a first name.")])
    last_name = StringField("Last Name", validators=[InputRequired("Please provide a last name.")])
    email = EmailField("Email", validators=[InputRequired("Please provide an email address."), Email("Please provide a valid email address.")])
    password = PasswordField("Password", validators=[InputRequired("Please provide a password."), EqualTo("confirm_password", message="Ensure that your password matches your confirmed password.")])
    confirm_password = PasswordField("Confirm Password", validators=[InputRequired("Please provide a confirmation of your password.")])
    date_of_birth = StringField("Date of Birth", validators=[InputRequired("Please provide a date of birth.")])

    def validate_date_of_birth(form, field):
        print(field.data)
        year = datetime.timedelta(days=365)
        sixteen_years = year * 16
        today = datetime.date.today()
        if (datetime.date.fromisoformat(field.data)) > (today - sixteen_years):
            raise ValidationError("You must be 16 years or older to use Player Seeking Player.")


class LoginForm(FlaskForm):
    email = EmailField("Email", validators=[InputRequired("Please provide an email address."), Email("Please provide a valid email address.")])
    password = PasswordField("Password", validators=[InputRequired("Please provide a password.")])