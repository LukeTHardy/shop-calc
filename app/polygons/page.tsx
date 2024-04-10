"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const Polygons = () => {
  const [sideCount, setSideCount] = useState<string>("");
  const [angle, setAngle] = useState<number>(0);

  const handleSideCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSideCount(e.target.value);
  };

  const handleClear = () => {
    setSideCount("");
    setAngle(0);
  };

  useEffect(() => {
    let sides = parseInt(sideCount);
    let product: number = (180 * (sides - 2)) / sides;
    setAngle(product);
  }, [sideCount, angle]);

  return (
    <main className="flex flex-col items-center justify-evenly w-[40rem] h-[20rem]">
      <Link href="/" className="self-start">
        Back
      </Link>
      <div className="text-2xl my-2">Equilateral Polygon Angle Finder</div>
      <h1 className="italic my-1 text-center">
        Enter the number of sides of an equilateral polygon to find the interior
        angle between sides:
      </h1>
      <div className="inputs-container w-[50%] flex justify-around">
        <div className="label">
          <span className="label-text text-xl">Number of sides:</span>
        </div>
        <input
          type="text"
          placeholder="#"
          className="input input-bordered w-24"
          value={sideCount}
          onChange={handleSideCountChange}
        />
      </div>
      <div className="calc-product text-xl font-bold">
        Angle: {!angle ? "" : `${angle}°`}
      </div>
      <button className="btn" onClick={handleClear}>
        Clear
      </button>
    </main>
  );
};

export default Polygons;
