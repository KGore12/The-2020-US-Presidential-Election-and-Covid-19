# Dependencies
import os
import sqlalchemy
import psycopg2
from flask import Flask
from flask import render_template  
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from flask import jsonify
import json
import numpy as np

app = Flask(__name__)
con = psycopg2.connect("postgresql://postgres:bootcamp!@project2.cy7mfzyzcf0j.us-east-2.rds.amazonaws.com:5432/project2db")
cursor = con.cursor()

# Save Connection String
databaseURI = "postgresql://postgres:bootcamp!@project2.cy7mfzyzcf0j.us-east-2.rds.amazonaws.com:5432/project2db"

# Create Engine
engine = create_engine(databaseURI)
session = Session(engine)

#Reflect into Model
Base = automap_base()

#Reflect tables too
Base.prepare(engine, reflect=True)

# Flask Routes
@app.route("/")
def home():
    cursor.execute('''SELECT * FROM state''')
    results = cursor.fetchall()
    return (
        jsonify(results)
    )

if  __name__ == "__main__":
    app.run(debug=True)