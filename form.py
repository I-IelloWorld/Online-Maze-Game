from flask_wtf import FlaskForm, RecaptchaField
from wtforms import Form, StringField, PasswordField, SubmitField
from wtforms import widgets
from wtforms import validators

from wtforms.fields import core
from wtforms.fields import simple


class LoginForm(FlaskForm):
    name = simple.StringField(
        'Username',
        validators=[
            validators.DataRequired('Please fill in the username'),
            # validators.Length(min=3, max=10, message='Incorrect username!')
        ],
        # widget=widgets.TextInput(),
        render_kw={'class': 'border-item', 'placeholder': 'USERNAME'}
    )
    pwd = simple.PasswordField(
        'Password',
        validators=[
            validators.DataRequired('Please fill in the password'),
            # validators.Length(min=6, max=15, message='Password not match the username')
        ],
        # widget=widgets.TextInput(),
        render_kw={'class': 'border-item', 'placeholder': 'PASSWORD'}
    )
    submit = SubmitField('Submit', render_kw={'class': 'hidden'})


class RegisterForm(FlaskForm):
    name = simple.StringField(
        'Username',
        validators=[
            validators.DataRequired('Please fill in the username'),
            validators.Length(min=3, max=10, message='The length of username should be 3 ~ 10')
        ],
        render_kw={'class': 'border-item', 'placeholder': 'USERNAME'}
    )
    pwd1 = simple.PasswordField(
        'Password',
        validators=[
            validators.DataRequired('Please fill in the password'),
            validators.Length(min=6, max=15, message='The length of password should be 6 ~ 15')
        ],
        render_kw={'class': 'border-item', 'placeholder': 'PASSWORD'}
    )
    pwd2 = simple.PasswordField(
        'Password',
        validators=[
            validators.DataRequired('Please fill in the password again'),
            validators.EqualTo('pwd1', message='Password not match')
        ],
        render_kw={'class': 'border-item', 'placeholder': 'PASSWORD AGAIN'}
    )
    submit = SubmitField('Register', render_kw={'class': 'hidden'})