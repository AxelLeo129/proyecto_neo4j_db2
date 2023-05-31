from flask import Flask
from flask_cors import CORS
from neo4j import GraphDatabase

uri = "neo4j+s://5594cb00.databases.neo4j.io"
username = "neo4j"
password = "tUBHO1gPQoDRTvF7l8iyrTB1dTrrjU5ZMI1idIKCSmY"
driver = GraphDatabase.driver(uri, auth=(username, password))

app = Flask(__name__)
CORS(app)

from src.routes import *

if __name__ == '__main__':
    app.run(debug = True, port = 3000)