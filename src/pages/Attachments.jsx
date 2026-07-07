import React from 'react';

const Attachments = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📎 Attachments</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 border rounded">
            <span>📄 Syllabus.pdf</span>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Download</button>
          </div>
          <div className="flex justify-between items-center p-2 border rounded">
            <span>📄 Notes.pdf</span>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attachments; // ✅