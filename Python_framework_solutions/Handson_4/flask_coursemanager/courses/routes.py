from flask import Blueprint, request, jsonify

courses_bp = Blueprint('courses', __name__, url_prefix='/api/courses')

mock_courses_db = {}
id_counter = 1

def make_response_json(data, status_code=200):
    """Enforces a consistent success JSON envelope across endpoints."""
    return jsonify({'status': 'success', 'data': data}), status_code

@courses_bp.route('/', methods=['GET'])
def list_courses():
    """1. List all courses (GET /api/courses/)"""
    return make_response_json(list(mock_courses_db.values()), 200)

@courses_bp.route('/', methods=['POST'])
def create_course():
    """2. Create a new course (POST /api/courses/)"""
    global id_counter
    data = request.get_json()
    
    if not data:
        return jsonify({'status': 'error', 'message': 'Missing request body'}), 400
        
    required_fields = ['name', 'code', 'credits']
    missing_fields = [f for f in required_fields if f not in data]
    if missing_fields:
        return jsonify({'status': 'error', 'message': f'Missing required fields: {missing_fields}'}), 400

    new_course = {
        'id': id_counter,
        'name': data['name'],
        'code': data['code'],
        'credits': data['credits']
    }
    mock_courses_db[id_counter] = new_course
    id_counter += 1
    return make_response_json(new_course, 201)

@courses_bp.route('/<int:course_id>/', methods=['GET'])
def get_course(course_id):
    """3. Retrieve a single course by ID (GET /api/courses/{id}/)"""
    item = mock_courses_db.get(course_id)
    if not item:
        return jsonify({'status': 'error', 'message': 'Course resource not found'}), 404
    return make_response_json(item, 200)

@courses_bp.route('/<int:course_id>/', methods=['PUT'])
def update_course(course_id):
    """4. Update a course (PUT /api/courses/{id}/)"""
    item = mock_courses_db.get(course_id)
    if not item:
        return jsonify({'status': 'error', 'message': 'Course resource not found'}), 404
        
    data = request.get_json() or {}
    item['name'] = data.get('name', item['name'])
    item['code'] = data.get('code', item['code'])
    item['credits'] = data.get('credits', item['credits'])
    return make_response_json(item, 200)

@courses_bp.route('/<int:course_id>/', methods=['DELETE'])
def delete_course(course_id):
    """5. Delete a course (DELETE /api/courses/{id}/)"""
    if course_id in mock_courses_db:
        del mock_courses_db[course_id]
        return make_response_json({'message': 'Course deleted successfully'}, 200)
    return jsonify({'status': 'error', 'message': 'Course resource not found'}), 404