import React from 'react';

const Card = ({ image, title, description }) => {
  return (
    <div className="mt-2 max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      {image && (
        <img
          className="w-full h-48 object-cover"
          src={image}
          alt={title}
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>

      </div>
    </div>
  );
};

export default Card;
