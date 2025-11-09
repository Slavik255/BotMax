// src/App.tsx
import React, { useState } from 'react';
import { AccessibilityFilter } from './components/AccessibilityFilter';
import { LocationPicker } from './components/LocationPicker';
import { MapView } from './components/MapView';

// Mock-данные объектов
const MOCK_OBJECTS = [
  {
    id: 'cafe-1',
    name: 'Кафе "Уют"',
    address: 'ул. Ленина, д. 5',
    lat: 55.7558,
    lon: 37.6176,
    accessibility: {
      wheelchair: { ramp: true, rampSlope: 8, wideDoor: true },
      blind: { tactile: true, audioSignals: true },
      deaf: { videoCall: true, signLanguage: false },
      autism: { quietHours: ['10:00-12:00'], sensoryRoom: true },
      toilet: { accessible: true, emergencyButton: true }
    }
  },
  {
    id: 'clinic-1',
    name: 'Поликлиника №58',
    address: 'пр. Мира, д. 10',
    lat: 55.7522,
    lon: 37.6149,
    accessibility: {
      wheelchair: { ramp: true, rampSlope: 12, wideDoor: true },
      blind: { tactile: false, audioSignals: true },
      deaf: { videoCall: false, signLanguage: true },
      autism: { quietHours: [], sensoryRoom: false },
      toilet: { accessible: true, emergencyButton: false }
    }
  },
  {
    id: 'theater-1',
    name: 'Театр "Современник"',
    address: 'ул. Тверская, д. 22',
    lat: 55.7577,
    lon: 37.6153,
    accessibility: {
      wheelchair: { ramp: false, rampSlope: 0, wideDoor: true },
      blind: { tactile: true, audioSignals: false },
      deaf: { videoCall: true, signLanguage: true },
      autism: { quietHours: ['14:00-16:00'], sensoryRoom: true },
      toilet: { accessible: true, emergencyButton: true }
    }
  }
];

export default function App() {
  const [selectedLimitation, setSelectedLimitation] = useState<string | null>(null);
  const [filteredObjects, setFilteredObjects] = useState<typeof MOCK_OBJECTS>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  const handleSelect = (id: string) => {
    setSelectedLimitation(id);
    
    const filtered = MOCK_OBJECTS.filter(obj => {
      switch (id) {
        case 'wheelchair':
          return obj.accessibility.wheelchair.ramp && obj.accessibility.wheelchair.wideDoor;
        case 'blind':
          return obj.accessibility.blind.tactile || obj.accessibility.blind.audioSignals;
        case 'deaf':
          return obj.accessibility.deaf.videoCall || obj.accessibility.deaf.signLanguage;
        case 'autism':
          return obj.accessibility.autism.sensoryRoom || obj.accessibility.autism.quietHours.length > 0;
        case 'temporary':
          return obj.accessibility.toilet.accessible;
        default:
          return true;
      }
    });

    setFilteredObjects(filtered);
  };

  const handleLocationReceived = (lat: number, lon: number) => {
    setUserLocation({ lat, lon });
  };

  return (
    <div className="app">
      <h1>Привет, Вячеслав! Бот работает!</h1>
      <p>Теперь можно добавлять фильтры и карту.</p>

      {/* Фильтр по типу доступности */}
      <div className="filter-section">
        <h2>Выберите ваше ограничение</h2>
        <AccessibilityFilter onSelect={handleSelect} />
      </div>

      {/* Запрос геолокации */}
      <LocationPicker onLocationReceived={handleLocationReceived} />

      {/* Карта */}
      {userLocation && (
        <MapView
          lat={userLocation.lat}
          lon={userLocation.lon}
          objects={filteredObjects}
        />
      )}

      {/* Список объектов */}
      {selectedLimitation && (
        <div className="results-section">
          <h2>Подходящие места ({filteredObjects.length})</h2>
          <ul>
            {filteredObjects.map(obj => (
              <li key={obj.id}>
                <strong>{obj.name}</strong><br/>
                {obj.address}<br/>
                <span style={{ color: '#666' }}>
                  Пандус: {obj.accessibility.wheelchair.ramp ? '✅' : '❌'}, 
                  Широкий вход: {obj.accessibility.wheelchair.wideDoor ? '✅' : '❌'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}