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
    <div className="flex justify-center mb-16 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl gap-3 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent px-4 py-2 outline-none text-white placeholder:text-slate-500"
        />
        <button
          type="submit"
          className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 border border-cyan-500/30 font-bold px-8 py-3 rounded-xl transition-all active:scale-95 backdrop-blur-md"
        >
          Search
        </button>
      </form>
    </div>
  );
}
