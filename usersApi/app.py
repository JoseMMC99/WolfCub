from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from controllers.user_controllers import users

from dotenv import load_dotenv
import os

#Loading environment variables
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{os.getenv("USER")}@{os.getenv("HOST")}/{os.getenv("DB")}';
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

SQLAlchemy(app)
Marshmallow(app)

app.register_blueprint(users)

db = SQLAlchemy(app)


