import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useEffect, useState } from "react";
import { useCities } from "../contexts/useCities";
import styles from "./Map.module.css";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]); // the mapPosition expects an array of lat + lng
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();
  // const [searchParams] = useSearchParams();
  // const mapLat = searchParams.get("lat");
  // const mapLng = searchParams.get("lng");

  //sinchronisation with useEffect - makes the component remmember the last visited city.
  //the poppup will ctay on city location after we click 'back' button
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  //synchronizing the map with randomly chosen geolocation position
  //it will run each time the position changes
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "...Loading" : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji ? flagemojiToPNG(city.emoji) : ""}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        {/* <ChangeCenter position={[mapLat || 40, mapLng ||0]} /> */}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

//creating new component with useMap
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

//opening the form by clicking somewhere on the map
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      console.log(e); // the event contains numerous object such as latlng object
      //latlng: LatLng {lat: 42.09716740552924, lng: -0.1489328905009191} with the lat/lng of every point
      //we will store this data in URL to pass it between pages
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
