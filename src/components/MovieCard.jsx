import React from 'react'
import { useMovie } from '../contexts/MovieContext'
import { Link } from 'react-router-dom';

export default function MovieCard({movie}) {
  const { toggleFavorite, favorites } = useMovie()

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const onFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(movie);
  };

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 shadow-xl">
        <button
          onClick={onFavoriteClick}
          className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
            isFavorite
              ? "bg-red-500 border-red-400 text-white scale-110"
              : "bg-black/40 border-white/10 text-white/70 hover:scale-110 hover:text-white"
          }`}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

        <div className="aspect-2/3 overflow-hidden">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Poster"
            }
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Movie Info */}
        <div className="p-4 bg-linear-to-b from-slate-900/50 to-slate-950">
          <h3 className="font-bold text-lg truncate text-white mb-1">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-cyan-400 font-medium text-sm">
              ★ {movie.vote_average?.toFixed(1) || "N/A"}
            </span>
            <span className="text-slate-400 text-xs">
              {movie.release_date ? movie.release_date.split("-")[0] : "TBA"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
