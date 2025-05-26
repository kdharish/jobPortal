import React from 'react';
import { deleteJob, applyToJob } from '../api/jobApi';
import toast from 'react-hot-toast';

const JobListing = ({ job, isEmployer, onApply }) => {
  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      toast.success('Job deleted successfully');
      onApply(jobId, 'delete');
    } catch (error) {
      toast.error(error.message || 'Error deleting job');
    }
  };

  const handleApply = async (jobId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error('Please login to apply for jobs');
        return;
      }

      await applyToJob(jobId, userId);
      toast.success('Application submitted successfully');
      onApply(jobId, 'apply');
    } catch (error) {
      toast.error(error.message || 'Error applying to job');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Location:</span> {job.location}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Experience:</span> {job.experience} years
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Salary:</span> {job.salary}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Skills:</span>{' '}
              {job.key_skills.join(', ')}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {isEmployer ? (
            <>
              <button
                onClick={() => onApply(job.id, 'edit')}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={() => handleApply(job.id)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListing; 