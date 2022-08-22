import React from 'react';

const UserMidForm = () => {
    return (
        <section>
            <button>Set your default address</button>
            <form>
            <p>User Mid Form!</p>
            <input type='text' placeholder='Address 1'></input>
            <p>OR</p>
            <input type='text' placeholder='Other User email'></input>
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
    </section>
    )
};

export default UserMidForm;