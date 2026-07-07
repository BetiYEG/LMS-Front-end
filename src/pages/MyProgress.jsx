import React from 'react';

const MyProgress = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📈 My Progress</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="font-bold mb-4">Course Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between">
              <span>React</span>
              <span>80%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 rounded-full h-2" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <span>JavaScript</span>
              <span>60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 rounded-full h-2" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProgress; // ✅