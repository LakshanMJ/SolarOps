import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Sample site data
const sites = [
  { id: 1, name: 'Site A', lat: 6.9271, lng: 79.8612, health: 'healthy' },
  { id: 2, name: 'Site B', lat: 6.9147, lng: 79.9722, health: 'warning' },
  { id: 3, name: 'Site C', lat: 6.9000, lng: 79.8500, health: 'critical' },
];

// Map marker colors
const healthColor = {
  healthy: 'green',
  warning: 'orange',
  critical: 'red',
};

// Function to create colored marker
const createMarkerIcon = (color: string) =>
  new L.Icon({
    iconUrl: `https://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=solar|${color}`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });

export default function SitesMap() {
  return (
    <MapContainer
      center={[6.9271, 79.8612]}
      zoom={12}
      style={{ height: 400, width: '100%', borderRadius: 8 }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {sites.map((site) => (
        <Marker
          key={site.id}
          position={[site.lat, site.lng]}
          icon={createMarkerIcon(healthColor[site.health as keyof typeof healthColor])}
        >
          <Popup>
            <strong>{site.name}</strong>
            <br />
            Health: {site.health}
            <br />
            <button
              onClick={() => {
                // Navigate to site dashboard
                window.location.href = `/sites/${site.id}`;
              }}
            >
              Go to Dashboard
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
