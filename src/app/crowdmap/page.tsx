import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Dynamically import Mapbox (or use your preferred map lib)
const Map = dynamic(() => import('react-map-gl'), { ssr: false });

const staticMapData = {
  "data": [
    {
      "lat": [37.3947, 37.394, 37.39, 37.391, 37.396, 37.387],
      "lon": [-122.0515, -122.051, -122.065, -122.066, -122.049, -122.052],
      "text": [
        "800 East Middlefield Road (B1)",
        "770 East Middlefield Road (B3)",
        "950 West Maude Avenue (Building 5)",
        "1000 West Maude Avenue (Building 7)",
        "650 East Middlefield Road (Building 2)",
        "575 North Pastoria Avenue"
      ]
    }
  ]
};

const cafeIds = ["1", "2", "3", "4", "5", "6"];

export default function CrowdmapPage() {
  const [lineLengths, setLineLengths] = useState<number[]>([]);

  useEffect(() => {
    Promise.all(
      cafeIds.map(id =>
        fetch(`/api/line-length?cafe_id=${id}`)
          .then(res => res.json())
          .then(data => data.line_length ?? '-')
      )
    ).then(setLineLengths);
  }, []);

  return (
    <div className="p-6">
      <Link href="/" className="inline-block mb-4">
        <button className="bg-primary-600 text-white px-4 py-2 rounded">← Back to Home</button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Crowdmap</h1>
      <Link href="/crowdmap/details">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Go to Details Page</button>
      </Link>
      <div className="mb-8" style={{ height: 400 }}>
        {/* Map placeholder, replace with your map component */}
        <Map
          initialViewState={{
            longitude: -122.055,
            latitude: 37.393,
            zoom: 14
          }}
          style={{ width: '100%', height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        >
          {/* Render markers */}
          {staticMapData.data[0].lat.map((lat, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${(i + 1) * 10}%`,
                top: `${(i + 1) * 10}%`,
                background: 'red',
                borderRadius: '50%',
                width: 14,
                height: 14,
                cursor: 'pointer'
              }}
              title={staticMapData.data[0].text[i]}
              onClick={() => window.location.href = '/crowdmap/details'}
            />
          ))}
        </Map>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Cafe</th>
            <th className="py-2 px-4 border-b">Line Length</th>
          </tr>
        </thead>
        <tbody>
          {staticMapData.data[0].text.map((name, i) => (
            <tr key={i}>
              <td className="py-2 px-4 border-b">{name}</td>
              <td className="py-2 px-4 border-b text-center">{lineLengths[i] ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
