import React from 'react';

const EmptyState = ({ title, message, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="text-gray-400 mb-4">
        <svg
          className="h-24 w-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title || 'Veri Bulunamadı'}
      </h3>
      <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
        {message || 'Henüz hiç veri eklenmemiş. Başlamak için yeni bir kayıt oluşturun.'}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
