import React, { useState, useEffect } from "react";
import ICharacter from "../../interface/Character";

type CharacterProp = {
  character: ICharacter;
};

export default function Character({ character }: CharacterProp) {
  const { image, name, gender, species, status } = character;
  return (
    <li className="w-full text-white flex items-center gap-5 border-solid border-2 rounded-2xl border-white py-2  px-1">
      <img src={image} alt={name} className="w-10 h-10 rounded-2xl" />
      <div className="grid items-center grid-cols-[100px_80px_80px] gap-[0.63rem] text-center">
        <p>{name}</p>
        <p>{gender}</p>
        {/* <p>{species}</p> */}
        <p>{status}</p>
      </div>
    </li>
  );
}
