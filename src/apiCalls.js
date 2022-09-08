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

const getUser = (name, email) => {
  return fetch(`https://serene-thicket-09827.herokuapp.com/api/v1/sessions`, {
    method: 'POST',
    body: JSON.stringify({
      "name": name,
      "email": email
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => {
    if (!response.ok) {
      throw Error(response.text)
    } else {
      return response.json()
    }
  })
}

const logoutUser = (token) => {
  return fetch(`https://serene-thicket-09827.herokuapp.com/api/v1/sessions?token=${token}`, {
    method: 'DELETE'
  }).then(response => {
    if (!response.ok) {
      throw Error(response.text)
    } else {
      return response.json()
    }
  })
}

export { getLocations, getUser, logoutUser };

// denver, austin, cafe

