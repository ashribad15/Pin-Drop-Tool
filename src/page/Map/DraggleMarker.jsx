import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerPopup from '../../components/MarkerPopup';
import useFetchAddress from '../../hook/useFetchAddress';

const DraggleMarker = ({ onAddRemark, selectedPosition }) => {
    const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });
    const [markerData, setMarkerData] = useState({ address: "", remark: "", date: "" });
    const markerRef = useRef(null);
    const { address, loading, error } = useFetchAddress(position);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    const newPosition = marker.getLatLng();
                    setPosition(newPosition);
                    marker.openPopup();
                }
            },
        }),
        [],
    );

    useEffect(() => {
        if (selectedPosition) {
            setPosition(selectedPosition);
            const marker = markerRef.current;
            if (marker) {
                marker.setLatLng(selectedPosition);
            }
        }
    }, [selectedPosition]);

    const handleRemark = (remark) => {
        const currentDate = new Date().toLocaleString();
        const newMarkerData = { remark, date: currentDate, address, position };
        onAddRemark(newMarkerData);

        setMarkerData(newMarkerData);
        markerRef.current.closePopup();
    };

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
        >
            <Popup 
                minWidth={90} 
                autoClose={false} 
                closeOnClick={false}
            >
                <MarkerPopup 
                    markerData={{ ...markerData, address }}
                    handleRemark={handleRemark} 
                />
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
            </Popup>
        </Marker>
    );
};

export default DraggleMarker;
