import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Character } from "../types";
import { CharacterList } from "../CharacterList/CharacterList";
import "./CharacterDetail.css"; 

export const FavoritesPage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Obtenemos los IDs de tu base de datos (Backend)
    fetch("https://rick-morty-api-92w0.onrender.com/api/favorites")
      .then((res) => res.json())
      .then(async (ids: number[]) => {
        if (ids.length === 0) {
          setLoading(false);
          return;
        }

        const idsString = ids.join(",");
        const response = await fetch(`https://rick-morty-api-92w0.onrender.com/api/characters/${idsString}`);
        let data = await response.json();
        if (!Array.isArray(data)) {
            data = [data];
        }
        setCharacters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando favoritos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 className="title">Mis Favoritos</h1>
        <Link to="/" className="back-btn" style={{marginBottom: 0}}>Ir al Inicio</Link>
      </div>

      {loading ? (
        <p style={{textAlign: 'center', color: 'white'}}>Cargando favoritos...</p>
      ) : characters.length > 0 ? (
        <CharacterList characters={characters} />
      ) : (
        <p style={{textAlign: 'center', color: '#999', fontSize: '1.2rem'}}>
            No tienes favoritos guardados aún.
        </p>
      )}
    </div>
  );
};