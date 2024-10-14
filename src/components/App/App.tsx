import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import "./App.css";
import Character from "../Character/Character";
import ICharacter from "../../interface/Character";
import SearchForm from "../SearcForm/SearchForm";

function App() {
  const [characters, setCharacters] = useState<ICharacter[]>([]);

  async function getCharacters() {
    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character/?page=42"
      );
      return response.json().then((res) => setCharacters(res.results));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCharacters();
  }, []);
  console.log(characters);
  return (
    <div className="bg-black max-w-[120.00rem] h-full py-5 px-2">
      <Header />
      <SearchForm />
      <ul className="flex flex-col items-center gap-5">
        {characters.map((character) => (
          <Character key={character.id} character={character} />
        ))}
      </ul>
      {/* </div> */}
    </div>
  );
}

export default App;
