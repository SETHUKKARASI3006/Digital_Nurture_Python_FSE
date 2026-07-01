from flask import Flask, jsonify

app = Flask(__name__)

COURSES_RESOURCE_DB = {
    1: {"id": 1, "name": "Cloud Computing Infrastructures", "credits": 4},
    2: {"id": 2, "name": "Advanced Database Internals", "credits": 3}
}

@app.route('/api/courses/<int:id>/', methods=['GET'])
def resolve_course(id):
    record = COURSES_RESOURCE_DB.get(id)
    if not record:
        return jsonify({"error": "Course not found"}), 404
    return jsonify(record), 200

if __name__ == '__main__':
    app.run(port=5001, debug=True)