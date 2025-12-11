import { Link } from "react-router-dom"; 
import type { Character } from "../types/index";
import "./CharacterCard.css";

interface Props {
  character: Character;
}

export const CharacterCard = ({ character }: Props) => {
  return (
    <Link to={`/character/${character.id}`} className="card-link">
      <article className="card">
        <div className="img-wrapper">
          <img src={character.image} alt={character.name} />
        </div>
        
        <div className="card-content">
          <div className="section">
            <h2 className="char-name">{character.name}</h2>
            <span className="status">
              <span className={`status-icon status-${character.status}`}></span>
              {character.status} - {character.species}
            </span>
          </div>

          <div className="section">
            <span className="text-gray">Last known location:</span>
            <p className="text-white">{character.location.name}</p>
          </div>

          <div className="section">
            <span className="text-gray">Origin:</span>
            <p className="text-white">{character.origin?.name || "Unknown"}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};