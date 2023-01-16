import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';
import './Map.css';

const Map = ({ searchResponses, searchCenter }) => {
  useEffect(() => {}, [searchCenter]);

  const searchMarkers = searchResponses.map(result => (
    <Marker
      key={result.url}
      position={result.coordinates}>
        <Popup>
          <a href={result.url} target="_blank"> 
            {result.name} on Yelp
          </a>
        </Popup>
    </Marker>
  ));

  const bounds = searchResponses.map((result) => result.coordinates);

  return (
    <div className='map-div'>
      <MapContainer
        style={{ height: "100%" }}
        pxclassName='map-image'
        center={searchCenter}
        bounds={bounds}
        scrollWheelZoom={true}
      >
        {searchMarkers}
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default Map;
