export default function SearchForm() {
  return (
    <form className="text-white flex flex-col gap-5 pb-8">
      <div className="flex flex-col gap-[0.31rem]">
        <label>Имя</label>
        <input type="text" className="input " />
      </div>
      <div className="w-full flex gap-5 ">
        <div className="flex flex-col flex-1 gap-[0.31rem]">
          <label>Жив?</label>
          <select className="input cursor-pointer">
            <option value="Dead">Dead</option>
            <option value="Alive">Alive</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div className="flex flex-col flex-1 gap-[0.31rem]">
          <label>Раса</label>
          <select className="input cursor-pointer">
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
            <option value="Humanoid">Humanoid</option>
            <option value="Robot">Robot</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-[0.31rem]">
        <label>Эпизод</label>
        <input type="number" className="input " />
      </div>
    </form>
  );
}
