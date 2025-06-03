'use client';
import React from 'react';

export default function MediaDisplay({ cafe }) {
  return (
    <div>
      <img
        src={`/images/cafes/${cafe.id}/main.jpg`}
        alt={cafe.name}
        className="w-full h-48 md:h-96 object-cover rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-105"
        onError={(e) => (e.currentTarget.src = '/images/cafes/default.jpg')}
      />
      {cafe.video && (
        <video
          src={`/videos/cafes/${cafe.id}/tour.mp4`}
          className="w-full h-48 md:h-96 object-cover rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-105"
          controls
          muted
          loop
          onError={(e) => (e.currentTarget.style.display = 'none')}
        >
          あなたのブラウザはビデオをサポートしていません。
        </video>
      )}
    </div>
  );
}