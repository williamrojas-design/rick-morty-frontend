import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CharacterList } from '../src/CharacterList/CharacterList';
import { CharacterDetail } from './pages/CharacterDetail';
import { FavoritesPage } from './pages/FavoritesPage';
import type { Character } from './types';
import './App.css';

interface ApiResponse {
  results: Character[];
}

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/characters')
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        if (data.results) {
          setCharacters(data.results);
        } else {
          setCharacters([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching characters:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '15px', 
        marginBottom: '2rem',
        position: 'relative'
      }}>
        <h1 className="title" style={{marginBottom: 0}}>Rick and Morty API</h1>
        
        <Link 
          to="/favorites" 
          title="Ver mis favoritos"
          className="fav-link"
        >
          ★
        </Link>
      </div>

      {loading ? (
        <h2 style={{textAlign: 'center', color: '#666'}}>Cargando personajes...</h2>
      ) : (
        <CharacterList characters={characters} />
      )}
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/character/:id" element={<CharacterDetail />} />
      
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
}

export default App;
