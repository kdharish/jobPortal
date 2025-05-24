import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function JobPostForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    company: '',
    location: '',
    experience: '',
    salary: '',
    job_type: 'Full-time',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    toast.success('Job posted successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {initialData ? 'Edit Job Posting' : 'Create New Job Posting'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            id="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Experience (years)
            </label>
            <input
              type="number"
              name="experience"
              id="experience"
              required
              min="0"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Salary Range
            </label>
            <input
              type="text"
              name="salary"
              id="salary"
              required
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. $50,000 - $70,000"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="job_type" className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              name="job_type"
              id="job_type"
              required
              value={formData.job_type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            required
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {initialData ? 'Update Job' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
} 