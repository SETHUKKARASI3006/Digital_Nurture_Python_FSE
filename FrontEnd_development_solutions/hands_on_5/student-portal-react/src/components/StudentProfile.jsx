import { useState } from 'react';

function StudentProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [semester, setSemester] = useState('');

  return (
    <section className="profile-form">
      <h2>My Profile</h2>

      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          Semester:
          <input
            type="text"
            value={semester}
            onChange={(event) => setSemester(event.target.value)}
          />
        </label>
      </form>

      <p>Preview: {name} | {email} | Semester {semester}</p>
    </section>
  );
}

export default StudentProfile;