"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const Units = () => {
  const [imperialNum, setImperialNum] = useState<string>("");
  const [imperialUnit, setImperialUnit] = useState<string>("in");
  const [metricNum, setMetricNum] = useState<string>("");
  const [metricUnit, setMetricUnit] = useState<string>("cm");
  const [lastInput, setLastInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleReset = () => {
    setImperialNum("");
    setImperialUnit("in");
    setMetricNum("");
    setMetricUnit("cm");
    setLastInput("");
  };

  const changeImperialUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImperialUnit(e.target.value);
  };
  const changeMetricUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetricUnit(e.target.value);
  };

  const handleImperialInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImperialNum(e.target.value);
    setLastInput("imperial");
  };

  const handleMetricInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetricNum(e.target.value);
    setLastInput("metric");
  };

  const handleConvert = () => {
    let result: number;
    let roundedResult: string;

    if (imperialNum || metricNum) {
      setError("");
      switch (true) {
        // Metric Results:

        case imperialUnit === "in" &&
          metricUnit === "mm" &&
          lastInput === "imperial":
          result = parseFloat(imperialNum) * 25.4;
          roundedResult = parseFloat(result.toFixed(1)).toString();
          setMetricNum(roundedResult);
          break;
        case imperialUnit === "in" &&
          metricUnit === "cm" &&
          lastInput === "imperial":
          result = parseFloat(imperialNum) * 2.54;
          roundedResult = parseFloat(result.toFixed(2)).toString();
          setMetricNum(roundedResult);
          break;
        case imperialUnit === "in" &&
          metricUnit === "m" &&
          lastInput === "imperial":
          result = parseFloat(imperialNum) * 0.0254;
          roundedResult = parseFloat(result.toFixed(2)).toString();
          setMetricNum(roundedResult);
          break;
        case imperialUnit === "ft" &&
          metricUnit === "mm" &&
          lastInput === "imperial":
          result = parseFloat(imperialNum) * 304.8;
          roundedResult = parseFloat(result.toFixed(2)).toString();
          setMetricNum(roundedResult);
          break;
        case imperialUnit === "ft" &&
          metricUnit === "cm" &&
          lastInput === "imperial":
          result = parseFloat(imperialNum) * 30.48;
          roundedResult = parseFloat(result.toFixed(2)).toString();
          setMetricNum(roundedResult);
          break;
        case imperialUnit === "ft" &&
          metricUnit === "m" &&
          lastInput === "imperial":
          result = parseFloat(imperialNum) * 0.3048;
          roundedResult = parseFloat(result.toFixed(3)).toString();
          setMetricNum(roundedResult);
          break;

        // Imperial Results:

        case imperialUnit === "in" &&
          metricUnit === "mm" &&
          lastInput === "metric":
          result = parseFloat(metricNum) / 25.4;
          roundedResult = parseFloat(result.toFixed(3)).toString();
          setImperialNum(roundedResult);
          break;
        case imperialUnit === "in" &&
          metricUnit === "cm" &&
          lastInput === "metric":
          result = parseFloat(metricNum) / 2.54;
          roundedResult = parseFloat(result.toFixed(3)).toString();
          setImperialNum(roundedResult);
          break;
        case imperialUnit === "in" &&
          metricUnit === "m" &&
          lastInput === "metric":
          result = parseFloat(metricNum) * 39.37;
          roundedResult = parseFloat(result.toFixed(3)).toString();
          setImperialNum(roundedResult);
          break;
        case imperialUnit === "ft" &&
          metricUnit === "mm" &&
          lastInput === "metric":
          result = parseFloat(metricNum) / 304.8;
          roundedResult = parseFloat(result.toFixed(2)).toString();
          setImperialNum(roundedResult);
          break;
        case imperialUnit === "ft" &&
          metricUnit === "cm" &&
          lastInput === "metric":
          result = parseFloat(metricNum) / 30.48;
          roundedResult = parseFloat(result.toFixed(2)).toString();
          setImperialNum(roundedResult);
          break;
        case imperialUnit === "ft" &&
          metricUnit === "m" &&
          lastInput === "metric":
          result = parseFloat(metricNum) * 3.281;
          roundedResult = parseFloat(result.toFixed(2)).toString();
          setImperialNum(roundedResult);
          break;
        default:
          break;
      }
    } else {
      setError("Input error");
    }
  };

  useEffect(() => {
    if (imperialNum === "") {
      setMetricNum("");
    }
  }, [imperialNum]);

  useEffect(() => {
    if (metricNum === "") {
      setImperialNum("");
    }
  }, [metricNum]);

  useEffect(() => {
    if (imperialNum && metricNum) {
      handleConvert();
    }
  }, [metricUnit, imperialUnit]);

  return (
    <main className="flex flex-col items-center justify-between w-[35rem] h-[17rem]">
      <div className="flex flex-col w-full justify-center">
        <div className="self-start">
          <Link href="/" className="block">
            &lt;-- Back
          </Link>
        </div>
        <div className="text-2xl my-2 self-center">
          Imperial/Metric Conversion
        </div>
      </div>
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleConvert();
            }
          }}
        />
        <button className="btn bg-accent" onClick={handleConvert}>
          Convert
        </button>
        <input
          type="text"
          placeholder="Metric"
          className="input input-bordered w-24"
          value={metricNum}
          onChange={handleMetricInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleConvert();
            }
          }}
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
      {error ? <div className="text-red-600">{error}</div> : ""}
      <button className="btn" onClick={handleReset}>
        Reset
      </button>
    </main>
  );
};

export default Units;
