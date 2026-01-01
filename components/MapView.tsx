'use client';

import { useEffect, useRef, useState } from 'react';
import { LifeEvent } from '@/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { format } from 'date-fns';

interface MapViewProps {
  events: LifeEvent[];
}

const categoryColors: Record<LifeEvent['category'], string> = {
  birth: '#ec4899',
  education: '#3b82f6',
  travel: '#10b981',
  family: '#a855f7',
  career: '#f97316',
  milestone: '#eab308',
  other: '#6b7280',
};

export default function MapView({ events }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current).setView([59.3293, 18.0686], 4);
    mapRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Fix for default marker icon
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });

    // Add markers for events with locations
    const eventsWithLocations = events.filter((e) => e.location);
    
    eventsWithLocations.forEach((event) => {
      if (!event.location) return;

      // Create custom colored marker
      const markerHtml = `
        <div style="
          background-color: ${categoryColors[event.category]};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        "></div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const marker = L.marker([event.location.lat, event.location.lng], {
        icon: customIcon,
      }).addTo(map);

      marker.on('click', () => {
        setSelectedEvent(event);
        map.setView([event.location!.lat, event.location!.lng], 8, {
          animate: true,
        });
      });

      // Add popup
      marker.bindPopup(`
        <div style="min-width: 200px;">
          <h3 style="font-weight: bold; margin-bottom: 5px;">${event.title}</h3>
          <p style="font-size: 12px; color: #666; margin-bottom: 5px;">
            ${format(new Date(event.date), 'MMM d, yyyy')}
          </p>
          <p style="font-size: 14px; margin-bottom: 5px;">${event.description}</p>
          <span style="
            display: inline-block;
            padding: 2px 8px;
            font-size: 11px;
            background-color: ${categoryColors[event.category]};
            color: white;
            border-radius: 10px;
          ">${event.category}</span>
        </div>
      `);
    });

    // Fit bounds to show all markers
    if (eventsWithLocations.length > 0) {
      const bounds = L.latLngBounds(
        eventsWithLocations.map((e) => [e.location!.lat, e.location!.lng])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [events]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
      
      {selectedEvent && (
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-sm z-[1000]">
          <button
            onClick={() => setSelectedEvent(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h3 className="text-lg font-bold mb-2">{selectedEvent.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {format(new Date(selectedEvent.date), 'MMMM d, yyyy')}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            {selectedEvent.description}
          </p>
          {selectedEvent.location && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {selectedEvent.location.name}
            </div>
          )}
          <span
            className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full"
            style={{ backgroundColor: categoryColors[selectedEvent.category] }}
          >
            {selectedEvent.category}
          </span>
        </div>
      )}
    </div>
  );
}
