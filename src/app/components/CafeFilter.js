'use client';
import React, { useState } from 'react';

export default function CafeFilter({ cafes, setFilteredCafes }) {
  const [featureFilter, setFeatureFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const features = [...new Set(cafes.flatMap(cafe => cafe.features))];
  const locations = [...new Set(cafes.map(cafe => cafe.address.split(' ')[0]))];

  const handleFilter = () => {
    let filtered = cafes;
    if (featureFilter) {
      filtered = filtered.filter(cafe => cafe.features.includes(featureFilter));
    }
    if (locationFilter) {
      filtered = filtered.filter(cafe => cafe.address.includes(locationFilter));
    }
    setFilteredCafes(filtered);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">カフェを絞り込む</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">特徴</label>
          <select
            value={featureFilter}
            onChange={(e) => setFeatureFilter(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-300 font-['Noto_Sans_JP']"
          >
            <option value="">すべて</option>
            {features.map((feature) => (
              <option key={feature} value={feature}>{feature}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-medium">立地</label>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all duration-300 font-['Noto_Sans_JP']"
          >
            <option value="">すべて</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleFilter}
        className="mt-4 px-6 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors duration-300 font-['Noto_Sans_JP']"
      >
        絞り込み
      </button>
    </div>
  );
}