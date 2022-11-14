const getLocations = (locationOne, locationTwo, category) => {
  return fetch(process.env.REACT_APP_API_ENDPOINT + `/api/v1/search?add1=${locationOne}&add2=${locationTwo}&keyword=${category}`, {
    headers: {
      'Authorization': 'Basic ' + btoa(process.env.REACT_APP_USERNAME + ':' + process.env.REACT_APP_PASSWORD)
    }
  })
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
  return fetch(process.env.REACT_APP_API_ENDPOINT + `/api/v1/guest_user?token=${token}&guest_email=${guestEmail}`, {
    headers: {
      'Authorization': 'Basic ' + btoa(process.env.REACT_APP_USERNAME + ':' + process.env.REACT_APP_PASSWORD)
    }
  })
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
  return fetch(process.env.REACT_APP_API_ENDPOINT + `/api/v1/sessions`, {
    method: 'POST',
    body: JSON.stringify({
      "name": name,
      "email": email
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Basic ' + btoa(process.env.REACT_APP_USERNAME + ':' + process.env.REACT_APP_PASSWORD)
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
  return fetch(process.env.REACT_APP_API_ENDPOINT + `/api/v1/users/${id}/meetings?token=${token}`, {
    headers: {
      'Authorization': 'Basic ' + btoa(process.env.REACT_APP_USERNAME + ':' + process.env.REACT_APP_PASSWORD)
    }
  })
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
  return fetch(process.env.REACT_APP_API_ENDPOINT + `/api/v1/sessions?token=${token}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Basic ' + btoa(process.env.REACT_APP_USERNAME + ':' + process.env.REACT_APP_PASSWORD)
    }
  }).then(response => {
    if (!response.ok) {
      throw Error(response.text)
    } else {
      return response.json()
    }
  })
}

const updateDefaultAddress = (token, name, email, address) => {
  return fetch(process.env.REACT_APP_API_ENDPOINT + `/api/v1/users`, {
    method: 'PUT',
    body: JSON.stringify({
      "token": token,
      "name": name,
      "email": email,
      "address": address
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(process.env.REACT_APP_USERNAME + ':' + process.env.REACT_APP_PASSWORD),
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
  return fetch(process.env.REACT_APP_API_ENDPOINT + `/api/v1/users/${id}/meetings`, {
    method: 'POST',
    body: JSON.stringify({
      "token": token,
      "guest_email": guestEmail,
      "time": time,
      "locations": locations
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Basic ' + btoa(process.env.REACT_APP_USERNAME + ':' + process.env.REACT_APP_PASSWORD)
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
  return fetch(process.env.REACT_APP_API_ENDPOINT + `/api/v1/users/${userId}/meetings/${meetingId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      "token": token,
      "status": status,
      "location_id": locationId,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Basic ' + btoa(process.env.REACT_APP_USERNAME + ':' + process.env.REACT_APP_PASSWORD)
    }
  }).then(response => {
    if (!response.ok) {
      throw Error(response.text)
    } else {
      console.log("accept meeting worked")
    }
  })
}

const getCurrentLocation = (location) => {
  return fetch(`https://www.mapquestapi.com/geocoding/v1/reverse?location=${location}&key=${process.env.REACT_APP_MAPQUEST_API_KEY}`)
    .then(response => {
      return response.json()
    })
}

export { getLocations, getUser, getUserMeetings, logoutUser, updateDefaultAddress, sendMeetingOptions, getGuestUser, patchMeeting, getCurrentLocation };
