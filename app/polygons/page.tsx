"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const Polygons = () => {
  const [sideCount, setSideCount] = useState<string>("");
  const [angle, setAngle] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleSideCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSideCount(e.target.value);
  };

  const handleClear = () => {
    setSideCount("");
    setAngle(0);
  };

  useEffect(() => {
    let sides = parseInt(sideCount);
    let wholeNum: boolean = sides % 1 === 0;
    if (!sideCount) {
      setAngle(0);
      setError("");
    } else if (sides < 3) {
      setError("* At least 3 sides required *");
      setAngle(0);
    } else if (sides && !wholeNum) {
      setError("Only whole numbers accepted");
    } else if (sides >= 3 && wholeNum) {
      let product: number = (180 * (sides - 2)) / sides;
      let roundedProduct: number = parseFloat(product.toFixed(2));
      setAngle(roundedProduct);
    }
  }, [sideCount, angle]);

  return (
    <main className="flex flex-col items-center justify-evenly w-[40rem] h-[20rem]">
      <Link href="/" className="self-start">
        Back
      </Link>
      <div className="text-2xl my-2">Regular Polygon Angle Finder</div>
      <h1 className="italic my-1 text-center">
        Enter the number of sides of a regular polygon to find the interior
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
        Angle: {!angle ? error : angle + "°"}
      </div>
      <button className="btn" onClick={handleClear}>
        Clear
      </button>
    </main>
  );
};

export default Polygons;
