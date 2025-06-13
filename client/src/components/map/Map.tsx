import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OffersList } from '../../types/offer';

const CITY = {
  name: 'Amsterdam',
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 12,
  },
};

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const activeIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type MapProps = {
  offers: OffersList[];
  className?: string;
  height?: string;
  activeOfferId?: string | null;
};

function Map({ offers, className = 'cities__map', height = '500px', activeOfferId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  // Получаем координаты города из первого предложения, если есть
  const cityLocation = offers[0]?.city.location ?? CITY.location;

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([
        cityLocation.latitude,
        cityLocation.longitude,
      ], cityLocation.zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);
    }
    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  // При изменении города/предложений обновляем центр карты
  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setView([
        cityLocation.latitude,
        cityLocation.longitude,
      ], cityLocation.zoom);
    }
  }, [cityLocation.latitude, cityLocation.longitude, cityLocation.zoom]);

  useEffect(() => {
    if (!mapInstance.current) return;
    // Удаляем старую группу маркеров, если есть
    if (markersRef.current) {
      markersRef.current.remove();
    }
    // Создаём новую группу маркеров
    markersRef.current = L.layerGroup().addTo(mapInstance.current);
    offers.forEach((offer) => {
      L.marker([
        offer.location.latitude,
        offer.location.longitude,
      ], { icon: offer.id === activeOfferId ? activeIcon : defaultIcon }).addTo(markersRef.current!);
    });
  }, [offers, activeOfferId]);

  return <div ref={mapRef} className={className} style={{ height }} />;
}

export { Map }; 