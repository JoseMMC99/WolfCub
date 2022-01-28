#Creating the environment
python -m venv <env_directory_name> #usually env

#Activating the env
cd <env_directory_name>
. Scripts/activate

#Installing libraries
pip install flask flask-sqlalchemy flask-marshmallow marshmallow-sqlalquemy pymysql python-dotenv