from flask import request, jsonify
from main import app 
from ..functions.operations import *

@app.route('/')
def index():
    return 'Server Works!'

@app.route('/actors-all', methods=['GET'])
def get_route_all_actors():
    actors = get_all_actors()
    return jsonify({"message": "Actors got success.", "actors": actors})

@app.route('/movies-all', methods=['GET'])
def get_route_all_movies():
    movies = get_all_movies()
    return jsonify({"message": "Movies got success.", "movies": movies})

@app.route('/get-profile/<string:profile_id>', methods=['GET'])
def get_one_profile_route(profile_id):
    user = read_profile(profile_id)
    return jsonify({"message": "Profile got success.", "user": user})

@app.route('/delete-profile/<string:profile_id>', methods=['DELETE'])
def delete_profile_route(profile_id):
    delete_profile(profile_id)
    return jsonify({"message": "Profile deleted success."})

@app.route('/update-profile/<string:profile_id>', methods=['PUT'])
def update_profile_route(profile_id):
    profile = {
        "name": request.json['nombre'],
        "icon": request.json['icon'],
        "recomendations": request.json['icon'],
    }
    response = update_profile(profile_id=profile_id, profile=profile)
    return jsonify(response)

@app.route('/create-profile', methods=['POST'])
def create_profile_route():
    profile = {
        "name": request.json['nombre'],
        "icon": request.json['icon']
    }
    response = create_profile(profile)
    return jsonify(response)

@app.route('/get-profile/<string:user_id>/<string:name>', methods=['GET'])
def get_profile_route(user_id, name):
    profile = get_profile_id(user_id, name)
    return jsonify({"message": "Profile got success.", "profile": profile})

@app.route('/get-user/<string:user_id>', methods=['GET'])
def get_user_route(user_id):
    user = read_user(user_id)
    return jsonify({"message": "User got success.", "user": user})

@app.route('/delete-user/<string:user_id>', methods=['DELETE'])
def delete_user_route(user_id):
    delete_user(user_id)
    return jsonify({"message": "User deleted success."})

@app.route('/update-user/<string:user_id>', methods=['PUT'])
def update_user_route(user_id):
    user = {
        "email": request.json['email'],
        "password": request.json['password'],
        "active": True,
        "name": request.json['name']
    }
    update_user(user_id, user)
    return jsonify({"message": "User updated success.", "user": user})

@app.route('/login', methods=['POST'])
def login():
    user = {
        "email": request.json['email'],
        "password": request.json['password']
    }
    response = get_user_id(user)
    return jsonify(response)

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