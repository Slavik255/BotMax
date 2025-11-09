// src/components/MapView.tsx
import React, { useEffect, useRef } from 'react';

interface MapViewProps {
  lat: number;
  lon: number;
  objects: Array<{
    id: string;
    name: string;
    address: string;
    lat: number;
    lon: number;
  }>;
}

export function MapView({ lat, lon, objects }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null); // Храним ссылку на экземпляр карты

  useEffect(() => {
    if (!mapRef.current) return;

    // Проверяем, загружена ли уже библиотека
    if (!(window as any).ymaps) {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=6557726e-9204-4781-ad45-e172e8e378f0';
      script.async = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      const ymaps = (window as any).ymaps;
      ymaps.ready(() => {
        // Уничтожаем предыдущую карту, если она есть
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy();
        }

        // Создаём новую карту
        const map = new ymaps.Map(mapRef.current!, {
          center: [lat, lon],
          zoom: 15,
          controls: ['zoomControl', 'fullscreenControl'],
        });

        // Очищаем старые метки
        map.geoObjects.removeAll();

        // Метки объектов
        objects.forEach(obj => {
          const placemark = new ymaps.Placemark(
            [obj.lat, obj.lon],
            {
              balloonContent: `<strong>${obj.name}</strong><br/>${obj.address}`,
              hintContent: obj.name,
            },
            {
              preset: 'islands#blueDotIcon',
            }
          );
          map.geoObjects.add(placemark);
        });

        // Твоя позиция
        const userPlacemark = new ymaps.Placemark(
          [lat, lon],
          {
            balloonContent: 'Вы здесь',
            hintContent: 'Ваше местоположение',
          },
          {
            preset: 'islands#redCircleIcon',
          }
        );
        map.geoObjects.add(userPlacemark);

        // Сохраняем ссылку на карту
        mapInstanceRef.current = map;
      });
    }
  }, [lat, lon, objects]); // Пересоздаём карту только при изменении этих данных

  return (
    <div className="map-view">
      <h3>🗺️ Карта доступных объектов</h3>
      <div ref={mapRef} style={{ width: '100%', height: '400px', borderRadius: '8px' }} />
    </div>
  );
}