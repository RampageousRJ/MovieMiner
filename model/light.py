from thefuzz import fuzz,process
import pandas as pd
import numpy as np
import pickle
import json

def match_fuzzy(title):
    return process.extract(title.lower(),df['Title_Lower'],scorer=fuzz.token_sort_ratio)[0][0]

f = open('model/dataframe.pkl','rb')
df = pickle.load(f)
f.close()

f = open('model/U.pkl','rb')
U = pickle.load(f)
f.close()

def fetch(movie):
    payload = {'Status':"Error",'Data':{}}
    overview_score=[]
    title_score=[]
    genre_score=[]
    try:
        index = df[df['Title_Lower']==movie.lower()].iloc[0]
    except:
        index = df[df['Title_Lower']==match_fuzzy(movie.lower())].iloc[0]
    payload['Status']='OK'
    for row in df['Overview_Stemmed']:
        overview_score.append(fuzz.token_set_ratio(row,index['Overview_Stemmed']))
    for row in df['Title_Lower']:
        title_score.append(fuzz.token_set_ratio(row,index['Title_Lower']))
    for row in df['Genre']:
        genre_score.append(fuzz.partial_ratio(row,index['Genre']))
    df['Score']=[genre_score[i]*1.25 + overview_score[i]*1.5 + title_score[i]*2 for i in range(len(title_score))]
    payload['Data']=df.sort_values(by='Score',ascending=False).drop(['Overview_Stemmed','Title_Lower'],axis=1)[1:10].sort_values(by='Popularity',ascending=False)[0:6].T.to_dict()
    return json.dumps(payload)

def fetchSVD(movie):
    payload = {'Status': "Error", 'Data': {}}
    try:
        index = df[df['Title_Lower'] == movie.lower()].index[0]
    except IndexError:
        try:
            index = df[df['Title_Lower'] == match_fuzzy(movie.lower())].index[0]
        except IndexError:
            return json.dumps(payload)
    payload['Status'] = 'OK'
    movie_vector = U[index]
    similarities = np.dot(U, movie_vector)
    movies = sorted(list(enumerate(similarities)), reverse=True, key=lambda x: x[1])[1:7]
    similar_movies = [df.iloc[movie[0]] for movie in movies]
    similar_movies_df = pd.DataFrame(similar_movies).sort_values(by='Popularity', ascending=False).drop(['Title_Lower', 'Overview_Stemmed'], axis=1)
    payload['Data'] = similar_movies_df.to_dict(orient='index')
    return json.dumps(payload)
