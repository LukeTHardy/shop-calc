"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const TriangleCalc = () => {
  const [sideA, setSideA] = useState<string>("");
  const [sideB, setSideB] = useState<string>("");
  const [sideC, setSideC] = useState<string>("");
  const [validInput, setValidInput] = useState<boolean>(false);

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
    setValidInput(false);
  };

  const handleCalculate = () => {
    if (sideA && sideB && !sideC) {
      const sideAValue = parseFloat(sideA);
      const sideBValue = parseFloat(sideB);
      const sideCValue = Math.sqrt(
        Math.pow(sideAValue, 2) + Math.pow(sideBValue, 2)
      ).toFixed(3);
      setSideC(sideCValue);
    } else if (sideA && !sideB && sideC) {
      const sideAValue = parseFloat(sideA);
      const sideCValue = parseFloat(sideC);
      const sideBValue = Math.sqrt(
        Math.pow(sideCValue, 2) - Math.pow(sideAValue, 2)
      ).toFixed(3);
      setSideB(sideBValue);
    } else if (!sideA && sideB && sideC) {
      const sideBValue = parseFloat(sideB);
      const sideCValue = parseFloat(sideC);
      const sideAValue = Math.sqrt(
        Math.pow(sideCValue, 2) - Math.pow(sideBValue, 2)
      ).toFixed(3);
      setSideA(sideAValue);
    }
  };

  useEffect(() => {
    if (
      (sideA && sideB && !sideC) ||
      (sideA && sideC && !sideB) ||
      (sideB && sideC && !sideA)
    ) {
      setValidInput(true);
    } else {
      setValidInput(false);
    }
  }, [sideA, sideB, sideC]);

  return (
    <main className="flex flex-col items-center justify-between w-[35rem] h-[17rem]">
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCalculate();
            }
          }}
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCalculate();
            }
          }}
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCalculate();
            }
          }}
        />
      </div>
      <button
        className="btn m-2 bg-accent"
        disabled={!validInput}
        onClick={handleCalculate}
      >
        Calculate
      </button>
      <button className="btn" onClick={handleClear}>
        Clear
      </button>
    </main>
  );
};

export default TriangleCalc;
