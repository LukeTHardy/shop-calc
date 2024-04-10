"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const BFCalc = () => {
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [thickness, setThickness] = useState<string>("");
  const [boardft, setBoardFt] = useState<string>("");

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(e.target.value);
  };
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
  };
  const handleThicknessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThickness(e.target.value);
  };

  useEffect(() => {
    const calcBF = (): string => {
      const parsedLength = length === "" ? 0 : parseFloat(length);
      const parsedWidth = width === "" ? 0 : parseFloat(width);
      const parsedThickness = thickness === "" ? 0 : parseFloat(thickness);
      let result = (parsedLength * parsedWidth * parsedThickness) / 144;
      return result.toFixed(2);
    };
    setBoardFt(calcBF());
  }, [length, width, thickness]);

  return (
    <main className="flex flex-col items-center justify-evenly w-[40rem] h-[20rem]">
      <Link href="/" className="self-start">
        Back
      </Link>
      <div className="text-2xl my-2">Board ft. Calculator</div>
      <h1 className="italic my-1">
        Enter board length, width, and thickness in inches to find board ft:
      </h1>
      <div className="inputs-container w-full flex justify-around">
        <div className="label">
          <span className="label-text text-xl">Length</span>
        </div>
        <input
          type="text"
          placeholder="(inches)"
          className="input input-bordered w-24"
          value={length}
          onChange={handleLengthChange}
        />
        <div className="label">
          <span className="label-text text-xl">Width</span>
        </div>
        <input
          type="text"
          placeholder="(inches)"
          className="input input-bordered w-24"
          value={width}
          onChange={handleWidthChange}
        />
        <div className="label">
          <span className="label-text text-xl">Thickness</span>
        </div>
        <input
          type="text"
          placeholder="(inches)"
          className="input input-bordered w-24"
          value={thickness}
          onChange={handleThicknessChange}
        />
      </div>
      <div className="calc-product text-xl font-bold">Board Ft: {boardft}</div>
    </main>
  );
};

export default BFCalc;
