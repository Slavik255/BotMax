import { useState, useEffect } from 'react';

// useGeolocation.ts
export function useGeolocation() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition(pos),
      (err) => setError(err.message)
    );
  }, []);

  return { position, error };
}