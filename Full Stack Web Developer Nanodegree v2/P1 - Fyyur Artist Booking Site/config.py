import os
SECRET_KEY = os.urandom(32)
# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))

# Enable debug mode.
DEBUG = True

# Connect to the database
SQLALCHEMY_TRACK_MODIFICATIONS = False

# TODO IMPLEMENT DATABASE URL
SQLALCHEMY_DATABASE_URI = "postgres://{}:{}@{}/{}".format('postgres', 'abc@123', 'localhost:5432', 'artist')