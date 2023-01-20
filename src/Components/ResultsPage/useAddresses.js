export const useAddresses = (addressOne, addressTwo) => {
	addressOne && localStorage.setItem("addressOne", addressOne)
	addressTwo && localStorage.setItem("addressTwo", addressTwo)

	return {
			addressOne: addressOne ?? localStorage.getItem("addressOne"),
			addressTwo: addressTwo ?? localStorage.getItem("addressTwo")
			}
}
