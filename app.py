from flask import Flask,request,render_template
from wtforms import StringField,SubmitField
from flask_wtf import FlaskForm
import requests
from model.light import *

app = Flask(__name__)
app.config['SECRET_KEY']='supersecretspecialkey'

class MovieForm(FlaskForm):
    title = StringField("Enter movie: ")
    submit = SubmitField("Recommend")

@app.route('/api',methods=['POST'])
def api():
    payload = request.get_json()
    result = fetch(payload['title'])
    return result

@app.route('/',methods=['GET','POST'])
def home():
    movies = []
    form = MovieForm()
    if request.method == 'POST':
        data = {'title':form.title.data}
        response = requests.post("https://movieminer.onrender.com/api",json=data).json()
        print(response)
        for row in response['Data']:
            movies.append(response['Data'][row])    
        form.title.data=""
        return render_template('home.html',movies=movies,form=form)
    return render_template('home.html',form=form)

if __name__=='__main__':
    app.run(debug=1,threaded=True)