import React from 'react';
import Map from '../Map/Map'
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import './MapPage.css';

const MapPage = () => {
    return (
        <section>
            <div className="map-page">
                <p>Map Page!</p>
                <Map />
            </div>
            <ResultsContainer />
            <>
                <p>Didn't find what you're looking for?</p>
                <select>
                    <option>Cafe</option>
                    <option>Restaurant</option>
                    <option>Bar</option>
                    <option>Park</option>
                    <option>Library</option>
                </select>
                <button>Update category</button>
            </>
        </section>
    )
};

export default MapPage;
