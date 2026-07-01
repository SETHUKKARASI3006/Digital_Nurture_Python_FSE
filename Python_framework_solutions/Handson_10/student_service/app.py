from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/api/students/<int:id>/enroll', methods=['POST'])
def process_student_enrollment(id):
    payload = request.get_json() or {}
    target_course_id = payload.get("course_id")
    
    if not target_course_id:
        return jsonify({"error": "Missing course_id parameter"}), 400

    try:
        upstream_url = f"http://127.0.0.1:5001/api/courses/{target_course_id}/"
        upstream_call = requests.get(upstream_url, timeout=2.0)
        
        if upstream_call.status_code == 404:
            return jsonify({"error": "Cannot complete enrollment: target course does not exist"}), 400
        elif upstream_call.status_code != 200:
            return jsonify({"error": "Upstream course service reported an error"}), 502
            
    except requests.exceptions.ConnectionError:
        return jsonify({"error": "Course Service is temporarily unavailable"}), 503

    return jsonify({
        "status": "success", 
        "message": f"Student {id} successfully enrolled in course {target_course_id}"
    }), 201

if __name__ == '__main__':
    app.run(port=5002, debug=True)