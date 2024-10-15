import { useState, useEffect, useCallback } from "react";
import Character from "../Character/Character";
import ICharacter from "../../interface/ICharacter";
import SearchForm from "../SearcForm/SearchForm";
import IEpisode from "../../interface/IEpisode";
import Episode from "../Episode/Episode";

export default function CharactersList() {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [pageSearch, setPageSearch] = useState(1);

  const getCharacters = useCallback(
    async (searchQuery: any, page = pageSearch) => {
      setError(false);
      const queryParams: Record<string, string> = {};
      queryParams.name = searchQuery.name;
      queryParams.status = searchQuery.status;
      queryParams.species = searchQuery.species;
      queryParams.episode = searchQuery.episode;
      const params = new URLSearchParams(queryParams);
      params.append("page", `${page}`);
      params.toString();
      if (searchQuery.episode !== "") {
        try {
          const response = await fetch(
            `https://rickandmortyapi.com/api/episode/?${params}`
          );
          setCharacters([]);
          if (response.status === 404) {
            setError(true);
          }
          return response.json().then((res) => {
            setEpisodes(res.results);
          });
        } catch (err) {
          setError(true);
        }
      } else {
        try {
          const response = await fetch(
            `https://rickandmortyapi.com/api/character/?${params}`
          );
          setEpisodes([]);
          if (response.status === 404) {
            setError(true);
          }
          return response.json().then((res) => {
            setData(res);
          });
        } catch (err) {
          setError(true);
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
      {error ? (
        <p className="text-center">
          Кажется по вашему запросу ничего не найдено, попробуйте изменить
          фильтры...
        </p>
      ) : (
        <>
          {episodes && episodes.length > 0 ? (
            <>
              <p className="font-medium text-2xl mt-0 m-auto mb-3 max-w-[78.13rem]">
                Найдено:
              </p>
              <span className="block mt-0 m-auto mb-3 max-w-[78.13rem]">
                Обратите внимание, что при поиске эпизодов, фильтры "Имя?" и
                "Раса" работать не будут
              </span>
              <ul className="my-0 m-auto w-full flex flex-col items-center gap-5 xl:w-[78.13rem]">
                {episodes.map((episode) => (
                  <Episode key={episode.id} episodes={episode} />
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="font-medium text-2xl mt-0 m-auto mb-3 max-w-[78.13rem]">
                Найдено:
              </p>
              <ul className="flex flex-col items-center gap-5 md:flex-row flex-wrap justify-center lg:w-[62.50rem] my-0 m-auto xl:w-[78.13rem]">
                {characters.map((character) => (
                  <Character key={character.id} character={character} />
                ))}
              </ul>
            </>
          )}
        </>
      )}

      {data?.info?.next && characters.length > 0 && (
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
