import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DraggleMarker from "./DraggleMarker";

const MapLayout = ({ onAddRemark, selectedPosition }) => {
  const center = [51.505, -0.09];
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && selectedPosition) {
      mapRef.current.setView(selectedPosition);
    }
  }, [selectedPosition]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggleMarker onAddRemark={onAddRemark} selectedPosition={selectedPosition} />
    </MapContainer>
  );
};

// Add prop types validation
MapLayout.propTypes = {
  onAddRemark: PropTypes.func.isRequired,
  selectedPosition: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

export default MapLayout;
