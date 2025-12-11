import type { Character } from "../../src/types/index";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import "./CharacterList.css";

interface Props {
  characters: Character[];
}

export const CharacterList = ({ characters }: Props) => {
  return (
    <div className="grid">
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </div>
  );
};