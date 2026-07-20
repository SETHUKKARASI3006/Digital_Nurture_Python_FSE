import { useSelector, useDispatch } from 'react-redux';
import { selectEnrolledCourses, unenroll } from '../app/enrollmentSlice.js';
import StudentProfile from '../components/StudentProfile.jsx';

function ProfilePage() {
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const dispatch = useDispatch();

  return (
    <>
      <StudentProfile />

      <section className="enrolled-list">
        <h2>Enrolled Courses</h2>
        {enrolledCourses.length === 0 && <p>No courses enrolled yet.</p>}
        <ul>
          {enrolledCourses.map((course) => (
            <li key={course.id}>
              {course.name} ({course.credits} credits)
              <button type="button" onClick={() => dispatch(unenroll(course.id))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default ProfilePage;
