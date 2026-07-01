from flask import Blueprint, request, jsonify
from courses.models import db, Course, Student, Enrollment

courses_bp = Blueprint('courses', __name__, url_prefix='/api/courses')

def make_response_json(data, status_code=200):
    return jsonify({'status': 'success', 'data': data}), status_code

@courses_bp.route('/', methods=['GET'])
def list_courses():
    """Fetch all courses directly from the DB database table."""
    records = Course.query.all()
    return make_response_json([r.to_dict() for r in records], 200)

@courses_bp.route('/', methods=['POST'])
def create_course():
    """Insert a new course entry into the database table."""
    data = request.get_json() or {}
    required = ['name', 'code', 'credits', 'department_id']
    if not all(k in data for k in required):
        return jsonify({'status': 'error', 'message': 'Missing mandatory parameters'}), 400

    new_course = Course(
        name=data['name'],
        code=data['code'],
        credits=data['credits'],
        department_id=data['department_id']
    )
    db.session.add(new_course)
    db.session.commit()
    return make_response_json(new_course.to_dict(), 201)

@courses_bp.route('/<int:id>/', methods=['GET'])
def get_course(id):
    """Combine primary key lookups with a 404 handler in one line."""
    record = Course.query.get_or_404(id)
    return make_response_json(record.to_dict(), 200)

@courses_bp.route('/<int:id>/', methods=['PUT'])
def update_course(id):
    record = Course.query.get_or_404(id)
    data = request.get_json() or {}
    record.name = data.get('name', record.name)
    record.code = data.get('code', record.code)
    record.credits = data.get('credits', record.credits)
    db.session.commit()
    return make_response_json(record.to_dict(), 200)

@courses_bp.route('/<int:id>/', methods=['DELETE'])
def delete_course(id):
    record = Course.query.get_or_404(id)
    db.session.delete(record)
    db.session.commit()
    return make_response_json({'message': 'Record successfully deleted'}, 200)

@courses_bp.route('/<int:id>/students/', methods=['GET'])
def get_enrolled_students(id):
    """Executes a database JOIN query operation to find students linked to a course."""
    Course.query.get_or_404(id)  # Validate if course exists
    records = db.session.query(Student).join(Enrollment).filter(Enrollment.course_id == id).all()
    return make_response_json([s.to_dict() for s in records], 200)