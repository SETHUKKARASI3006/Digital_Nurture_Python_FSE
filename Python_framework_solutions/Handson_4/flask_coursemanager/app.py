from flask import Flask, jsonify
from config import Config
from courses.routes import courses_bp

def create_app():
    """Application Factory to set up Flask."""
    app = Flask(__name__)
    app.config.from_object(Config)

    app.register_blueprint(courses_bp)

    @app.errorhandler(404)
    def resource_not_found(e):
        return jsonify({'status': 'error', 'message': 'The requested API endpoint location was not identified'}), 404

    @app.errorhandler(500)
    def internal_server_error(e):
        return jsonify({'status': 'error', 'message': 'An internal processing error occurred'}), 500

    return app

if __name__ == '__main__':
    application = create_app()
    application.run(host='127.0.0.1', port=5000, debug=True)