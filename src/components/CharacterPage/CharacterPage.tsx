import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ICharacter from "../../interface/ICharacter";

export default function CharacterPage() {
  let { id } = useParams();
  const [activeCharacter, setActiveCharacter] = useState<ICharacter>();

  useEffect(() => {
    const getCharacterId = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        return response.json().then((res) => {
          setActiveCharacter(res);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getCharacterId();
  }, [id]);

  return (
    <>
      {activeCharacter && (
        <div>
          <img src={activeCharacter?.image} alt={activeCharacter.name} />
          <h1>{activeCharacter.name}</h1>
          <p>Information</p>
          <ul>
            <li className="flex gap-3">
              <span>Gender</span>
              <p>{activeCharacter.gender}</p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
