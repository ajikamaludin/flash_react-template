import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://user:password@mysql:3306/users_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'super-secret')
