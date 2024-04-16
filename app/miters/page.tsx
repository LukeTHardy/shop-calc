"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const Miters = () => {
  const [angle1, setAngle1] = useState<string>("");
  const [angle2, setAngle2] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleReset = () => {
    setAngle1("");
    setAngle2("");
    setResult("");
  };

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAngle1(e.target.value);
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAngle2(e.target.value);
  };

  return (
    <main className="flex flex-col items-center justify-evenly w-[40rem] h-[20rem]">
      <Link href="/" className="self-start">
        Back
      </Link>
      <div className="text-2xl my-2">Compound Miter Calculator</div>
      <h1 className="italic my-1">
        Enter the ______ and the ______ to find the ______:
      </h1>
      <div className="inputs-container w-[75%] flex justify-around">
        <div className="label">
          <span className="label-text text-xl">First thing</span>
        </div>
        <input
          type="text"
          placeholder="length"
          className="input input-bordered w-24"
          value={angle1}
          onChange={handleChange1}
        />
        <div className="label">
          <span className="label-text text-xl">Second thing</span>
        </div>
        <input
          type="text"
          placeholder="length"
          className="input input-bordered w-24"
          value={angle2}
          onChange={handleChange2}
        />
      </div>
      <div className="calc-product text-xl font-bold">Result: {result}</div>
      <button className="btn" onClick={handleReset}>
        Clear
      </button>
    </main>
  );
};

export default Miters;
