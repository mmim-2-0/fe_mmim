import React from 'react';
import { L, Icon, count, marker } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';


const Map = ({ searchResponses, searchCenter }) => {
  // function initMap(locations) {
  //
  //   var map = L.map('map');
  //   var zoom = map.getBoundsZoom([
  //     locations[1].slice(1,3),
  //     locations[2].slice(1,3),
  //     locations[3].slice(1,3),
  //     locations[4].slice(1,3),
  //     locations[5].slice(1,3)
  //   ]);
  //
  //   map.setView([locations[0][1], locations[0][2]], zoom - 1)
  //
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 19,
  //     attribution: '© OpenStreetMap'
  //   }).addTo(map);
  //
  //
  //   for (count = 1; count < locations.length; count++) {
  //     marker = L.marker([locations[count][1], locations[count][2]]).addTo(map);
  //   };
  // };

    useEffect(() => {
      console.log('useeffect!')
    }, [searchCenter])

    console.log(searchResponses)

    const searchMarkers = searchResponses.map(result => (
      <Marker
        key={result.url}
        position={result.coordinates}
      />
    ))

    return (
      <MapContainer center={searchCenter} zoom={12}scrollWheelZoom={false}>
        {searchMarkers}
        <TileLayer
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
         />
      </MapContainer>


    )
};

export default Map;
