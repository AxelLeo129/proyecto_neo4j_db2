from flask import request, jsonify
from main import app 

@app.route('/')
def index():
    return 'Server Works!'

@app.route('/register', methods=['POST'])
def register():
    user = {
        "name": request.json['name'],
        "email": request.json['name'],
        "password": request.json['name']
    }
    return jsonify({"message": "User registed success.", "user": user})