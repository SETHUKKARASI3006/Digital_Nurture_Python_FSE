import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { enroll, unenroll } from '../app/enrollmentSlice.js';
import { initialCourses } from '../data/courses.js';

function CourseDetailPage() {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const enrolledCourses = useSelector((state) => state.enrollment.enrolledCourses || []);

  useEffect(() => {
    if (!courseId) return;

    const selectedCourse = initialCourses.find(
      (c) => c.id === Number(courseId)
    );

    setCourse(selectedCourse || null);
    setLoading(false);
  }, [courseId]);

  if (loading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found.</p>;

  const isEnrolled = enrolledCourses.some((c) => c.id === course.id);

  function handleToggleEnroll() {
    if (isEnrolled) {
      dispatch(unenroll(course.id));
    } else {
      dispatch(enroll(course));
    }
  }

  return (
    <section className="course-detail">
      <h2>{course.name}</h2>
      <p>{course.code} · {course.credits} credits</p>
      <button type="button" onClick={handleToggleEnroll}>
        {isEnrolled ? 'Unenroll' : 'Enroll'}
      </button>
    </section>
  );
}

export default CourseDetailPage;