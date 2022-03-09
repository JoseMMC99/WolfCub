from flask_login import login_required
from flask import Blueprint, request, jsonify, make_response
from flask_cors import cross_origin
from models.user_model import User, UserSchema
from utils.db import db
import urllib.request, json
from app import bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from middlewares.authJWT import is_admin, check_belong

users = Blueprint('users', __name__)

@cross_origin
@users.route("/api/users")
def get_users():
  token = request.headers['authorization']

  if(not token):
    return jsonify(msg='Not token provided')

  if(not is_admin(token)):
    return jsonify(msg='You cant do that!')

  all_users = User.query.all()
  user_schema = UserSchema(many=True)
  all_users = user_schema.dump(all_users)

  return jsonify(all_users)

@cross_origin
@users.route("/api/users/<document>", methods=["GET"])
def get_user(document):
  token = request.headers['authorization']

  if(not token):
    return jsonify(msg='Not token provided')

  if(not is_admin(token)):

    if(not check_belong(token, document)):
      return jsonify(msg='You cant do that!')

  user_exist = User.query.get(document)
  if(not user_exist):
    return "That user does not exist"  

  user_schema = UserSchema()
  user = user_schema.dump(user_exist)

  # Getting the pet
  url = f'http://localhost:8008/api/pets/owner/{document}'
  response = urllib.request.urlopen(url)
  data = response.read()
  petData = json.loads(data)
  json_response = {"owner": user, "pet": petData['pet']}

  return json_response

@cross_origin
@users.route("/api/users", methods=['POST'])
def new_user():  
  document_id = request.form["document_id"]
  first_name = request.form["first_name"]
  last_name = request.form["last_name"]
  document_type = request.form["document_type"]
  user_type = request.form["user_type"]
  phone = request.form["phone"]
  gender = request.form["gender"]
  email = request.form["email"]
  password = User.encrypt_password(request.form["password"])

  new_user = User(document_id, first_name, last_name, document_type, user_type, phone,gender, email, password)

  db.session.add(new_user)
  db.session.commit()

  token = create_access_token(user=new_user)

  return jsonify(user=new_user,token=token)

@cross_origin
@users.route("/api/users/update/<document>", methods=["PUT"])
def update_user(document):
  token = request.headers['authorization']

  if(not token):
    return jsonify(msg='Not token provided')

  if(not is_admin(token)):

    if(not check_belong(token, document)):
      return jsonify(msg='You cant do that!')

  user_exist = User.query.get(document)

  if(not user_exist):
    return "That user does not exist"

  user_exist.document_id = request.form["document_id"]
  user_exist.first_name = request.form["first_name"]
  user_exist.last_name = request.form["last_name"]
  user_exist.document_type = request.form["document_type"]
  user_exist.user_type = request.form["user_type"]
  user_exist.phone = request.form["phone"]
  user_exist.gender = request.form["gender"]
  user_exist.email = request.form["email"]
  user_exist.password = request.form["password"]  

  db.session.commit()
  user_schema = UserSchema()
  user = user_schema.dump(user_exist)

  return jsonify(user)

@cross_origin
@users.route("/api/users/delete/<document>", methods=["DELETE"])
def delete_user(document):
  token = request.headers['authorization']

  if(not token):
    return jsonify(msg='Not token provided')

  if(not is_admin(token)):

    if(not check_belong(token, document)):
      return jsonify(msg='You cant do that!')

  user_exist = User.query.get(document)
  if(not user_exist):
    return jsonify(msg="That User does not exist")

  db.session.delete(user_exist)
  db.session.commit()
  return  jsonify(msg=f'User with document: {document} was removed')

@cross_origin
@users.route("/api/users/login", methods=["POST"])
def login_user():
  email = request.form["email"]
  user_exist = User.query.filter_by(email=email).first()
  if(not user_exist):
    return  jsonify(msg='Theres not user with that email')

  user_schema = UserSchema()
  user = user_schema.dump(user_exist)

  password = request.form["password"]

  if(password != user['password']):
    return  jsonify(msg='Incorrect password')

  access_token = create_access_token(user);

  return jsonify(token=access_token) 

