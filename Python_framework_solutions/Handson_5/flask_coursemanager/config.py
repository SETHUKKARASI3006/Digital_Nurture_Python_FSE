import os

class Config:
    """Application configuration management properties."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-12345')
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///coursemanager.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False