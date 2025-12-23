import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/SearchBar.jsx'
import MovieGrid from './components/MovieGrid.jsx'
import MovieDetails from "./pages/MovieDetails.jsx"
import { Routes , Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element ={
        <div className="bg-gradient-to-br from-black via-zinc-950 to-black min-h-screen text-white p-10 relative overflow-hidden">
          {/* Ambient Background Effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-950/10 rounded-full blur-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent">
                CeniDiary
              </h1>
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full"></div>
                <span className="text-red-500 text-xl">🎬</span>
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full"></div>
              </div>
            </div>
            
            <SearchBar />
            <MovieGrid />
          </div>
        </div>
      } />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App