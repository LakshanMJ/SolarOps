import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const sites = [
  { id: 1, name: 'Site A', lat: 6.9271, lng: 79.8612, health: 'healthy', activeInverters: 12 },
  { id: 2, name: 'Site B', lat: 6.9147, lng: 79.9722, health: 'warning', activeInverters: 8 },
  { id: 3, name: 'Site C', lat: 6.9000, lng: 79.8500, health: 'critical', activeInverters: 3 },
];

const healthSvg: Record<string, string> = {
  healthy: '/pin.svg',
  warning: '/pin.svg',
  critical: '/pin.svg',
};

const createSvgIcon = (url: string) =>
  new L.Icon({
    iconUrl: url,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -40],
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
          icon={createSvgIcon(healthSvg[site.health])}
        >
          <Popup>
            <strong>{site.name}</strong>
            <br />
            Health: {site.health}
            <br />
            Active Inverters: {site.activeInverters}
            <br />
            <button
              onClick={() => (window.location.href = `/sites/${site.id}`)}
              style={{
                marginTop: '5px',
                padding: '4px 8px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: '#f59e0b',
                color: '#fff',
                cursor: 'pointer',
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
