"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const Units = () => {
  const [imperialNum, setImperialNum] = useState<string>("");
  const [imperialUnit, setImperialUnit] = useState<string>("in");
  const [metricNum, setMetricNum] = useState<string>("");
  const [metricUnit, setMetricUnit] = useState<string>("cm");
  const [error, setError] = useState<string>("");

  const handleClear = () => {
    setImperialNum("");
    setImperialUnit("in");
    setMetricNum("");
    setMetricUnit("cm");
  };

  const changeImperialUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImperialUnit(e.target.value);
  };
  const changeMetricUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetricUnit(e.target.value);
  };

  const handleImperialInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImperialNum(e.target.value);
  };

  const handleMetricInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetricNum(e.target.value);
  };

  const handleConvert = () => {};

  return (
    <main className="flex flex-col items-center justify-evenly w-[40rem] h-[20rem]">
      <Link href="/" className="self-start">
        Back
      </Link>
      <div className="text-2xl my-2">Imperial/Metric Unit Conversion</div>
      <h1 className="italic my-1 text-center">
        Select imperial and metric units, enter a number, and click Convert to
        see the equivalent value:
      </h1>
      <div className="inputs-container w-full flex justify-around items-end">
        <label>
          <input
            type="radio"
            name="imperialUnit"
            value="in"
            checked={imperialUnit === "in"}
            onChange={changeImperialUnit}
            className="mr-2"
          />
          in.
        </label>
        <label>
          <input
            type="radio"
            name="imperialUnit"
            value="ft"
            checked={imperialUnit === "ft"}
            onChange={changeImperialUnit}
            className="mr-2"
          />
          ft.
        </label>
        <input
          type="text"
          placeholder="Imperial"
          className="input input-bordered w-24"
          value={imperialNum}
          onChange={handleImperialInput}
        />
        <button className="btn" onClick={handleConvert}>
          Convert
        </button>
        <input
          type="text"
          placeholder="Metric"
          className="input input-bordered w-24"
          value={metricNum}
          onChange={handleMetricInput}
        />
        <label>
          <input
            type="radio"
            name="metricUnit"
            value="mm"
            checked={metricUnit === "mm"}
            onChange={changeMetricUnit}
            className="mr-2"
          />
          mm.
        </label>
        <label>
          <input
            type="radio"
            name="metricUnit"
            value="cm"
            checked={metricUnit === "cm"}
            onChange={changeMetricUnit}
            className="mr-2"
          />
          cm.
        </label>
        <label>
          <input
            type="radio"
            name="metricUnit"
            value="m"
            checked={metricUnit === "m"}
            onChange={changeMetricUnit}
            className="mr-2"
          />
          m.
        </label>
      </div>
      <button className="btn" onClick={handleClear}>
        Clear
      </button>
    </main>
  );
};

export default Units;
