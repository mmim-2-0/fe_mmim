import React from 'react';
import { L, Icon, count, marker } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';
import './Map.css';


const Map = ({ searchResponses, searchCenter }) => {
  // find a way to render all five markers within map 

    useEffect(() => {
      console.log('useeffect!')
    }, [searchCenter])

    const searchMarkers = searchResponses.map(result => (
      <Marker
        key={result.url}
        position={result.coordinates}
      />
    ))

    return (
      <div className="map-div">
        <MapContainer className="map-image" center={searchCenter} zoom={12} scrollWheelZoom={false}>
          {searchMarkers}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    )
};

export default Map;
