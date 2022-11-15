import { useRef, useEffect, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import './App.css';

function App() {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(39.72506498241886);
  const [latitude, setLatitude] = useState(47.22738590634815);

  useEffect(() => {
    let map = tt.map({
      key: process.env.REACT_APP_TOMTOM_API_KEY,
      container: mapElement.current,
      center: [longitude, latitude],
      stylesVisibility: { trafficIncidents: true, trafficFlow: true },
      zoom: 14,
    });

    setMap(map);

    const addMarker = () => {
      const element = document.createElement('div');
      element.className = 'marker';
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        setLongitude(lngLat.lng);
        setLatitude(lngLat.lat);
      });
    };

    addMarker();

    return () => map.remove();
  }, [longitude, latitude]);

  return (
    <>
      {map && (
        <div className="App">
          <div id="map" ref={mapElement} />
          <div className="search-bar">
            <h3>set destination coordinates</h3>
            <input
              type="text"
              placeholder="longitude"
              id="longitude"
              onChange={(e) => setLongitude(e.target.value)}
            />
            <input
              type="text"
              placeholder="latitude"
              id="latitude"
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
