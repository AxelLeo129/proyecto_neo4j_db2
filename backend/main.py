from flask import Flask

app = Flask(__name__)
app.config.from_object("config.dev")

from src.routes import *

if __name__ == '__main__':
    app.run()