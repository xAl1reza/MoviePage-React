function MovieReducer(state, action) {
  switch (action.type) {
    case "GET_MOVIES":
      return {
        ...state,
        movies: action.payLoad,
      };
      case "CLEAR_MOVIES":
      return {
        ...state,
        movies: []
      };
      case "SEARCH_MOVIES":
        return {
          ...state,
          movies: action.payLoad
        };
  
    default:
      state;
  }
}

export default MovieReducer;
