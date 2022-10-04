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

const getGuestUser = (token, guestEmail) => {
  return fetch(`https://serene-thicket-09827.herokuapp.com/api/v1/guest_user?token=${token}&guest_email=${guestEmail}`)
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

const getUserMeetings = (id, token) => {
  return fetch(`https://serene-thicket-09827.herokuapp.com/api/v1/users/${id}/meetings?token=${token}`)
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

const updateDefaultAddress = (token, name, email, address) => {
  return fetch(`https://serene-thicket-09827.herokuapp.com/api/v1/users`, {
    method: 'PUT',
    body: JSON.stringify({
      "token": token,
      "name": name,
      "email": email,
      "address": address
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => {
    if (!response.ok) {
      throw Error(response.text)
    } else {
      console.log("default address updated")
    }
  })
}

const sendMeetingOptions = (id, token, guestEmail, time, locations) => {
  return fetch(`https://serene-thicket-09827.herokuapp.com/api/v1/users/${id}/meetings`, {
    method: 'POST',
    body: JSON.stringify({
      "token": token,
      "guest_email": guestEmail,
      "time": time,
      "locations": locations
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

const patchMeeting = (status, userId, meetingId, token, locationId) => {
  return fetch(`https://serene-thicket-09827.herokuapp.com/api/v1/users/${userId}/meetings/${meetingId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      "token": token,
      "status": status,
      "location_id": locationId,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => {
    if (!response.ok) {
      throw Error(response.text)
    } else {
      console.log("accept meeting worked")
    }
  })
}

export { getLocations, getUser, getUserMeetings, logoutUser, updateDefaultAddress, sendMeetingOptions, getGuestUser, patchMeeting };

