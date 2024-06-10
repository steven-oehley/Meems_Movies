import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./Data/data";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  return (
    <div className="min-h-screen bg-pink-900 text-white p-6">
      <Navbar />
      <Main />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="grid grid-cols-3 items-center h-18 px-8 py-4 bg-pink-600 rounded-lg">
      <Logo />
      <SearchBar />
      <NumResults />
    </nav>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span role="img" className="text-4xl">
        🍿
      </span>
      <h1 className="text-2xl font-semibold text-white">Meem's Movies</h1>
    </div>
  );
}

function NumResults() {
  return (
    <p className="justify-self-end text-lg">
      Found <strong>X</strong> results
    </p>
  );
}

function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="justify-self-center border-none p-3 text-lg rounded-md w-96 transition-all text-white bg-pink-500 placeholder-gray-200 focus:outline-none focus:shadow-lg"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function ListBox() {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="relative w-[42rem] max-w-[42rem] bg-gray-800 rounded-lg overflow-auto">
      <button
        className="absolute top-2 right-2 h-6 w-6 rounded-full bg-gray-900 text-white font-bold cursor-pointer z-10"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <MovieList />}
    </div>
  );
}

function MovieList() {
  const [movies, setMovies] = useState(tempMovieData);
  return (
    <ul className="list-none p-2 overflow-auto">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li
      key={movie.imdbID}
      className="relative grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-6 p-4 border-b border-gray-700 cursor-pointer transition-all hover:bg-gray-700"
    >
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        className="w-full row-span-full"
      />
      <h3 className="text-xl text-white">{movie.Title}</h3>
      <div className="flex items-center gap-6">
        <p className="flex items-center gap-2">
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="relative w-[42rem] max-w-[42rem] bg-gray-800 rounded-lg overflow-auto">
      <button
        className="absolute top-2 right-2 h-6 w-6 rounded-full bg-gray-900 text-white font-bold cursor-pointer z-10"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
      <h2 className="uppercase text-lg mb-2">Movies you watched</h2>
      <div className="flex items-center gap-6 font-semibold">
        <p className="flex items-center gap-2">
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p className="flex items-center gap-2">
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedList({ watched }) {
  return (
    <ul className="list-none p-2 overflow-auto">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li
      key={movie.imdbID}
      className="relative grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-6 p-4 border-b border-gray-700"
    >
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        className="w-full row-span-full"
      />
      <h3 className="text-xl text-white">{movie.Title}</h3>
      <div className="flex items-center gap-6">
        <p className="flex items-center gap-2">
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function Main() {
  return (
    <main className="mt-6 h-[calc(100vh-7.2rem-3*2.4rem)] flex gap-6 justify-center">
      <ListBox />
      <WatchedBox />
    </main>
  );
}
