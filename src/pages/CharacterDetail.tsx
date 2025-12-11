import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Character } from "../types";
import "./CharacterDetail.css";

export const CharacterDetail = () => {
  const { id } = useParams();
  

  const [character, setCharacter] = useState<Character | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  

  const [loadingFav, setLoadingFav] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/characters/${id}`)
      .then((res) => res.json())
      .then((data) => setCharacter(data))
      .catch((err) => console.error("Error loading character:", err));

    // verificar si es favorito
    fetch("http://localhost:3001/api/favorites")
      .then((res) => res.json())
      .then((ids: number[]) => {
        if (ids.includes(Number(id))) {
          setIsFavorite(true);
        }
      })
      .catch((err) => console.error("Error checking favorites:", err));
  }, [id]);

const toggleFavorite = async () => {
    if (!character) return;

    setLoadingFav(true); // 1. Bloqueamos botón

    try {
      const endpoint = "http://localhost:3001/api/favorites";
      let response;

      if (isFavorite) {
        // --- BORRAR ---
        // Nota: Asegúrate de que la URL termina con el ID correcto
        response = await fetch(`${endpoint}/${character.id}`, {
          method: "DELETE",
        });
      } else {
        // --- AÑADIR ---
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ charId: character.id }),
        });
      }

      // 2. Verificamos si salió bien (Códigos 200-299)
      if (response.ok) {
        // Invertimos el estado actual (si era true pasa a false, y viceversa)
        setIsFavorite(!isFavorite);
      } else {
        console.error("Error en respuesta:", response.status, response.statusText);
        alert("Hubo un problema al guardar el favorito.");
      }

    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor.");
    } finally {
      // 3. ESTA ES LA CLAVE: Pase lo que pase, desbloqueamos el botón
      setLoadingFav(false);
    }
  };

  if (!character) return <div style={{ color: "white", padding: "2rem", textAlign: "center" }}>Cargando personaje...</div>;

  return (
    <div className="detail-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <Link to="/" className="back-btn">⬅ Volver al inicio</Link>
        <Link to="/favorites" className="back-btn" style={{ background: '#ff9800' }}>★ Ver Favoritos</Link>
      </div>

      <div className="detail-card">
        <div className="detail-image">
          <img src={character.image} alt={character.name} />
        </div>

        <div className="detail-info">
          <h1>{character.name}</h1>

          <span className="status">
            <span className={`status-icon status-${character.status}`}></span>
            {character.status} - {character.species}
          </span>

          <div className="detail-section">
            <h3>Gender:</h3> <p>{character.gender}</p>
          </div>

          <div className="detail-section">
            <h3>Location:</h3> <p>{character.location.name}</p>
          </div>

          <div className="detail-section">
            <h3>Origin:</h3> <p>{character.origin?.name}</p>
          </div>

          <button
            className={`fav-button-large ${isFavorite ? 'is-fav' : ''}`}
            onClick={toggleFavorite}
            disabled={loadingFav} 
            style={{ 
                opacity: loadingFav ? 0.7 : 1, 
                cursor: loadingFav ? 'wait' : 'pointer' 
            }}
          >
            {loadingFav
              ? "Guardando..."
              : (isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos")
            }
          </button>
        </div>
      </div>
    </div>
  );
};