import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/outline';

export default function Navigation({ userRole, onLogout }) {
  const navigate = useNavigate();

  const getMenuItems = () => {
    switch (userRole) {
      case 'employee':
        return [
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Browse Jobs', href: '/jobs' },
          { name: 'My Applications', href: '/applications' },
        ];
      case 'employer':
        return [
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Post Job', href: '/post-job' },
          { name: 'My Listings', href: '/my-listings' },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Manage Users', href: '/users' },
          { name: 'All Jobs', href: '/all-jobs' },
        ];
      default:
        return [];
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
<nav style={{ backgroundColor: '#fff', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
  <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 16px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', height: '64px', alignItems: 'center' }}>
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff', textDecoration: 'none' }}>
          JobPortal
        </Link>
        <div style={{ marginLeft: '24px', display: 'flex', gap: '16px' }}>
          {getMenuItems().map((item) => (
            <Link
              key={item.name}
              to={item.href}
              style={{
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                color: '#1a202c',
                paddingBottom: '4px',
                borderBottom: '2px solid transparent',
              }}
              onMouseEnter={(e) => (e.target.style.borderBottom = '2px solid #007bff')}
              onMouseLeave={(e) => (e.target.style.borderBottom = '2px solid transparent')}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>

        <button
          type="button"
          style={{
            backgroundColor: '#fff',
            border: 'none',
            padding: '8px',
            borderRadius: '50%',
            color: '#a0aec0',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#4a5568')}
          onMouseLeave={(e) => (e.target.style.color = '#a0aec0')}
        >
          <UserIcon style={{ width: '20px', height: '20px' }} aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>

  {/* Mobile menu (optional improvement: show/hide via JS conditionally) */}
  <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
    {getMenuItems().map((item) => (
      <Link
        key={item.name}
        to={item.href}
        style={{
          padding: '8px 12px',
          borderLeft: '4px solid transparent',
          fontSize: '16px',
          color: '#4a5568',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#f9fafb';
          e.target.style.borderLeft = '4px solid #007bff';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.borderLeft = '4px solid transparent';
        }}
      >
        {item.name}
      </Link>
    ))}
  </div>
</nav>

  );
} 