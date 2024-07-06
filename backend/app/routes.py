from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from . import app, db
from .models import User
from sqlalchemy import and_, not_

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check if username or email is already registered
    existing_user = User.query.filter((User.username == data['username']) | (User.email == data['email'])).first()
    if existing_user:
        if existing_user.email == data['email']:
            return jsonify({'message': 'Email already registered'}), 400
        else:
            return jsonify({'message': 'Username already taken'}), 400

    # If email is not registered, proceed with user registration
    hashed_password = generate_password_hash(data['password'])
    new_user = User(username=data['username'], password=hashed_password, real_name=data['real_name'],
                    email=data['email'], phone=data['phone'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
    access_token = create_access_token(identity=user.id)
    user.token = access_token
    db.session.commit()
    return jsonify(access_token=access_token,user={
        "id": user.id, 
        "username": user.username, 
        "real_name": user.real_name, 
        "email": user.email, 
        "phone": user.phone,
        "created_at": user.created_at, 
        "updated_at": user.updated_at
    })

@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(id=user.id, username=user.username, real_name=user.real_name, email=user.email, phone=user.phone,
                   created_at=user.created_at, updated_at=user.updated_at)

@app.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    data = request.get_json()

    existing_user = User.query.filter(and_(
        (User.username == data['username']) | (User.email == data['email']),
        not_(User.id == user_id)
    )).first()
    if existing_user:
        if existing_user.email == data['email']:
            return jsonify({'message': 'Email already taken'}), 400
        else:
            return jsonify({'message': 'Username already taken'}), 400

    user = User.query.get(user_id)
    if 'real_name' in data:
        user.real_name = data['real_name']
    if 'email' in data:
        user.email = data['email']
    if 'username' in data:
        user.username = data['username']
    if 'phone' in data:
        user.phone = data['phone']
    if 'password' in data and data['password'] != '':
        user.password = generate_password_hash(data['password'])
    db.session.commit()
    return jsonify(message='Profile updated successfully', user={
        "id": user.id, 
        "username": user.username, 
        "real_name": user.real_name, 
        "email": user.email, 
        "phone": user.phone,
        "created_at": user.created_at, 
        "updated_at": user.updated_at
    })
