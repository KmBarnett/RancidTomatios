export const movies = (state = [], action) => {
  switch (action.type) {
    case "LOAD_MOVIES": 
      return [...state, ...action.movies]
  }
}