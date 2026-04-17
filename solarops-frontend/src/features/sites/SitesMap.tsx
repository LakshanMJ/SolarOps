import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const healthSvg: Record<string, string> = {
    Good: '/site_map_green_pin_good.svg',
    Warning: '/site_map_yellow_pin_warning.svg',
    Critical: '/site_map_red_pin_critical.svg',
    Unknown: '/site_map_gray_pin_unknown.svg',
};

const createSvgIcon = (url: string) =>
    new L.Icon({
        iconUrl: url,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -40],
    });

export default function SitesMap({ sites }: any) {
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
                    <Popup minWidth={320} maxWidth={400} closeButton={false}>
                        <section style={{
                            fontFamily: 'Inter, sans-serif',
                            backgroundColor: '#1e293b',
                            color: '#fff',
                            padding: '10px 14px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            <h3 style={{
                                fontSize: '14px',
                                margin: 0,
                                color: '#fff',
                                whiteSpace: 'nowrap',
                                borderBottom: '1px solid rgba(255,255,255,0.1)',
                                paddingBottom: '6px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {site.name}
                            </h3>

                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '12px',
                                gap: '15px'
                            }}>
                                <li style={{ whiteSpace: 'nowrap' }}>
                                    <span style={{ color: '#94a3b8' }}>Health:</span>
                                    <strong style={{ marginLeft: '4px', color: site.health === 'Good' ? '#4ade80' : '#f87171' }}>
                                        {site.health}
                                    </strong>
                                </li>
                                <li style={{ whiteSpace: 'nowrap' }}>
                                    <span style={{ color: '#94a3b8' }}>Inverters:</span>
                                    <strong style={{ marginLeft: '4px' }}>{site.activeInverters}</strong>
                                </li>
                            </ul>

                            <button
                                onClick={() => (window.location.href = `/sites/${site.id}`)}
                                style={{
                                    width: '100%',
                                    padding: '6px 0',
                                    borderRadius: '4px',
                                    border: 'none',
                                    backgroundColor: '#f59e0b',
                                    color: '#000',
                                    fontWeight: '700',
                                    fontSize: '11px',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer'
                                }}
                            >
                                Open Dashboard
                            </button>
                        </section>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}