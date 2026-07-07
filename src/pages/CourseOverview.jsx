import React from 'react';

const CourseOverview = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📖 Course Overview</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="font-bold text-xl">React Complete Guide</h2>
        <p className="text-gray-600 mt-2">Instructor: John Doe</p>
        <ul className="mt-4 space-y-2">
          <li className="p-2 border rounded">📝 Introduction</li>
          <li className="p-2 border rounded">📝 Components</li>
          <li className="p-2 border rounded">📝 State Management</li>
        </ul>
      </div>
    </div>
  );
};

export default CourseOverview; // ✅