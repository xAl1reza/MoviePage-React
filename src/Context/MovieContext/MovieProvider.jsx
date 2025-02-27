import axios from "axios";
import MovieContext from "./MovieContext";
import { useReducer } from "react";
import MovieReducer from "./MovieReducer";

function MovieProvider({ children }) {
  
  const initialState = {
    movies: [],
    error: null,
  };
  const [state, dispatch] = useReducer(MovieReducer, initialState);

  const getMovies = async (URL) => {
    const res = await axios.get(URL);
    dispatch({type : 'GET_MOVIES' , payLoad : res.data})
  };

  const searchMovie = async (URL) => {
    const res = await axios.get(URL);
    dispatch({type : 'SEARCH_MOVIES' , payLoad : res.data})
  };

  return (
    <MovieContext.Provider value={{ ...state, dispatch , getMovies , searchMovie}}>
      {children}
    </MovieContext.Provider>
  );
}

export default MovieProvider;
