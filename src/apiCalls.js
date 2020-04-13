export const getAllMovies = async () => {
  try {
    const response = await fetch('https://rancid-tomatillos.herokuapp.com/api/v1/movies')
    return await response.json()
  } catch (error) {
    console.error(error.message)
  }
}

export const loginUser = async (loginInfo) => {
  try {
  const response = await fetch('https://rancid-tomatillos.herokuapp.com/api/v1/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(loginInfo)
  })
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export const getAllRatings = async () => {

}

export const submitNewRating = async () => {

}

export const deleteExistingRating = async () => {

}