import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [applications, setApplications] = useState([]);
  const [newApplication, setNewApplication] = useState({ company: '', position: '', status: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/applications')
      .then(response => setApplications(response.data))
      .catch(error => console.error('Error fetching applications:', error));
  }, []);

  const addApplication = () => {
    axios.post('http://localhost:5000/applications', newApplication)
      .then(response => setApplications([...applications, response.data]))
      .catch(error => console.error('Error adding application:', error));
  };

  return (
    <div>
      <h1>Job Application Tracker</h1>
      <div>
        <input type="text" placeholder="Company" value={newApplication.company} onChange={(e) => setNewApplication({ ...newApplication, company: e.target.value })} />
        <input type="text" placeholder="Position" value={newApplication.position} onChange={(e) => setNewApplication({ ...newApplication, position: e.target.value })} />
        <input type="text" placeholder="Status" value={newApplication.status} onChange={(e) => setNewApplication({ ...newApplication, status: e.target.value })} />
        <button onClick={addApplication}>Add Application</button>
      </div>
      <ul>
        {applications.map(application => (
          <li key={application.id}>
            {`${application.company} - ${application.position} (${application.status})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
