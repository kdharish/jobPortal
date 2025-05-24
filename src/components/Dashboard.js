import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BriefcaseIcon, PlusCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function Dashboard({ userRole }) {
  const navigate = useNavigate();

  const roleActions = {
    employee: [
      {
        title: 'Browse Jobs',
        description: 'Search and apply for available positions',
        icon: BriefcaseIcon,
        action: () => navigate('/jobs'),
        buttonText: 'View Jobs',
        color: 'bg-blue-500'
      },
      {
        title: 'My Applications',
        description: 'Track your job applications',
        icon: UserGroupIcon,
        action: () => navigate('/applications'),
        buttonText: 'View Applications',
        color: 'bg-green-500'
      }
    ],
    employer: [
      {
        title: 'Post a Job',
        description: 'Create a new job listing',
        icon: PlusCircleIcon,
        action: () => navigate('/post-job'),
        buttonText: 'Post New Job',
        color: 'bg-blue-500'
      },
      {
        title: 'My Listings',
        description: 'Manage your job postings',
        icon: BriefcaseIcon,
        action: () => navigate('/my-listings'),
        buttonText: 'View Listings',
        color: 'bg-green-500'
      }
    ],
    admin: [
      {
        title: 'Manage Users',
        description: 'View and manage user accounts',
        icon: UserGroupIcon,
        action: () => navigate('/users'),
        buttonText: 'Manage Users',
        color: 'bg-purple-500'
      },
      {
        title: 'All Jobs',
        description: 'Overview of all job listings',
        icon: BriefcaseIcon,
        action: () => navigate('/all-jobs'),
        buttonText: 'View All Jobs',
        color: 'bg-blue-500'
      }
    ]
  };

  const actions = roleActions[userRole] || [];

  return (
<div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '48px 0' }}>
  <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 16px' }}>
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a202c', marginBottom: '8px' }}>
        Welcome to Your Dashboard
      </h1>
      <p style={{ fontSize: '18px', color: '#718096', marginBottom: '32px' }}>
        {userRole === 'employee' && 'Find and apply for your dream job'}
        {userRole === 'employer' && 'Manage your job listings and find great talent'}
        {userRole === 'admin' && 'Manage users and oversee job listings'}
      </p>
    </div>

    <div style={{ marginTop: '40px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
        }}
      >
        {actions.map((action, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              transition: 'box-shadow 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ backgroundColor: action.color || '#007bff', color: '#fff', padding: '12px', borderRadius: '8px' }}>
                {/* <action.icon style={{ width: '24px', height: '24px' }} /> */}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1a202c' }}>{action.title}</h3>
                <p style={{ fontSize: '14px', color: '#718096', marginTop: '4px' }}>{action.description}</p>
              </div>
            </div>
            <div style={{ marginTop: '24px' }}>
              <button
                onClick={action.action}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  fontSize: '14px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
              >
                {action.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
} 