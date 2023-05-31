from flask import request, jsonify
from main import app 
from ..functions.operations import *

@app.route('/')
def index():
    return 'Server Works!'

@app.route('/register', methods=['POST'])
def register():
    user = {
        "name": request.json['nombre'],
        "email": request.json['email'],
        "password": request.json['password'],
        "type": request.json["tipo"]
    }
    create_user(user=user)
    return jsonify({"message": "User registed success.", "user": user})

@app.route('/user-profiles', methods=['GET'])
def getUserProfiles():
    return jsonify([
        {
            "id": 1,
            "nombre": "Axel",
            "icon": "profile1.png"
        }
    ])