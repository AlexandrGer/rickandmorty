import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ICharacter from "../../interface/ICharacter";
import IEpisode from "../../interface/IEpisode";

export default function CharacterPage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [activeCharacter, setActiveCharacter] = useState<ICharacter>();
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);

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

  const fetchEpisodesData = useCallback(async () => {
    if (activeCharacter) {
      try {
        const responses = await Promise.all(
          activeCharacter?.episode.map((url) =>
            fetch(url).then((res) => res.json())
          )
        );
        setEpisodes(responses);
      } catch (err) {
        console.error(err);
      }
    }
  }, [activeCharacter]);

  useEffect(() => {
    fetchEpisodesData();
  }, [fetchEpisodesData]);

  return (
    <>
      {activeCharacter && (
        <main className="flex flex-col items-center gap-5">
          <button
            onClick={() => navigate("/rickandmorty")}
            className="self-start border-solid border-2 rounded-2xl border-white p-2"
          >
            &#9668; Вернуться назад
          </button>
          <img src={activeCharacter?.image} alt={activeCharacter.name} />
          <h1 className="text-[2.50rem] leading-none">
            {activeCharacter.name}
          </h1>
          <div className="flex flex-col items-center gap-5 border-solid border-2 rounded-2xl border-white w-80 py-3">
            <p className="text-2xl">Information</p>
            <ul>
              <li className="flex gap-3">
                <span>Gender:</span>
                <p>{activeCharacter.gender}</p>
              </li>
              <li className="flex gap-3">
                <span>Species:</span>
                <p>{activeCharacter.species}</p>
              </li>
              <li className="flex gap-3">
                <span>Status:</span>
                <p>{activeCharacter.status}</p>
              </li>
              <li className="flex gap-3">
                <span>Type:</span>
                <p>{activeCharacter.type ? activeCharacter.type : "unknown"}</p>
              </li>
              <li className="flex gap-3">
                <span>Location:</span>
                <p>{activeCharacter.location.name}</p>
              </li>
            </ul>
          </div>
          <p className="text-2xl">Episodes:</p>
          <ul className="grid gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {episodes.map((episode, index) => (
              <li key={episode.id} className="flex gap-3">
                <p className="line-clamp-1">{`${index + 1}. ${
                  episode.name
                }`}</p>
              </li>
            ))}
          </ul>
        </main>
      )}
    </>
  );
}
