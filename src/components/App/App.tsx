import { Navigate, Route, Routes } from "react-router-dom";
import CharactersList from "../CharactersList/CharactersList";
import Header from "../Header/Header";
import "./App.css";
import CharacterPage from "../CharacterPage/CharacterPage";

function App() {
  return (
    <div className="bg-black max-w-[120.00rem] h-[100vhmin-height] py-5 px-2 my-0 m-auto text-white">
      <Header />
      <Routes>
        <Route path="/rickandmorty" element={<CharactersList />} />
        <Route path="/rickandmorty/character/:id" element={<CharacterPage />} />
        <Route path="/*" element={<Navigate to="/rickandmorty" />} />
      </Routes>
    </div>
  );
}

export default App;
