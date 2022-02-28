from utils.db import db, ma
from flask_login import UserMixin
from app import bcrypt

class User(db.Model):
  document_id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(100))
  last_name = db.Column(db.String(100))
  document_type = db.Column(db.String(100))
  user_type = db.Column(db.String(100))
  phone = db.Column(db.Integer)
  gender = db.Column(db.String(10))
  email = db.Column(db.String(100))
  password = db.Column(db.String(50))

  def __init__(self, document_id, first_name, last_name, document_type, user_type, phone, gender, email, password):
    self.document_id = document_id
    self.first_name = first_name
    self.last_name = last_name
    self.document_type = document_type
    self.user_type = user_type
    self.phone = phone
    self.gender = gender
    self.email = email
    self.password = password

  def encrypt_password(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')

class UserSchema(ma.Schema):
  class Meta:
    fields = ('document_id', 'first_name', 'last_name', 'document_type', 'user_type', 'phone', 'gender', 'email', 'password')
