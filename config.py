import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = 'Team35'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///COMP3019J-Team35.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = True