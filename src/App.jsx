import { useRef, useEffect, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import './App.css';

function App() {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const longitude = 39.72506498241886;
  const latitude = 47.22738590634815;

  useEffect(() => {
    let map = tt.map({
      key: process.env.REACT_APP_TOMTOM_API_KEY,
      container: mapElement.current,
      center: [longitude, latitude],
      zoom: 14,
    });
    setMap(map);
  }, []);

  return (
    <div className="App">
      <div className="map" ref={mapElement} />
    </div>
  );
}

export default App;
