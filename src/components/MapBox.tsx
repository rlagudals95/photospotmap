import { useEffect, useRef, useState, useCallback, memo } from "react";
import mapboxgl from "mapbox-gl";
import styled from "@emotion/styled";

function MapBox() {
  const [lng, setLng] = useState(126.977);
  const [lat, setLat] = useState(37.566);
  const [zoom, setZoom] = useState(10);
  const [map, setMap] = useState<mapboxgl.Map>();

  const mapContainer = useRef(null);

  const loadMaxBox = useCallback(async () => {
    try {
      mapboxgl.accessToken =
        "pk.eyJ1IjoicmxhZ3VkYWxzOTUiLCJhIjoiY2xmOGNoYTZnMTBiMDNxcG8xNXY5eTcxMiJ9.oCf7k9VWF4pwEL0fkPJt1w";
      const loadedMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lng, lat],
        zoom: zoom,
      });
      setMap(loadedMap);
      return loadedMap;
    } catch (error) {
      console.error(`map box load error: ${error}`);
    }
  }, []);

  const loadMarkers = useCallback(async (loadedMap: mapboxgl.Map) => {
    try {
      new mapboxgl.Marker().setLngLat([126.9518, 37.4782]).addTo(loadedMap);
    } catch (error) {
      console.error(`load marker error: ${error}`);
    }
  }, []);

  const addMouseMoveEvent = useCallback(async (loadedMap: mapboxgl.Map) => {
    loadedMap.on("mousemove", (e) => {
      console.log(e.lngLat.wrap());
    });
  }, []);

  useEffect(() => {
    const fetchMapData = async () => {
      const loadedMap = (await loadMaxBox()) as mapboxgl.Map;
      await loadMarkers(loadedMap);
      await addMouseMoveEvent(loadedMap);
    };
    fetchMapData();

    return () => {
      if (map) {
        //@ts-ignore
        map.remove();
      }
    };
  }, []);

  return <Container ref={mapContainer} className="mapContainer"></Container>;
}

export default memo(MapBox);

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;
