from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from dotenv import load_dotenv
import os

#Loading environment variables
load_dotenv()

app = Flask(__name__)
cors = CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{os.getenv("USERS")}:{os.getenv("PASSWORD")}@{os.getenv("HOST")}/{os.getenv("DB")}';
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Json web token manager
app.config['JWT_SECRET_KEY'] = os.getenv("JWT")
jwt = JWTManager(app)

# Password encryption
bcrypt = Bcrypt(app)

# ORM
SQLAlchemy(app)

# Schema manager
Marshmallow(app)

#Router
from controllers.user_controllers import users
app.register_blueprint(users)

db = SQLAlchemy(app)


