import pandas as pd
import pickle

f = open('model/dataframe.pkl','rb')
df = pickle.load(f)
f.close()

fm = open('model/matrix.pkl','rb')
similarity_matrix = pickle.load(fm)
fm.close()


def fetch(movie):
    try:
        index = df[df['Title_Lower']==movie.lower()].index[0]
    except:
        return "Not Available"
    movies = sorted(list(enumerate(similarity_matrix[index])),reverse=True,key=lambda x:x[1])[1:7]
    similar_movies = []
    for movie in movies:
        similar_movies.append(df.iloc[movie[0]])
    return pd.DataFrame(similar_movies).sort_values(by='Popularity',ascending=False).drop(['Title_Lower','Overview_Stemmed','Similar','Popularity','Year'],axis=1).T.to_json()
