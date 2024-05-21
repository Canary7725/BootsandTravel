import pandas as pd
from prophet import Prophet
import json
import sys
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import time

load_dotenv()

def get_order_data():
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client['ecommerce']
    orders = db.orders.find()
    data = []
    for order in orders:
        data.append([order['createdAt'], order['total_price']])
    client.close()
    return pd.DataFrame(data, columns=['ds', 'y'])

def predict_future():
    data = get_order_data()
    model = Prophet()
    model.fit(data)
    future = model.make_future_dataframe(periods=30)
    forecast = model.predict(future)
    forecast['ds'] = forecast['ds'].astype(str)
    return forecast[['ds', 'yhat']].tail(30).to_dict(orient='records')

if __name__ == "__main__":
    if sys.argv[1] == 'predict':
        prediction = predict_future()
        print(json.dumps(prediction))
