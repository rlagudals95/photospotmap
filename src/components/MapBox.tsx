import { useEffect, useRef, useState, memo } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from '@emotion/styled';

function MapBox() {
  const [lng, setLng] = useState(126.977);
  const [lat, setLat] = useState(37.566);
  const [zoom, setZoom] = useState(10);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmxhZ3VkYWxzOTUiLCJhIjoiY2xmOGNoYTZnMTBiMDNxcG8xNXY5eTcxMiJ9.oCf7k9VWF4pwEL0fkPJt1w';
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });


    return () => map.remove();
  }, []);

  return (
    <Container ref={mapContainer} className="mapContainer"></Container>
  );
}

export default memo(MapBox)

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`