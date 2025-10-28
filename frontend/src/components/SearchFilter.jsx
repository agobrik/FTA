import React, { useState, useCallback } from 'react';

/**
 * Gelişmiş Arama ve Filtreleme Komponenti
 *
 * Kullanım:
 * <SearchFilter
 *   onSearch={handleSearch}
 *   onFilter={handleFilter}
 *   filters={[
 *     { name: 'position', label: 'Pozisyon', type: 'select', options: ['Kaleci', 'Defans', 'Orta Saha', 'Forvet'] },
 *     { name: 'minAge', label: 'Min Yaş', type: 'number', min: 15, max: 50 },
 *     { name: 'minRating', label: 'Min Rating', type: 'number', min: 0, max: 100 }
 *   ]}
 * />
 */
const SearchFilter = ({
  onSearch,
  onFilter,
  filters = [],
  searchPlaceholder = 'Ara...',
  showSearch = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  }, [onSearch]);

  const handleFilterChange = useCallback((filterName, value) => {
    const newFilters = { ...filterValues, [filterName]: value };
    setFilterValues(newFilters);

    if (onFilter) {
      onFilter(newFilters);
    }
  }, [filterValues, onFilter]);

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setFilterValues({});

    if (onSearch) onSearch('');
    if (onFilter) onFilter({});
  }, [onSearch, onFilter]);

  const renderFilter = (filter) => {
    const value = filterValues[filter.name] || '';

    switch (filter.type) {
      case 'select':
        return (
          <select
            key={filter.name}
            value={value}
            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{filter.label} - Tümü</option>
            {filter.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            key={filter.name}
            type="number"
            placeholder={filter.label}
            value={value}
            min={filter.min}
            max={filter.max}
            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
          />
        );

      case 'text':
        return (
          <input
            key={filter.name}
            type="text"
            placeholder={filter.label}
            value={value}
            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );

      case 'date':
        return (
          <input
            key={filter.name}
            type="date"
            value={value}
            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );

      case 'checkbox':
        return (
          <label key={filter.name} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value === true}
              onChange={(e) => handleFilterChange(filter.name, e.target.checked)}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{filter.label}</span>
          </label>
        );

      default:
        return null;
    }
  };

  const activeFilterCount = Object.values(filterValues).filter(v => v !== '' && v !== false).length;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        {showSearch && (
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Filter Toggle Button */}
        {filters.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition flex items-center gap-2"
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filtrele
              {activeFilterCount > 0 && (
                <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {(searchTerm || activeFilterCount > 0) && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition"
              >
                Temizle
              </button>
            )}
          </div>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && filters.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-3">
            {filters.map(filter => renderFilter(filter))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
