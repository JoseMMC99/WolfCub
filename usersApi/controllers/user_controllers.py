from flask import Blueprint, request, jsonify
from models.user_model import User, UserSchema
from utils.db import db

users = Blueprint('users', __name__)

@users.route("/users")
def get_users():
  all_users = User.query.all()
  user_schema = UserSchema(many=True)
  all_users = user_schema.dump(all_users)
  print(all_users)

  return jsonify(all_users)

@users.route("/users/<document>", methods=["GET"])
def get_user(document):
  user_exist = User.query.get(document)
  if(not user_exist):
    return "That user does not exist"
  
  user_schema = UserSchema()
  user = user_schema.dump(user_exist)
  return jsonify(user)

@users.route("/users", methods=['POST'])
def new_user():
  document_id = request.form["document_id"]
  first_name = request.form["first_name"]
  last_name = request.form["last_name"]
  document_type = request.form["document_type"]
  user_type = request.form["user_type"]
  phone = request.form["phone"]
  gender = request.form["gender"]
  email = request.form["email"]
  password = request.form["password"]  

  new_user = User(document_id, first_name, last_name, document_type, user_type, phone,gender, email, password)

  db.session.add(new_user)
  db.session.commit()

  return first_name

@users.route("/users/update/<document>", methods=["PUT"])
def update_user(document):
  user_exist = User.query.get(document)

  if(not user_exist):
    return "That user does not existe"

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

@users.route("/users/delete/<document>", methods=["DELETE"])
def delete_user(document):
  user_exist = User.query.get(document)
  if(not user_exist):
    return "That User does not exist"

  db.session.delete(user_exist)
  db.session.commit()
  return f'User with document: {document} was removed'