import React, { useState } from 'react'
import { useMovie } from "../contexts/MovieContext.jsx"

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const { fetchMovies } = useMovie()

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(query.trim()) fetchMovies(query)
  }
  
  return (
    <div className="flex justify-center mb-20 px-4">
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full max-w-3xl gap-4 p-3 bg-gradient-to-br from-zinc-900/30 via-black/40 to-zinc-950/60 backdrop-blur-2xl border border-red-950/40 rounded-[2rem] shadow-2xl shadow-black/60 hover:shadow-red-900/30 transition-all duration-500 hover:border-red-800/40"
      >
        {/* Search Icon */}
        <div className="flex items-center pl-3 text-zinc-600 text-xl">
          🔍
        </div>
        
        {/* Input Field */}
        <input
          type="text"
          placeholder="Search for movies, genres, actors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent px-2 py-3 outline-none text-white placeholder:text-zinc-600 text-lg font-medium focus:placeholder:text-zinc-700 transition-colors"
        />
        
        {/* Search Button */}
        <button
          type="submit"
          className="relative overflow-hidden bg-gradient-to-r from-red-600/30 to-red-800/30 hover:from-red-600/50 hover:to-red-800/50 text-red-400 hover:text-red-300 border border-red-700/40 hover:border-red-600/60 font-bold px-10 py-3 rounded-2xl transition-all duration-300 active:scale-95 backdrop-blur-xl shadow-lg shadow-red-900/20 hover:shadow-red-800/40 group"
        >
          <span className="relative z-10">Search</span>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
        </button>
        
        {/* Glow effect on focus */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/0 via-red-600/20 to-red-800/0 rounded-[2rem] opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
      </form>
    </div>
  );
}