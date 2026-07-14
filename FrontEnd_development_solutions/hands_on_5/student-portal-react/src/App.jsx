import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CourseCard from './components/CourseCard';
import StudentProfile from './components/StudentProfile';

function App() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialCourses = [
    { id: 1, name: 'Introduction to React', code: 'CS101', credits: 4, grade: 'A', enrolled: false },
    { id: 2, name: 'Advanced JavaScript', code: 'CS202', credits: 3, grade: 'A+', enrolled: false },
    { id: 3, name: 'Database Systems', code: 'CS303', credits: 3, grade: 'A', enrolled: false },
    { id: 4, name: 'Web Development', code: 'CS404', credits: 5, grade: 'O', enrolled: false },
  ];

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true);
        setError(null);

        await new Promise((resolve) => setTimeout(resolve, 400));

        setCourses(initialCourses);
      } catch (err) {
        setError("Failed to load local courses data.");
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []); 

  useEffect(() => {
    console.log('Courses updated');
  }, [courses]);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleEnroll(courseId) {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    setEnrolledCourses((prevEnrolled) => {
      const alreadyEnrolled = prevEnrolled.some((c) => c.id === courseId);
      if (alreadyEnrolled) return prevEnrolled;
      return [...prevEnrolled, course];
    });
  }

  return (
    <>
      <Header siteName="Student Portal" enrolledCount={enrolledCourses.length} />

      <main>
        <h2>Available Courses</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">Something went wrong: {error}</p>}
        {!loading && !error && (
          <>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <div className="course-grid">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  name={course.name}
                  code={course.code}
                  credits={course.credits}
                  grade={course.grade}
                  onEnroll={handleEnroll}
                  isEnrolled={enrolledCourses.some((c) => c.id === course.id)}
                />
              ))}
            </div>
          </>
        )}

        <StudentProfile />
      </main>

      <Footer />
    </>
  );
}

export default App;