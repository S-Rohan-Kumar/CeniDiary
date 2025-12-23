import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ 
    movie: null, 
    cast: [], 
    director: '', 
    providers: null 
  });
  
  const API_KEY = import.meta.env.VITE_TMDB_KEY;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,watch/providers`
        );
        const result = await res.json();
        
        const directorInfo = result.credits?.crew.find(person => person.job === 'Director');
        const watchProviders = result['watch/providers']?.results?.IN;

        setData({
          movie: result,
          cast: result.credits?.cast.slice(0, 6) || [],
          director: directorInfo ? directorInfo.name : 'Unknown',
          providers: watchProviders
        });
      } catch (error) {
        console.error("Error loading movie info:", error);
      }
    };
    fetchAllData();
    window.scrollTo(0, 0);
  }, [id]);

  if (!data.movie) return <div className="flex justify-center mt-20 text-cyan-400 font-bold animate-pulse">Fetching Movie Details...</div>;

  const { movie, cast, director, providers } = data;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 font-sans">
      {/* Navigation */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-8 px-6 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/20 transition-all text-sm font-medium"
      >
        ← Back to Browse
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* LEFT COLUMN: Poster & Action */}
          <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              className="w-full rounded-3xl shadow-2xl border border-white/10 transition-transform duration-500 hover:scale-[1.02]"
              alt={movie.title}
            />
            
            {/* RESTORED: Watch Now Button */}
            {movie.homepage ? (
              <a 
                href={movie.homepage} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative w-full text-center py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-black text-xl overflow-hidden transition-all active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]"
              >
                <span className="relative z-10">WATCH NOW</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </a>
            ) : (
              <div className="w-full text-center py-4 bg-slate-800/50 rounded-2xl text-slate-500 font-bold border border-white/5">
                NOT AVAILABLE ONLINE
              </div>
            )}
          </div>
          
          {/* RIGHT COLUMN: Information */}
          <div className="flex-1">
            <div className="flex items-baseline gap-4 mb-2 flex-wrap">
              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">{movie.title}</h1>
              <span className="text-slate-500 text-3xl font-light">
                ({movie.release_date?.split("-")[0]})
              </span>
            </div>
            
            <p className="text-cyan-400/80 text-xl italic mb-8 font-medium">
              {movie.tagline ? `"${movie.tagline}"` : ""}
            </p>

            {/* Metadata Chips */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
               <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10">
                  <span className="text-yellow-400 font-bold text-xl">★ {movie.vote_average.toFixed(1)}</span>
               </div>
               <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/10 text-slate-300 font-medium">
                  {movie.runtime} min
               </div>
               <div className="bg-cyan-500/10 px-4 py-2 rounded-xl border border-cyan-500/20 text-cyan-400 font-bold">
                  🎬 {director}
               </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-10">
              {movie.genres.map(g => (
                <span key={g.id} className="bg-white/5 text-slate-300 px-4 py-1.5 rounded-full text-xs border border-white/10 tracking-widest uppercase">
                  {g.name}
                </span>
              ))}
            </div>

            {/* Story Section */}
            <div className="mb-10">
               <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500 font-bold mb-4">The Story</h2>
               <p className="text-slate-300 text-lg leading-relaxed">{movie.overview}</p>
            </div>

            {/* Streaming Info (India) */}
            {providers?.flatrate && (
              <div className="mb-12 p-6 bg-white/5 rounded-[2rem] border border-white/10">
                <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4 font-bold">Stream On</h3>
                <div className="flex gap-4">
                  {providers.flatrate.map(p => (
                    <img 
                      key={p.provider_id} 
                      src={`https://image.tmdb.org/t/p/original${p.logo_path}`} 
                      className="w-14 h-14 rounded-2xl shadow-lg border border-white/10 hover:scale-110 transition-transform" 
                      title={p.provider_name} 
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Cast Grid */}
            <h2 className="text-sm uppercase tracking-[0.3em] text-slate-500 font-bold mb-6">Top Cast</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
              {cast.map(person => (
                <div key={person.id} className="text-center group">
                  <div className="relative aspect-square mb-3">
                    <img 
                      src={person.profile_path ? `https://image.tmdb.org/t/p/w185${person.profile_path}` : 'https://via.placeholder.com/185x278'} 
                      className="w-full h-full object-cover rounded-[2rem] border-2 border-transparent group-hover:border-cyan-500 transition-all duration-300"
                      alt={person.name}
                    />
                  </div>
                  <p className="text-xs font-bold text-white truncate">{person.name}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-1 uppercase">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}