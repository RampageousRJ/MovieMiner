# MovieMiner
Movie Recommender API which makes use of cosine similarity to find movies similar to the one entered employing Flask as backend.

## Run Locally

Clone the project

```bash
  git clone https://github.com/RampageousRJ/MovieMiner.git
```


Install dependencies

```bash
  pip install -r requirements.txt
```

Start 

```
  export FLASK_DEBUG=1
  export FLASK_APP=app.py
  flask run
```


## API Reference

#### Send a POST request to the local/hosted URL

```
  POST https://movieminer.onrender.com/api/
````

Type of input for the API 

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Enter name of the movie|

Processes the movie title and returns result with all the necessary fields in a json format.

Output fields for the API for each Movie ID

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Title`      | `string` | Name of the movie|
| `Release Date`      | `string` | Release date of movie|
| `Overview`      | `string` | Overview of movie|
| `Vote_Average`      | `string` | Rating of the movie (unofficial)|
| `Original_Language`      | `string` | Native language of the movie|
| `Genre`      | `list` | List of genres for the movie|
| Poster_Url`      | `string` | Free URL for the movie poster|


