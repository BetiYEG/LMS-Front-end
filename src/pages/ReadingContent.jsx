import React from 'react';

const ReadingContent = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📃 Reading Content</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="font-bold text-xl">Understanding Closures</h2>
        <p className="mt-4">A closure is a function that has access to its outer scope...</p>
        <div className="bg-gray-100 p-4 rounded mt-4">
          <code>function outer() {'{'} return function inner() {'{'} ... {'}'} {'}'}</code>
        </div>
      </div>
    </div>
  );
};

export default ReadingContent;