import { useState, useEffect, useCallback } from "react";
import Character from "../Character/Character";
import ICharacter from "../../interface/Character";
import SearchForm from "../SearcForm/SearchForm";

export default function CharactersList() {
  const [data, setData] = useState<any>();
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [episode, setEpisode] = useState<any[]>([]);
  const [pageSearch, setPageSearch] = useState(1);

  const getCharacters = useCallback(
    async (searchQuery: any, page = pageSearch) => {
      const params = new URLSearchParams(searchQuery);
      params.append("page", `${page}`);
      params.toString();
      if (searchQuery.episode !== "") {
        try {
          const response = await fetch(
            `https://rickandmortyapi.com/api/episode/?${params}`
          );
          setCharacters([]);
          return response.json().then((res) => {
            setEpisode(res.results);
          });
        } catch (err) {
          setEpisode([]);
          console.log(err);
        }
      } else {
        try {
          const response = await fetch(
            `https://rickandmortyapi.com/api/character/?${params}`
          );
          setEpisode([]);
          return response.json().then((res) => {
            setData(res);
          });
        } catch (err) {
          setCharacters([]);
          console.log(err);
        }
      }
    },
    [pageSearch]
  );

  useEffect(() => {
    if (data?.results) {
      setCharacters((prevCharacters) => {
        return [...prevCharacters, ...data.results];
      });
    } else {
      setCharacters([]);
    }
  }, [data]);

  const handleLoadMore = () => {
    if (data?.info?.next) {
      setPageSearch((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <SearchForm
        getCharacters={getCharacters}
        setCharacters={setCharacters}
        setPageSearch={setPageSearch}
      />
      <ul className="flex flex-col items-center gap-5 md:flex-row flex-wrap justify-center lg:w-[62.50rem] my-0 m-auto xl:w-[78.13rem]">
        {episode && episode.length > 0 ? (
          <>
            {episode.map((character) => (
              <Character key={character.id} character={character} />
            ))}
          </>
        ) : (
          <>
            {characters &&
              characters.map((character) => (
                <Character key={character.id} character={character} />
              ))}
          </>
        )}
      </ul>
      {data?.info?.next && (
        <button
          className="text-white p-2 border-solid border-2 rounded-2xl border-white block m-auto mt-5 mb-0"
          onClick={handleLoadMore}
        >
          Show more
        </button>
      )}
    </>
  );
}
