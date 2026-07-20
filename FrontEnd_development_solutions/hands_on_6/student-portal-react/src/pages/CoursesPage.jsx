import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from '../components/CourseCard.jsx';
import { enroll, unenroll } from '../app/enrollmentSlice.js';
import { initialCourses } from '../data/courses.js';

function CoursesPage() {
  const [courses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const enrolledCourses = useSelector((state) => state.enrollment.enrolledCourses || []);

  function handleToggleEnroll(course) {
    const isEnrolled = enrolledCourses.some((c) => c.id === course.id);
    if (isEnrolled) {
      dispatch(unenroll(course.id));
      navigate('/profile');
    } else {
      dispatch(enroll(course));
      navigate('/profile');
    }
  }

  const filtered = courses.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="courses">
      <h2>Courses</h2>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="course-grid">
        {filtered.map((course) => {
          const isEnrolled = enrolledCourses.some((c) => c.id === course.id);

          return (
            <div key={course.id}>
              <Link to={`/courses/${course.id}`}>
                <CourseCard {...course} />
              </Link>
              <button type="button" onClick={() => handleToggleEnroll(course)}>
                {isEnrolled ? 'Unenroll' : 'Enroll'}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CoursesPage;