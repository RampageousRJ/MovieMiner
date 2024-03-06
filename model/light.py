from thefuzz import fuzz,process
import pandas as pd
import pickle
import json

def match_fuzzy(title):
    return process.extract(title.lower(),df['Title_Lower'],scorer=fuzz.token_sort_ratio)[0][0]

f = open('model/dataframe.pkl','rb')
df = pickle.load(f)
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
