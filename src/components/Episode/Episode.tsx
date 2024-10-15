import { useState, useEffect } from "react";
import useWindoWidth from "../../hooks/windowWidth";
import IEpisode from "../../interface/IEpisode";
import Character from "../Character/Character";
import ICharacter from "../../interface/ICharacter";

type EpisodeProp = {
  episodes: IEpisode;
};

export default function Episode({ episodes }: EpisodeProp) {
  const [showCharacters, setShowCharacters] = useState<boolean>(false);
  const windowWidth = useWindoWidth();
  const { name, episode, characters } = episodes;
  const [data, setData] = useState<ICharacter[]>([]);

  const handleShowCharacters = () => {
    setShowCharacters(!showCharacters);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          characters.map((url) =>
            fetch(url).then((response) => {
              return response.json();
            })
          )
        );
        setData(responses);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [characters]);

  return (
    <li className="w-full text-white flex flex-col items-center gap-5 border-solid border-2 rounded-2xl border-white py-2 px-1 md:flex-col md:w-72 md:p-0">
      <div className="grid items-center grid-cols-[150px_150px] gap-[0.63rem] text-center">
        {windowWidth > 767 ? (
          <>
            <div className="grid grid-cols-[60px_1fr] gap-[0.31rem] w-52 justify-items-stretch">
              <span>Name:</span>
              <p className="line-clamp-1">{name}</p>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-[0.31rem] w-52 justify-items-stretch">
              <span>Episode:</span>
              <p className="line-clamp-1">{episode}</p>
            </div>
          </>
        ) : (
          <>
            <p>{name}</p>
            <p>{`Сезон: ${episode.slice(1, 3)} Серия: ${episode.slice(4)}`}</p>
          </>
        )}
      </div>
      <button onClick={handleShowCharacters}>click</button>
      {showCharacters &&
        data.map((character) => (
          <Character key={character.id} character={character} />
        ))}
    </li>
  );
}
