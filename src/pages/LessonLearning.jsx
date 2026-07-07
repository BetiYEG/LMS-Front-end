import React from 'react';

const LessonLearning = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📝 Lesson Learning</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="font-bold text-xl">Introduction to Hooks</h2>
        <p className="mt-4">Hooks allow you to use state in functional components...</p>
        <div className="bg-gray-900 text-white p-4 rounded mt-4">
          <code>const [count, setCount] = useState(0);</code>
        </div>
        <div className="flex justify-between mt-6">
          <button className="bg-gray-600 text-white px-4 py-2 rounded">Previous</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default LessonLearning; // ✅