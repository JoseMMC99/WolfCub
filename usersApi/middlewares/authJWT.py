from flask_jwt_extended import decode_token
from flask_login import user_accessed

def check_belong(token, document_id):
  decoded_token = decode_token(token)
  user_accessed = decoded_token['sub']

  if(document_id != user_accessed['document_id']):
    return False

def is_admin(token):
  decoded_token = decode_token(token)
  user_accessed = decoded_token['sub']
  
  if(user_accessed['user_type'] != 3):
    return False