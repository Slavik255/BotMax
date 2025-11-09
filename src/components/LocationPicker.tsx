// src/components/LocationPicker.tsx
import React, { useState } from 'react';

interface LocationPickerProps {
  onLocationReceived: (lat: number, lon: number) => void;
}

export function LocationPicker({ onLocationReceived }: LocationPickerProps) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается вашим браузером.');
      return;
    }

    setIsGettingLocation(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationReceived(latitude, longitude);
        setIsGettingLocation(false);
      },
      (err) => {
        setError(`Ошибка получения местоположения: ${err.message}`);
        setIsGettingLocation(false);
      }
    );
  };

  return (
    <div className="location-picker">
      <h3>📍 Поделитесь вашим местоположением</h3>
      <button
        onClick={handleGetLocation}
        disabled={isGettingLocation}
        className="get-location-btn"
      >
        {isGettingLocation ? 'Получаем...' : 'Поделиться местоположением'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}