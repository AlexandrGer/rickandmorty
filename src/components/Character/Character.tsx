import ICharacter from "../../interface/ICharacter";
import useWindoWidth from "../../hooks/windowWidth";

type CharacterProp = {
  character: ICharacter;
};

export default function Character({ character }: CharacterProp) {
  const windowWidth = useWindoWidth();
  const { image, name, gender, species, status, type } = character;

  return (
    <li className="w-full text-white flex items-center gap-5 border-solid border-2 rounded-2xl border-white py-2 px-1 md:flex-col md:w-72 md:p-0">
      <img
        src={image}
        alt={name}
        className="w-10 h-10 rounded-2xl md:w-full md:h-52 object-cover"
      />
      <div className="grid items-center grid-cols-[100px_70px_80px] gap-[0.63rem] text-center m:grid-cols-[100px_70px_80px_70px] sm:grid-cols-[100px_70px_80px_70px_100px] md:flex flex-col md:pt-0 md:px-2 md:pb-2">
        {windowWidth > 767 ? (
          <>
            <div className="grid grid-cols-[60px_1fr] gap-[0.31rem] w-52 justify-items-stretch">
              <span>Name:</span>
              <p className="line-clamp-1">{name}</p>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-[0.31rem] w-52 justify-items-stretch">
              <span>Status:</span>
              <p className="line-clamp-1">{status}</p>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-[0.31rem] w-52 justify-items-stretch">
              <span>Species:</span>
              <p className="line-clamp-1">{species}</p>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-[0.31rem] w-52 justify-items-stretch">
              <span>Gender:</span>
              <p className="line-clamp-1">{gender}</p>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-[0.31rem] w-52 justify-items-stretch">
              <span>Type:</span>
              <p className="line-clamp-1">{type ? type : "unknown"}</p>
            </div>
          </>
        ) : (
          <>
            <p>{name}</p>
            <p>{status}</p>
            <p>{species}</p>
            {windowWidth > 424 && <p>{gender}</p>}
            {windowWidth > 539 && <p>{type ? type : "unknown"}</p>}
          </>
        )}
      </div>
    </li>
  );
}
