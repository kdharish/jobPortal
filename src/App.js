// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Navigation from './components/Navigation';
import JobListing from './components/JobListing';
import JobPostForm from './components/JobPostForm';
import Dashboard from './components/Dashboard';
import { Link } from 'react-router-dom';
import staticData from './staticdata.json';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [sampleJobs, setJobs] = useState(staticData);

  useEffect(() => {
    // Check for stored user details on component mount
    const storedDetails = localStorage.getItem('userDetails');
    if (storedDetails) {
      const { userType } = JSON.parse(storedDetails);
      setUserRole(userType);
    }
  }, []);

  const handleLogout = () => {
    // Clear stored details and reset state
    localStorage.removeItem('userDetails');
    setUserRole(null);
  };

  const isEmployerOrAdmin = () => {
    const storedDetails = localStorage.getItem('userDetails');
    if (storedDetails) {
      const { userType } = JSON.parse(storedDetails);
      return userType === 'employer' || userType === 'admin';
    }
    return false;
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!userRole) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/dashboard" />;
    }
    return children;
  };

  // Sample job data
  // const sampleJobs = staticData;
  // [
  //   {
  //     id: 1,
  //     title: 'Senior React Developer',
  //     company: 'Tech Corp',
  //     location: 'Remote',
  //     experience: '5',
  //     salary: '$120,000 - $150,000',
  //     job_type: 'Full-time',
  //     posted: '2 days ago'
  //   },
  //   {
  //     id: 2,
  //     title: 'Full Stack Developer',
  //     company: 'Innovation Labs',
  //     location: 'New York, NY',
  //     experience: '3',
  //     salary: '$90,000 - $120,000',
  //     job_type: 'Full-time',
  //     posted: '1 day ago'
  //   }
  // ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        {userRole && <Navigation userRole={userRole} onLogout={handleLogout} />}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/login"
              element={
                userRole ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login onLogin={(role) => setUserRole(role)} />
                )
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard userRole={userRole} />
                </ProtectedRoute>
              }
            />

            {/* Employee Routes */}
            <Route
              path="/jobs"
              element={
<ProtectedRoute allowedRoles={['employee']}>
  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a202c' }}>
        Available Jobs
      </h1>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {sampleJobs.map((job) => (
        <div
          key={job.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            {job.title}
          </h2>
          <p style={{ marginBottom: '4px' }}>
            <strong>Company:</strong> {job.company}
          </p>
          <p style={{ marginBottom: '4px' }}>
            <strong>Location:</strong> {job.location}
          </p>
          <p style={{ marginBottom: '4px' }}>
            <strong>Experience:</strong> {job.experience}
          </p>
          <p style={{ marginBottom: '4px' }}>
            <strong>Salary:</strong> {job.salary}
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>Skills:</strong> {job.key_skills.join(', ')}
          </p>

          <button
            onClick={() => console.log('Applied to job:', job.id)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Apply Now
          </button>
        </div>
      ))}
    </div>
  </div>
</ProtectedRoute>

              }
            />

            <Route
              path="/applications"
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
                    <p className="text-gray-600">Track your job applications here.</p>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Employer Routes */}
            <Route
              path="/post-job"
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <JobPostForm onSubmit={(data) => console.log('Job posted:', data)} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-listings"
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h1 className="text-2xl font-bold text-gray-900">My Job Listings</h1>
                      <Link
                        to="/post-job"
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Post New Job
                      </Link>
                    </div>
                    <div className="grid gap-6">
                      {sampleJobs.map(job => (
                        <JobListing
                          key={job.id}
                          job={job}
                          isEmployer={true}
                          onApply={(id, action) => console.log(`${action} job:`, id)}
                        />
                      ))}
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
                    <p className="text-gray-600">User management dashboard will be displayed here.</p>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/all-jobs"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <div style={{ padding: '20px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a202c', marginBottom: '20px' }}>
                      All Jobs
                    </h1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {sampleJobs.map((job) => (
                        <div
                          key={job.id}
                          style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '16px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                          }}
                        >
                          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                            {job.title}
                          </h2>
                          <p style={{ marginBottom: '4px' }}>
                            <strong>Company:</strong> {job.company}
                          </p>
                          <p style={{ marginBottom: '4px' }}>
                            <strong>Location:</strong> {job.location}
                          </p>
                          <p style={{ marginBottom: '4px' }}>
                            <strong>Experience:</strong> {job.experience}
                          </p>
                          <p style={{ marginBottom: '4px' }}>
                            <strong>Salary:</strong> {job.salary}
                          </p>
                          <p style={{ marginBottom: '12px' }}>
                            <strong>Skills:</strong> {job.key_skills.join(', ')}
                          </p>
                          {isEmployerOrAdmin() && (
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <button
                                onClick={() => console.log('Edit job:', job.id)}
                                style={{
                                  padding: '6px 12px',
                                  border: 'none',
                                  backgroundColor: '#007bff',
                                  color: '#fff',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => console.log('Delete job:', job.id)}
                                style={{
                                  padding: '6px 12px',
                                  border: 'none',
                                  backgroundColor: '#dc3545',
                                  color: '#fff',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Default Route */}
            <Route
              path="/"
              element={<Navigate to="/dashboard" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;