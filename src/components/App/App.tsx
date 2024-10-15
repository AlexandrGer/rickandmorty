import CharactersList from "../CharactersList/CharactersList";
import Header from "../Header/Header";
import "./App.css";

function App() {
  return (
    <div className="bg-black max-w-[120.00rem] h-full py-5 px-2 my-0 m-auto">
      <Header />
      <CharactersList />
    </div>
  );
}

export default App;
