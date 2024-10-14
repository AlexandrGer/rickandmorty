import React, { useState, useEffect, useMemo } from "react";

type Props = {
  getCharacters: any;
};

export default function SearchForm({ getCharacters }: Props) {
  const [nameInput, setNameInput] = useState<string>(
    localStorage.getItem("name") || ""
  );
  const [statusInput, setStatusInput] = useState<string>(
    localStorage.getItem("status") || ""
  );
  const [speciesInput, setSpeciesInput] = useState<string>(
    localStorage.getItem("species") || ""
  );
  const [episodeInput, setEpisodeInput] = useState<string>(
    localStorage.getItem("episode") || ""
  );

  useEffect(() => {
    localStorage.setItem("name", nameInput);
    localStorage.setItem("status", statusInput);
    localStorage.setItem("species", speciesInput);
    localStorage.setItem("episode", episodeInput);
  }, [nameInput, speciesInput, statusInput, episodeInput]);

  const searchQuery = useMemo(
    () => ({
      name: nameInput,
      status: statusInput,
      species: speciesInput,
      episode: episodeInput,
      page: 1,
    }),
    [episodeInput, nameInput, speciesInput, statusInput]
  );

  useEffect(() => {
    getCharacters(searchQuery);
  }, [searchQuery]);

  return (
    <form className="text-white flex flex-col gap-5 pb-8">
      <div className="flex flex-col gap-[0.31rem]">
        <label>Имя</label>
        <input
          value={nameInput}
          type="text"
          className="input"
          onChange={(event) => setNameInput(event.target.value)}
        />
      </div>
      <div className="w-full flex gap-5 ">
        <div className="flex flex-col flex-1 gap-[0.31rem]">
          <label>Жив?</label>
          <select
            className="input cursor-pointer"
            value={statusInput}
            onChange={(event) => setStatusInput(event.target.value)}
          >
            <option value="">Status</option>
            <option value="Dead">Dead</option>
            <option value="Alive">Alive</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div className="flex flex-col flex-1 gap-[0.31rem]">
          <label>Раса</label>
          <select
            className="input cursor-pointer"
            value={speciesInput}
            onChange={(event) => setSpeciesInput(event.target.value)}
          >
            <option value="">Species</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
            <option value="Humanoid">Humanoid</option>
            <option value="Robot">Robot</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-[0.31rem]">
        <label>Эпизод</label>
        <input
          type="number"
          className="input"
          value={episodeInput}
          min={1}
          onChange={(event) => setEpisodeInput(event.target.value)}
        />
      </div>
    </form>
  );
}
