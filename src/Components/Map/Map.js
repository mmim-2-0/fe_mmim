import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import './Map.css';
import { bounds } from 'leaflet';

const Map = ({ searchResponses, searchCenter }) => {

  // let bounds;
  // let searchMarkers;

  // useEffect(() => {
  //   bounds = searchResponses.map(result => (
  //     result.coordinates
  //     ));

  //   // setBounds(tempBounds)

  //   searchMarkers = searchResponses.map(result => (
  //     <Marker
  //       key={result.url}
  //       position={result.coordinates}
  //     />
  //    ));

  //   //  console.log('b', bounds)
  //   }, [searchCenter, searchResponses]);

  let bounds = searchResponses.map(result => (
    result.coordinates
  ));

  let searchMarkers = searchResponses.map(result => (
    <Marker
      key={result.url}
      position={result.coordinates}
    />
  ));

  useEffect(() => {}, [bounds, searchCenter, searchMarkers, searchResponses]);

  // map.leafletElement.invalidateSize()


  return (
    <div className="map-div">
      <MapContainer style={{height:"100%"}} pxclassName="map-image" center={searchCenter} bounds={bounds} scrollWheelZoom={false}>
        {searchMarkers}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      {/* {bounds && 
            <MapContainer style={{height:"100%"}} pxclassName="map-image" center={searchCenter} bounds={bounds} scrollWheelZoom={false}>
            {searchMarkers}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
          </MapContainer>
      } */}
    </div>
  )
};

export default Map;
