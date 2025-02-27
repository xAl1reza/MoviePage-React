import { useContext, useEffect, useState } from "react";
import MovieContext from "../Context/MovieContext/MovieContext";
import LoadingBoxes from "../Components/LoadingBoxes";

function Movies() {
  const [page, setPage] = useState(1);

  //API Data
  const API_KEY = "18f67ca18769d49dc7dd3becf610630b";
  const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${page}`;
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w400";
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=${page}&query=`;

  const { movies, dispatch, getMovies, searchMovie } = useContext(MovieContext);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleNextPage = async () => {
    if (page < movies.total_pages) {
      setPage((prevPage) => prevPage + 1);
    }
    setLoading(true);
  };
  const handlePrevPage = async () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
    setLoading(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "CLEAR_MOVIES" });
    if (inputValue.trim()) {
      setIsSearching(true);
      setSearchQuery(inputValue);
      setPage(1);
    } else {
      setIsSearching(false);
    }
    setInputValue("");
  };

  useEffect(() => {
    const fecthMovies = async () => {
      dispatch({ type: "CLEAR_MOVIES" });
      setLoading(true);
      if (isSearching && searchQuery) {
        await searchMovie(SEARCH_API + searchQuery);
      } else {
        getMovies(API_URL);
      }
      setLoading(false);
    };
    fecthMovies();
  }, [page, searchQuery, isSearching]);

  const filteredMovies =
    movies?.results?.filter((movie) => movie.poster_path !== null) || [];
  console.log(movies);

  return (
    <>
      <div className="container">
        <h1 className="text-center my-10 text-4xl text-zinc-800 dark:text-white">
          Movies Page
        </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="bg-gray-400 dark:bg-zinc-700 my-6 h-12 w-[70%] rounded-md flex items-center shadow-custome shadow-purple-700 mx-auto">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What Are You Looking For?"
              className="w-full h-full outline-hidden p-2 text-white placeholder:text-black/50 dark:placeholder:text-white/60 rounded-md"
            />
            <button
              type="submit"
              className="md:cursor-pointer bg- bg-purple-700 h-full px-3 rounded-tr-md rounded-br-md"
            >
              <i className="text-lg text-white bi bi-search"></i>
            </button>
          </div>
        </form>
        {loading && <LoadingBoxes />}
        <div
          className={`${
            !loading && filteredMovies.length === 0
              ? "flex items-center justify-center flex-col gap-4"
              : "hidden"
          } text-center text-4xl my-5`}
        >
          <i
            className="text-zinc-800 dark:text-white
             text-5xl bi bi-search"
          ></i>
          <p className="text-center text-zinc-800 dark:text-white text-4xl">
            Not Found
          </p>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies &&
            filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-purple-900 shadow-custome shadow-purple-900 p-2 rounded-md relative"
              >
                <span
                  className={`absolute top-5 right-4 text-white p-2 rounded-full ${
                    movie.vote_average >= 8
                      ? "bg-green-700"
                      : movie.vote_average <= 5
                      ? "bg-red-700"
                      : "bg-orange-700"
                  }`}
                >
                  {movie.vote_average.toFixed(1)}
                </span>
                <img
                  className="rounded-sm object-cover w-full aspect-[2/3]"
                  src={`${IMAGE_PATH + movie.poster_path}`}
                />
                <p className="my-4 text-xl text-white text-center">
                  {movie.title}
                </p>
              </div>
            ))}
        </div>
        <div
          className={`${
            filteredMovies.length === 0
              ? "hidden"
              : "flex gap-3 items-center justify-center"
          } my-12 text-zinc-800 dark:text-white text-xl`}
        >
          <button
            disabled={page === 1 ? true : false}
            onClick={() => handlePrevPage()}
            className="md:cursor-pointer disabled:text-white/50 disabled:cursor-auto"
          >
            Prev Page
          </button>
          <span className="border px-3 py-1 rounded-full border-purple-700 shadow-custome shadow-purple-700 text-black dark:text-white">
            {page}
          </span>
          <button
            disabled={page === movies.total_pages ? true : false}
            onClick={() => handleNextPage()}
            className="md:cursor-pointer disabled:text-white/50 disabled:cursor-auto"
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
}

export default Movies;
