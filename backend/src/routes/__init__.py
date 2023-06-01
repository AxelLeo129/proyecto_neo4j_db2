from flask import request, jsonify
from main import app 
from ..functions.operations import *

@app.route('/')
def index():
    return 'Server Works!'

@app.route('/movies-disliked/<string:profile_id>', methods=['GET'])
def get_route_disliked(profile_id):
    movies = profile_disliked(profile_id)
    return jsonify(movies)

@app.route('/delete-disliked', methods=['DELETE'])
def delete_route_disliked():
    delete_disliked(request.json['profile_id'], request.json['movie_id'])
    return jsonify({"message": "delete disliked"})

@app.route('/create-disliked', methods=['POST'])
def create_route_disliked():
    create_disliked(request.json['profile_id'], request.json['movie_id'])
    return jsonify({"message": "disliked"})

@app.route('/movies-liked/<string:profile_id>', methods=['GET'])
def get_route_liked(profile_id):
    movies = profile_liked(profile_id)
    return jsonify(movies)

@app.route('/delete-liked', methods=['DELETE'])
def delete_route_liked():
    delete_liked(request.json['profile_id'], request.json['movie_id'])
    return jsonify({"message": "delete liked"})

@app.route('/create-liked', methods=['POST'])
def create_route_liked():
    create_liked(request.json['profile_id'], request.json['movie_id'])
    return jsonify({"message": "liked"})

@app.route('/genres-all', methods=['GET'])
def get_route_all_genders():
    genres = get_all_genres()
    return jsonify(genres)

@app.route('/directos-all', methods=['GET'])
def get_route_all_directors():
    directors = get_all_directors()
    return jsonify(directors)

@app.route('/actors-all', methods=['GET'])
def get_route_all_actors():
    actors = get_all_actors()
    return jsonify(actors)

@app.route('/movies-all', methods=['GET'])
def get_route_all_movies():
    movies = get_all_movies()
    return jsonify(movies)

@app.route('/get-profile/<string:profile_id>', methods=['GET'])
def get_one_profile_route(profile_id):
    user = read_profile(profile_id)
    return jsonify(user)

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
    return jsonify(profile)

@app.route('/get-user/<string:user_id>', methods=['GET'])
def get_user_route(user_id):
    user = read_user(user_id)
    return jsonify(user)

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
    return jsonify(user)

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
    return jsonify(user)

@app.route('/user-profiles', methods=['GET'])
def getUserProfiles():
    return jsonify([
        {
            "id": 1,
            "nombre": "Axel",
            "icon": "profile1.png"
        }
    ])