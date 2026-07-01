from flask import Flask, jsonify
from config import Config
from courses.models import db
from flask_migrate import Migrate
from courses.routes import courses_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)

    # Register blueprints
    app.register_blueprint(courses_bp)

    @app.errorhandler(404)
    def resource_not_found(e):
        return jsonify({'status': 'error', 'message': 'Resource not found'}), 404

    return app

if __name__ == '__main__':
    application = create_app()
    application.run(host='127.0.0.1', port=5000, debug=True)