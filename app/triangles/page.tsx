"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const TriangleCalc = () => {
  const [sideA, setSideA] = useState<string>("");
  const [sideB, setSideB] = useState<string>("");
  const [sideC, setSideC] = useState<string>("");

  const handleSideAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSideA(e.target.value);
  };
  const handleSideBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSideB(e.target.value);
  };
  const handleSideCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSideC(e.target.value);
  };
  const handleClear = () => {
    setSideA("");
    setSideB("");
    setSideC("");
  };

  useEffect(() => {
    if (sideA && sideB && !sideC) {
      const sideAValue = parseFloat(sideA);
      const sideBValue = parseFloat(sideB);
      const sideCValue = Math.sqrt(
        Math.pow(sideAValue, 2) + Math.pow(sideBValue, 2)
      ).toFixed(2);
      setSideC(sideCValue);
    } else if (sideA && !sideB && sideC) {
      const sideAValue = parseFloat(sideA);
      const sideCValue = parseFloat(sideC);
      const sideBValue = Math.sqrt(
        Math.pow(sideCValue, 2) - Math.pow(sideAValue, 2)
      ).toFixed(2);
      setSideB(sideBValue);
    } else if (!sideA && sideB && sideC) {
      const sideBValue = parseFloat(sideB);
      const sideCValue = parseFloat(sideC);
      const sideAValue = Math.sqrt(
        Math.pow(sideCValue, 2) - Math.pow(sideBValue, 2)
      ).toFixed(2);
      setSideA(sideAValue);
    }
  }, [sideA, sideB, sideC]);

  return (
    <main className="flex flex-col items-center justify-between w-[40rem] h-[15rem]">
      <div className="flex flex-col w-full justify-center">
        <div className="self-start">
          <Link href="/" className="block">
            &lt;-- Back
          </Link>
        </div>
        <div className="text-2xl my-2 self-center">Triangle Side Finder</div>
      </div>
      <h1 className="italic my-1">
        Enter two dimensions of a right triangle (90°) to find the unknown side:
      </h1>
      <div className="inputs-container w-[75%] flex justify-around">
        <div className="label">
          <span className="label-text text-xl">A</span>
        </div>
        <input
          type="text"
          placeholder="length"
          className="input input-bordered w-24"
          value={sideA}
          onChange={handleSideAChange}
        />
        <div className="label">
          <span className="label-text text-xl">B</span>
        </div>
        <input
          type="text"
          placeholder="length"
          className="input input-bordered w-24"
          value={sideB}
          onChange={handleSideBChange}
        />
        <div className="label">
          <span className="label-text text-xl">C</span>
        </div>
        <input
          type="text"
          placeholder="length"
          className="input input-bordered w-24"
          value={sideC}
          onChange={handleSideCChange}
        />
      </div>
      <button className="btn" onClick={handleClear}>
        Clear
      </button>
    </main>
  );
};

export default TriangleCalc;
