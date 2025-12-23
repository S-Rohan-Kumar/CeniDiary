import React from 'react'
import { useMovie } from "../contexts/MovieContext.jsx"
import MovieCard from "../components/MovieCard.jsx"

function MovieGrid() {
  const {movies , loading} = useMovie()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 animate-spin"></div>
        </div>
      </div>
    );
  }


  if (movies.length === 0) {
    return (
      <div className="text-center text-slate-500 mt-20">
        <p className="text-xl">No movies found. Try a different search!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieGrid