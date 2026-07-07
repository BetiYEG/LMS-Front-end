import React from 'react';

const MyLearning = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📚 My Learning</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold">Course {i}</h3>
            <p className="text-gray-600">Progress: 80%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 rounded-full h-2" style={{ width: '80%' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLearning; // ✅