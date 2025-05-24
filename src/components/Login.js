import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const roles = [
  { id: 'employee', title: 'Employee', description: 'Search and apply for jobs' },
  { id: 'employer', title: 'Employer ', description: 'Post jobs and manage applications' },
  { id: 'admin', title: 'Admin  ', description: 'Manage users and overall portal' },
];

export default function Login({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedRole || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Store login details in localStorage
    localStorage.setItem('userDetails', JSON.stringify({
      email,
      password,
      userType: selectedRole
    }));

    onLogin(selectedRole);
    toast.success(`Logged in as ${selectedRole}`);
    navigate('/dashboard');
  };

  return (
    <div
    style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '48px 16px',
    }}
  >
    <div style={{ margin: '0 auto', width: '100%', maxWidth: '28rem' }}>
      <h2
        style={{
          marginTop: '24px',
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: '800',
          color: '#1a202c',
        }}
      >
        Sign in to your account
      </h2>
    </div>
  
    <div style={{ marginTop: '32px', margin: '0 auto', width: '100%', maxWidth: '28rem' }}>
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '32px 40px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          borderRadius: '0.5rem',
        }}
      >
        <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} onSubmit={handleSubmit}>
          {/* Role Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#4a5568' }}>
              Select Role
            </label>
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {roles.map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    style={{
                      cursor: 'pointer',
                      border: `1px solid ${isSelected ? '#3b82f6' : '#d1d5db'}`,
                      backgroundColor: isSelected ? '#eff6ff' : '#fff',
                      borderRadius: '0.5rem',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: '500', color: '#1a202c', fontSize: '14px' }}>{role.title}</p>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>{role.description}</p>
                    </div>
                    <div
                      style={{
                        height: '20px',
                        width: '20px',
                        borderRadius: '9999px',
                        border: `2px solid ${isSelected ? '#3b82f6' : '#d1d5db'}`,
                        backgroundColor: isSelected ? '#3b82f6' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            height: '10px',
                            width: '10px',
                            borderRadius: '9999px',
                            backgroundColor: '#ffffff',
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
  
          {/* Email */}
          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#4a5568' }}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                marginTop: '4px',
                display: 'block',
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
  
          {/* Password */}
          <div>
            <label htmlFor="password" style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#4a5568' }}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                marginTop: '4px',
                display: 'block',
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '14px',
                outline: 'none',
              }}
            />
          </div>
  
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={!selectedRole}
              style={{
                width: '100%',
                padding: '10px 16px',
                backgroundColor: selectedRole ? '#3b82f6' : '#cbd5e0',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: selectedRole ? 'pointer' : 'not-allowed',
                opacity: selectedRole ? 1 : 0.6,
              }}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
} 