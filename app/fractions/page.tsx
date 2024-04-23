"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";

const Fractions = () => {
  const [fraction, setFraction] = useState<string>("");
  const [decimal, setDecimal] = useState<string>("");
  const [lastInput, setLastInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFractionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastInput("fraction");
    setFraction(e.target.value);
  };
  const handleDecimalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastInput("decimal");
    setDecimal(e.target.value);
  };

  const handleClear = () => {
    setFraction("");
    setDecimal("");
  };

  const handleConvert = () => {
    if (fraction && (lastInput === "" || lastInput === "fraction")) {
      const evalFraction = () => {
        let result: number = eval(fraction);
        let roundedResult: string = parseFloat(result.toFixed(3)).toString();
        setDecimal(roundedResult);
      };
      evalFraction();
    } else if (decimal && (lastInput === "" || lastInput === "decimal")) {
      const evalDecimal = () => {
        let numerator: number = parseFloat(decimal) * 10000;
        let denominator: number = 10000;
        const gcd = function gcd(a: number, b: number) {
          while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
          }
          return a;
        };
        const divisor = gcd(numerator, denominator);
        let result: string = `${numerator / divisor}/${denominator / divisor}`;
        setFraction(result);
      };
      evalDecimal();
    }
  };

  return (
    <main className="flex flex-col items-center justify-between w-[40rem] h-[15rem]">
      <div className="flex flex-col w-full justify-center">
        <div className="self-start">
          <Link href="/" className="block">
            &lt;-- Back
          </Link>
        </div>
        <div className="text-2xl my-2 self-center">
          Fraction/Decimal Conversion
        </div>
      </div>
      <h1 className="italic my-1 text-center">
        Enter a decimal or a fraction to see the equivalent value:
      </h1>
      <div className="inputs-container w-[50%] flex justify-around">
        <input
          type="text"
          placeholder="Fraction"
          className="input input-bordered w-24"
          value={fraction}
          onChange={handleFractionChange}
        />
        <button className="btn" onClick={handleConvert}>
          Convert
        </button>
        <input
          type="text"
          placeholder="Decimal"
          className="input input-bordered w-24"
          value={decimal}
          onChange={handleDecimalChange}
        />
      </div>
      <button className="btn" onClick={handleClear}>
        Clear
      </button>
    </main>
  );
};

export default Fractions;
