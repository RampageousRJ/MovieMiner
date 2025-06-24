from flask import Flask, request, render_template, jsonify
from wtforms import StringField, SubmitField
from flask_wtf import FlaskForm
from model.light import fetchSVD
from flask_cors import cross_origin
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretspecialkey'

class MovieForm(FlaskForm):
    title = StringField("Enter movie: ")
    submit = SubmitField("Recommend")

@app.route('/api', methods=['POST'])
@cross_origin()
def api():
    payload = request.get_json()
    result = fetchSVD(payload['title'])
    return result, 200, {'ContentType': 'application/json'}

@app.route('/', methods=['GET', 'POST'])
def home():
    movies = []
    form = MovieForm()
    if form.validate_on_submit():
        response = json.loads(fetchSVD(form.title.data))
        for row in response['Data']:
            movies.append(response['Data'][row])
        form.title.data = ""
    return render_template('home.html', movies=movies, form=form)

@app.route('/health', methods=['GET'])
def health():
    return 200, {'ContentType': 'application/json', 'Status': 'OK'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True, threaded=True)