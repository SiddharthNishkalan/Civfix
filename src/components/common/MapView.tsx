import React, { useEffect, useRef } from 'react';
import { Issue } from '../../types';
import L from 'leaflet';

interface MapViewProps {
  issues: Issue[];
  selectedIssueId?: string | null;
  onSelectIssue?: (issueId: string) => void;
  interactivePinMode?: boolean;
  pinCoordinates?: [number, number];
  onPinChange?: (coords: [number, number]) => void;
  height?: string;
}

export const MapView: React.FC<MapViewProps> = ({
  issues,
  selectedIssueId,
  onSelectIssue,
  interactivePinMode = false,
  pinCoordinates = [9.1726, 77.8681],
  onPinChange,
  height = '400px'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const pinMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const centerCoords = pinCoordinates || [9.1726, 77.8681];
      const map = L.map(mapContainerRef.current, {
        center: centerCoords,
        zoom: 14,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;

      if (interactivePinMode) {
        map.on('click', (e: L.LeafletMouseEvent) => {
          const newCoords: [number, number] = [e.latlng.lat, e.latlng.lng];
          if (onPinChange) onPinChange(newCoords);
        });
      }
    }
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const categoryColors: Record<string, string> = {
      water: '#0284c7',
      roads: '#d97706',
      lighting: '#eab308',
      waste: '#16a34a',
      electricity: '#ea580c',
      health: '#dc2626',
      education: '#9333ea'
    };

    if (!interactivePinMode) {
      issues.forEach((issue) => {
        const color = categoryColors[issue.category] || '#00452d';
        const isSelected = issue.id === selectedIssueId;
        
        const customIcon = L.divIcon({
          className: 'custom-civic-marker',
          html: `
            <div style="
              background-color: ${color};
              width: ${isSelected ? '34px' : '26px'};
              height: ${isSelected ? '34px' : '26px'};
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 4px 10px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: ${isSelected ? '13px' : '10px'};
              font-weight: bold;
            ">
              ${issue.status === 'resolved' ? '✓' : '!'}
            </div>
          `,
          iconSize: [isSelected ? 34 : 26, isSelected ? 34 : 26],
          iconAnchor: [isSelected ? 17 : 13, isSelected ? 17 : 13],
        });

        const marker = L.marker(issue.coordinates, { icon: customIcon }).addTo(map);

        const popupContent = `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; min-width: 170px; padding: 4px;">
            <div style="font-size: 10px; font-weight: 700; color: #707972; text-transform: uppercase;">${issue.id} • ${issue.ward}</div>
            <div style="font-size: 13px; font-weight: 700; color: #00452d; margin-top: 2px;">${issue.title}</div>
            <div style="font-size: 11px; color: #404943; margin-top: 4px;">Status: <b>${issue.status.toUpperCase()}</b></div>
            <div style="font-size: 11px; color: #00452d; font-weight: 600; margin-top: 2px;">AI Severity: ${issue.aiSeverityScore}/100</div>
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.on('click', () => {
          if (onSelectIssue) onSelectIssue(issue.id);
        });

        markersRef.current.push(marker);
      });
    }

    if (interactivePinMode) {
      if (pinMarkerRef.current) {
        pinMarkerRef.current.setLatLng(pinCoordinates);
      } else {
        const pinIcon = L.divIcon({
          className: 'pin-marker',
          html: `
            <div style="
              background-color: #ba1a1a;
              width: 32px;
              height: 32px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              border: 3px solid white;
              box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            "></div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        const marker = L.marker(pinCoordinates, { icon: pinIcon, draggable: true }).addTo(map);
        marker.on('dragend', (e) => {
          const latlng = e.target.getLatLng();
          if (onPinChange) onPinChange([latlng.lat, latlng.lng]);
        });
        pinMarkerRef.current = marker;
      }
    }
  }, [issues, selectedIssueId, pinCoordinates, interactivePinMode]);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full rounded-2xl overflow-hidden border border-[#ddece3] shadow-civic z-10"
      style={{ height }}
    />
  );
};
