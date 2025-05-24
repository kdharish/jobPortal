import React from 'react';
import { CalendarIcon, CurrencyDollarIcon, MapPinIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export default function JobListing({ job, onApply, isEmployer }) {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 mb-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {job.title}
          </h3>
          <h4 className="text-lg text-primary font-medium mb-4">
            {job.company}
          </h4>
        </div>
        {!isEmployer && (
          <button
            onClick={() => onApply(job.id)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Apply Now
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          {/* <MapPinIcon className="w-4 h-4 mr-2" aria-hidden="true" /> */}
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          {/* <BriefcaseIcon className="w-4 h-4 mr-2" aria-hidden="true" /> */}
          <span>{job.experience} years</span>
        </div>
        <div className="flex items-center text-gray-600">
          {/* <CurrencyDollarIcon className="w-4 h-4 mr-2" aria-hidden="true" /> */}
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center text-gray-600">
          {/* <CalendarIcon className="w-4 h-4 mr-2" aria-hidden="true" /> */}
          <span>{job.job_type}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <h5 className="text-sm text-gray-500">
          Posted {job.posted}
        </h5>
      </div>

      {isEmployer && (
        <div className="border-t border-gray-200 pt-4 mt-4 flex justify-end space-x-4">
          <button
            className="text-gray-600 hover:text-gray-900 font-medium"
            onClick={() => onApply(job.id, 'edit')}
          >
            Edit
          </button>
          <button
            className="text-red-600 hover:text-red-800 font-medium"
            onClick={() => onApply(job.id, 'delete')}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
} 