import { useState, useEffect, useCallback } from "react";
import IEpisode from "../../interface/IEpisode";
import Character from "../Character/Character";
import ICharacter from "../../interface/ICharacter";

type EpisodeProp = {
  episodes: IEpisode;
};

export default function Episode({ episodes }: EpisodeProp) {
  const [showCharacters, setShowCharacters] = useState<boolean>(false);
  const { name, episode, characters } = episodes;
  const [data, setData] = useState<ICharacter[]>([]);

  const handleShowCharacters = () => {
    setShowCharacters(!showCharacters);
  };

  const fetchCharactersData = useCallback(async () => {
    try {
      const responses = [];
      for (const url of characters) {
        const res = await fetch(url);
        responses.push(await res.json());
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      setData(responses);
    } catch (err) {
      console.error(err);
    }
  }, [characters]);

  useEffect(() => {
    fetchCharactersData();
  }, [fetchCharactersData]);

  return (
    <li className="w-full text-white flex flex-col items-center gap-5 border-solid border-2 rounded-2xl border-white py-2 px-1">
      <div className="grid items-center grid-cols-[repeat(3,100px)] gap-[0.63rem] text-center sm:grid-cols-[repeat(3,150px)] md:grid-cols-[repeat(3,250px)] lg:grid-cols-[repeat(3,350px)]">
        <p>{name}</p>
        <p>{`Сезон: ${episode.slice(1, 3)} Серия: ${episode.slice(4)}`}</p>
        <button onClick={handleShowCharacters} className="cursor-pointer">
          {`Characters ${!showCharacters ? "▼" : "▲"}`}
        </button>
      </div>
      {showCharacters && (
        <ul className="my-0 m-auto w-full flex flex-col items-center gap-5 lg:flex-row lg:flex-wrap lg:justify-center">
          {showCharacters &&
            data.map((character) => (
              <Character
                key={character.id}
                character={character}
                episodes={true}
              />
            ))}
        </ul>
      )}
    </li>
  );
}
