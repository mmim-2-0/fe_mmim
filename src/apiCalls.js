const getFetch = () => {
    return fetch(`https://serene-thicket-09827.herokuapp.com/api/v1/search?add1=denver&add2=austin&keyword=cafe`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.text)
      } else {
        return response.json()
      }
    }).then(data => console.log(data))
    .catch(err => {
        console.log(err)
    })
}

export default getFetch;
