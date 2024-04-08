"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const BFCalc = () => {
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [thickness, setThickness] = useState<number>(0);
  const [boardft, setBoardFt] = useState<number>(0);

  const calcBF = (): number => (length * width * thickness) / 144;

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(e.target.value));
  };
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value));
  };
  const handleThicknessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThickness(parseInt(e.target.value));
  };

  useEffect(() => {
    setBoardFt(calcBF());
  }, [length, width, thickness, calcBF]);

  return (
    <main className="flex flex-col items-center">
      <Link href="/" className="self-start">
        Back
      </Link>
      <div className="text-xl my-2">Board ft. Calculator</div>
      <h1 className="italic my-1">
        Enter board length, width, and thickness in inches to find board ft:
      </h1>
      <div className="inputs-container">
        Length:
        <input
          type="text"
          name="length"
          value={length}
          placeholder="in."
          onChange={handleLengthChange}
        />
        Width:
        <input
          type="text"
          name="width"
          value={width}
          placeholder="in."
          onChange={handleWidthChange}
        />
        Thickness:
        <input
          type="text"
          name="thickness"
          value={thickness}
          placeholder="in."
          onChange={handleThicknessChange}
        />
      </div>
      <div className="calc-product">Board Ft: {boardft}</div>
    </main>
  );
};

export default BFCalc;
