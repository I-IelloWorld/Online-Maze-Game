from datetime import time

from models import *
from flask import session


# This function is use to reset the database into initialized
def set_db():
    db.drop_all()
    db.create_all()
    from models import User, Rank

    # create players
    user1 = User(user_name = 'player1')
    user1.set_password('000000')
    db.session.add(user1)

    user2 = User(user_name='player2')
    user2.set_password('111111')
    db.session.add(user2)

    # add rank
    rank1 = Rank(user_name = 'player1', time = time(11,11,11,11), step = 50, treasure_num = 1)
    db.session.add(rank1)


    db.session.commit()



# This function is use to check whether the user is login
def islogined():
    # Check whether the user is logged into the web
    if session.get('Logged_in'):
        return True
    else:
        return False