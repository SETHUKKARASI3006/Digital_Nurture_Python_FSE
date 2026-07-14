function CourseCard({ id, name, code, credits, grade, onEnroll, isEnrolled }) {
  return (
    <article className="course-card">
      <h3>{name}</h3>
      <p>{code}</p>
      <span>{credits} Credits</span>
      <p>Grade: {grade}</p>
      <button 
        onClick={() => onEnroll(id)} 
        disabled={isEnrolled}
        className={isEnrolled ? 'btn-enrolled' : 'btn-enroll'}
      > 
        {isEnrolled ? 'Enrolled' : 'Enroll'}
      </button>
 
    </article>
  );
}
 
export default CourseCard;