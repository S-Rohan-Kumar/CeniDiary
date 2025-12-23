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
        <div className="bg-slate-950 min-h-screen text-white p-10">
            <h1 className="text-center text-4xl font-bold mb-10">MOVIE EXPLORER</h1>
            <SearchBar />
            <MovieGrid />
          </div>
      } />
      <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
  );
}

export default App
