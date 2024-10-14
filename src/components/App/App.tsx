import React, { useState, useCallback } from "react";
import Header from "../Header/Header";
import "./App.css";
import Character from "../Character/Character";
import ICharacter from "../../interface/Character";
import SearchForm from "../SearcForm/SearchForm";

function App() {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [episode, setEpisode] = useState<any[]>([]);

  const getCharacters = useCallback(async (searchQuery: any) => {
    const params = new URLSearchParams(searchQuery).toString();
    if (searchQuery.episode !== "") {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/?${params}`
        );
        setCharacters([]);
        return response.json().then((res) => setEpisode(res.results));
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
        return response.json().then((res) => setCharacters(res.results));
      } catch (err) {
        setCharacters([]);
        console.log(err);
      }
    }
  }, []);

  console.log(characters);
  console.log(episode);

  return (
    <div className="bg-black max-w-[120.00rem] h-full py-5 px-2">
      <Header />
      <SearchForm getCharacters={getCharacters} />
      <ul className="flex flex-col items-center gap-5">
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
        {/* {characters &&
          characters.map((character) => (
            <Character key={character.id} character={character} />
          ))} */}
      </ul>
    </div>
  );
}

export default App;
