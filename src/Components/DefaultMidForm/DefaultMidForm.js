import React from 'react';

const DefaultMidForm = () => {
    return (
        <form>
            <p>Default Mid Form!</p>
            <input type='text' placeholder='Address 1'></input>
            <input type='text' placeholder='Address 2'></input>
            <select>
                <option>Cafe</option>
                <option>Restaurant</option>
                <option>Bar</option>
                <option>Park</option>
                <option>Library</option>
            </select>
            <button>Find a Midpoint</button>
        </form>
    )
};

export default DefaultMidForm;