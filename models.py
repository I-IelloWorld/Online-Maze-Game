from __init__ import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash




# A table of users in database
class User(db.Model):
    __tablename__ = "user"
    __table_args__ = {'extend_existing': True}
    # information
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(32), unique=True, nullable=False)
    password_hash = db.Column(db.String(64), nullable=False)
    register_time = db.Column(db.DateTime, default=datetime.now)

    def __repr__(self):
        return '<User {}>'.format(self.user_name)

    # encrypt password
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # translate password
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# A table of ranking list
class Rank(db.Model):
    __tablename__ = "rank"
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(32), nullable=False)
    time = db.Column(db.Time, nullable=False)
    step = db.Column(db.Integer, nullable=False)