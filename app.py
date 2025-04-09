import json

from flask import Flask, render_template, request, redirect, session, url_for
from flask_sqlalchemy import SQLAlchemy


from config import Config
import models
from form import *
from functions import *

app = Flask(__name__)

# Loading the configture
app.config.from_object(Config)

db = SQLAlchemy(app)

User = models.User


@app.route('/')
def hello_world():
    return redirect('/login')


# login page
@app.route('/login', methods=['GET', 'POST'])
def lohgin():
    if request.method == 'GET':
        form = LoginForm()  # get the value from "GET"
        return render_template('login.html', form=form)
    else:
        # pwd = request.form.get('password')  # get the value from "POST"
        # user = request.form.get('username')  # get the value from "POST"
        form = LoginForm()
        if form.validate_on_submit():
            print("start")
            user = form.name.data  # get the value from "POST"
            print(user)
            pwd = form.pwd.data  # get the value from "POST"
            print(pwd)
            print("end")
            checkuser = User.query.filter(User.user_name == user).first()

            if checkuser == None:
                print("1")
                return render_template("login.html", msg="This username has not been registered", form=form)
            else:
                print("2")
                if checkuser.check_password(pwd):
                    session['Logged_in'] = True
                    session['user_info'] = user
                    session['id'] = checkuser.id
                    session['username'] = user
                    return redirect('/main_page')
                else:
                    return render_template("login.html", msg='Incorrect user name or password', form=form)
        else:
            return render_template("login.html", msg='Incorrect user name or password', form=form)


# @app.route('/user_check', methods=['GET', 'POST'])
# def usercheck():
#     if request.method =='GET':
#         return render_template('login.html')
#     request.args  #get the value from "GET"
#     pwd = request.form.get('password')  #get the value from "POST"
#     user = request.form.get('username')  #get the value from "POST"
#     checkuser = User.query.filter(User.user_name == user).first()
#
#     if checkuser == None:
#         return render_template("login.html", msg="This username has not been registered")
#     else:
#         if checkuser.check_password(pwd):
#             session['Logged_in'] = True
#             session['user_info'] = user
#             session['id'] = checkuser.id
#             session['UserName'] = user
#             return redirect('/main_page')
#         else:
#             return render_template("login.html", msg='Incorrect user name or password')


#log out
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.clear()
    return redirect('/')



# register page
@app.route('/register', methods=['GET', 'POST'])
def register():
    if islogined():
        return redirect('/main_page')
    else:
        if request.method == 'GET':
            form = RegisterForm()
            return render_template('register.html', form=form)
        else:
            form = RegisterForm()
            print(form.validate_on_submit())
            if form.validate_on_submit():
                print("start")
                username = form.name.data
                pwd1 = form.pwd1.data
                pwd2 = form.pwd2.data
                checkuser = User.query.filter(User.user_name == username).first()

                # already have this username in database
                if checkuser != None:
                    return render_template("register.html", msg="This username has been registered.", form=form)

                # Check whether the password is correctly inputed
                if pwd1 != None and pwd1 == pwd2:
                    # Create a new user account and store it in database
                        new_user = User(user_name=username)
                        new_user.set_password(pwd1)
                        db.session.add(new_user)
                        db.session.commit()
                        return redirect('/login')
                else:
                    return render_template("register.html", msg="Please confirm you filled in the correct password twice.", form=form)
            else:
                return render_template("register.html", msg="Something wrong during register.", form=form)


# Single player
@app.route('/single', methods=['GET', 'POST'])
def single():
    return render_template("mazesingle.html")


# Double player
@app.route('/versus', methods=['GET', 'POST'])
def double():
    return render_template("maze.html")


# get rank list data
@app.route('/rank_list', methods=['GET', 'POST'])
def getRank():
    data = Rank.query
    rank = data.order_by(Rank.step).limit(5)
    return render_template("rank.html", rank=rank)


# get data from single
@app.route('/post_rank', methods=['GET', 'POST'])
def postRank():
    data = request.get_data()
    print(data)
    json_data = json.loads(data.decode("utf-8"))
    step = json_data.get("step")
    print(step)
    h = json_data.get("timeh")
    print(h)
    m = json_data.get("timem")
    print(m)
    s = json_data.get("times")
    print(s)
    ms = json_data.get("timems")
    print(ms)
    uname = session['username']
    time = setTime(h,m,s,ms)
    print(uname)
    if(uname == None):
        print("111")
        return redirect(url_for('register'))
    print("???")
    new_rank = Rank(user_name = uname, time = time, step = step)
    db.session.add(new_rank)
    db.session.commit()
    return redirect('/main_page')





# main page
@app.route('/main_page')
def main_page():
    if islogined():
        name = session['username']
    else:
        name = "visitor"
        session['username'] = None
    return render_template('main_page.html', islogin=islogined(), username=name)


# help page
@app.route('/help')
def help_page():
    return render_template('help.html')


# reset the database
@app.route('/reset_db')
def reset_db():
    set_db()
    return redirect('/')



if __name__ == '__main__':
    app.run(debug=True)

