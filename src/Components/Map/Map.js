import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import './Map.css';

const Map = ({ searchResponses, searchCenter }) => {
  // find a way to render all five markers within map

    useEffect(() => {

    }, [searchCenter])

    const searchMarkers = searchResponses.map(result => (
      <Marker
        key={result.url}
        position={result.coordinates}
      />
    ))

    const bounds = searchResponses.map(result => (
      result.coordinates
    ))

    return (
      <div className="map-div">
        <MapContainer style={{height:562}} pxclassName="map-image" center={searchCenter} bounds={bounds} scrollWheelZoom={false}>
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
