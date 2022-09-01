const getLocations = (locationOne, locationTwo, category) => {
    return fetch(`https://serene-thicket-09827.herokuapp.com/api/v1/search?add1=${locationOne}&add2=${locationTwo}&keyword=${category}`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.text)
      } else {
        return response.json()
      }
    })
    .catch(err => {
        console.log(err)
    })
}

export default getLocations;

// denver, austin, cafe
