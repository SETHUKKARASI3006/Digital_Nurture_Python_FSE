import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEnrolledCount } from '../app/enrollmentSlice.js';

function Header({ siteName }) {
  const enrolledCount = useSelector(selectEnrolledCount);

  return (
    <header className="app-header">
      <div className="site-name">{siteName}</div>
      <nav aria-label="Main navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>
      <div className="enrolled-count">Enrolled: {enrolledCount}</div>
    </header>
  );
}

export default Header;
