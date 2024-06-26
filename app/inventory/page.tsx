"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { DonutChart } from "@tremor/react";

interface InventoryItem {
  id: number;
  species: {
    id: number;
    colorCat: {
      id: number;
      name: string;
    };
    species: string;
    domestic: boolean;
    hardwood: boolean;
    density: number;
    origin: string;
    appearance: string;
    characteristics: string;
    image: string;
  };
  format: {
    id: number;
    name: string;
  };
  entry_date: string;
  quantity: number;
  length: number;
  width: number;
  thickness: number;
  totalBF: number;
  notes: string | null;
  user: number;
}

interface Statistics {
  uniqueSpeciesCount: number;
  totalBoards: number;
  totalSheets: number;
  totalDowels: number;
  totalTurningBlanks: number;
  totalBoardFeet: number;
  totalHardwoodBF: number;
  totalSoftwoodBF: number;
}

interface StockItem {
  name: string;
  value: number;
  colorCatId: number;
}

interface SpeciesMap {
  [key: string]: { totalValue: number; colorCatId: number };
}

const Inventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    const response: Response = await fetch("http://localhost:8000/inventory", {
      headers: {
        Authorization: "Token 954e988f90c0b292139fbcad13a4ceebd659c9f0",
      },
    });
    return await response.json();
  };

  const fetchAndSetInventory = useCallback(async () => {
    const inventoryArray: InventoryItem[] = await fetchInventory();
    const alphinventory = inventoryArray
      .slice()
      .sort((a: InventoryItem, b: InventoryItem) =>
        a.species.species.localeCompare(b.species.species)
      );
    setInventory(alphinventory);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAndSetInventory();
  }, [fetchAndSetInventory]);

  const dataFormatter = (number: number) => `${number.toString()} bf.`;

  // Pie chart colors

  const colorCategoryMap: { [key: number]: string } = {
    1: "#e6e2cb",
    2: "#ecd5a7", // Assuming "Blonde" is a shade of yellow
    3: "#b5651d", // Light Brown
    4: "#936025", // Medium Brown
    5: "#663d24", // Dark Brown
    6: "#5d1e0f", // Red
    7: "#333333", // Mixed Colors
    8: "#878787", // Other
  };

  // Reduce the inventory array to just these three properties (might be an unnecessary step to remove later)

  let stock: StockItem[] = inventory.map((item) => ({
    name: item.species.species,
    value: item.totalBF,
    colorCatId: item.species.colorCat.id,
  }));

  // Reduce the stock array to an object with each species as one key, with total quantities and color category id
  // Consolidates and sums all the quantities for the same species, making each species name one key on the object
  // Also carries the color category id's with it

  let speciesMap: SpeciesMap = stock.reduce(
    (acc: SpeciesMap, curr: StockItem) => {
      if (!acc[curr.name]) {
        acc[curr.name] = { totalValue: 0, colorCatId: curr.colorCatId };
      }
      acc[curr.name].totalValue += curr.value;
      acc[curr.name].colorCatId = curr.colorCatId; // Assumes the color category for each species is consistent
      return acc;
    },
    {}
  );

  // Uses .map to transform the speciesMap object back into an array of objects (might be able to consolidate all these into one function later?)
  // Maps through the keys and creates the object below for each one...this feels redundant...

  let uniqueStock = Object.keys(speciesMap).map((name) => ({
    name: name,
    value: speciesMap[name].totalValue,
    colorCatId: speciesMap[name].colorCatId,
  }));

  // Uses the color category id's in uniqueStock to give it the actual color hex codes required by the pie chart

  const enhancedUniqueStock = uniqueStock.map((item) => ({
    ...item,
    color: colorCategoryMap[item.colorCatId],
  }));

  const calculateTotals = (inventory: InventoryItem[]): Statistics => {
    const uniqueSpeciesSet = new Set<string>();
    let totalBoards = 0;
    let totalSheets = 0;
    let totalDowels = 0;
    let totalTurningBlanks = 0;
    let totalBoardFeet = 0;
    let totalHardwoodBF = 0;
    let totalSoftwoodBF = 0;

    for (const item of inventory) {
      uniqueSpeciesSet.add(item.species.species);
      totalBoardFeet += item.totalBF;

      if (item.species.hardwood) {
        totalHardwoodBF += item.totalBF;
      } else {
        totalSoftwoodBF += item.totalBF;
      }

      switch (item.format.name) {
        case "Board":
          totalBoards += item.quantity;
          break;
        case "Sheet":
          totalSheets += item.quantity;
          break;
        case "Dowel":
          totalDowels += item.quantity;
          break;
        case "Turning Blank":
          totalTurningBlanks += item.quantity;
          break;
      }
    }

    return {
      uniqueSpeciesCount: uniqueSpeciesSet.size,
      totalBoards,
      totalSheets,
      totalDowels,
      totalTurningBlanks,
      totalBoardFeet,
      totalHardwoodBF,
      totalSoftwoodBF,
    };
  };

  const stats = calculateTotals(inventory);

  const displayInventory = () => {
    if (inventory && inventory.length) {
      return (
        <>
          {inventory.map((item) => (
            <tr key={item.id} className="text-sm">
              <td className="px-2 text-center">({item.quantity})</td>
              <td className="px-1">
                <Image
                  src={item.species.image} // Route of the image file
                  height={15} // Desired size with correct aspect ratio
                  width={15} // Desired size with correct aspect ratio
                  alt="Wood Image"
                  className="inline-block align-middle"
                />

                <span className="inline-block align-middle px-1">
                  {item.species.species}
                </span>
              </td>
              <td className="px-1 text-center">{item.format.name}</td>
              <td className="px-2 text-center">
                {item.length}&quot; x {item.width}&quot; x {item.thickness}
                &quot;
              </td>
              <td className="px-1 text-center">{item.totalBF}</td>
              <td className="px-1 text-center">
                {new Date(item.entry_date).toLocaleDateString()}
              </td>
              <td className="px-1 text-center">
                {item.notes ? (
                  <p className="bold">View</p>
                ) : (
                  <p className="italic">none</p>
                )}
              </td>
              <td className="px-2">
                {/* <button className="edit-btn px-1">Edit</button>
                <button className="edit-btn px-1">Delete</button> */}
                <Image
                  src="/pencil.png" // Route of the image file
                  height={20} // Desired size with correct aspect ratio
                  width={23} // Desired size with correct aspect ratio
                  alt="Edit icon"
                  className="px-1 h-4 align-middle inline-block"
                />
                <Image
                  src="/trash.png" // Route of the image file
                  height={20} // Desired size with correct aspect ratio
                  width={13} // Desired size with correct aspect ratio
                  alt="Delete icon"
                  className="h-4 align-middle inline-block"
                />

                {/* <img
                      className="h-[2rem] cursor-pointer"
                      src={pencil}
                      alt="favorite-button"
                      onClick={() => {
                        navigate(`/plants/${plantId}/edit`);
                      }}
                    />
                    <img
                      className="h-[2rem] w-[1.8rem] cursor-pointer"
                      src={trash}
                      alt="favorite-button"
                      onClick={() => {
                        deletePlant(plantId);
                        navigate("/plants");
                      }}
                    /> */}
              </td>
            </tr>
          ))}
        </>
      );
    } else {
      return <div>No inventory saved yet :/</div>;
    }
  };

  return (
    <div className="comp-container flex flex-col items-center w-full">
      <div className="header flex w-3/4 justify-between items-center">
        <div className="header-left flex flex-col">
          <div className="text-xl">
            All Wood: {stats.totalBoardFeet.toFixed(1)} bf
          </div>
          <div className="italic">
            Hardwood: {stats.totalHardwoodBF.toFixed(1)} bf
          </div>
          <div className="italic mb-3">
            Softwood: {stats.totalSoftwoodBF.toFixed(1)} bf
          </div>
          <div className="text-xl">
            <span className="text-2xl mr-2">{stats.uniqueSpeciesCount}</span>
            Species
          </div>
          <div className="text-xl">
            <span className="text-2xl mr-2">{stats.totalBoards}</span>
            {stats.totalBoards > 1 || stats.totalBoards === 0
              ? "Boards"
              : "Board"}
          </div>
          <div className="text-xl">
            <span className="text-2xl mr-2">{stats.totalSheets}</span>
            {stats.totalSheets > 1 || stats.totalSheets === 0
              ? "Sheets"
              : "Sheet"}
          </div>
          <div className="text-xl">
            <span className="text-2xl mr-2">{stats.totalTurningBlanks}</span>
            {stats.totalTurningBlanks > 1 || stats.totalTurningBlanks === 0
              ? "Turning Blanks"
              : "Turning Blank"}
          </div>
          <div className="text-xl">
            <span className="text-2xl mr-2">{stats.totalDowels}</span>
            {stats.totalDowels > 1 || stats.totalDowels === 0
              ? "Dowels"
              : "Dowel"}
          </div>
        </div>
        <div className="header-right flex flex-col">
          <span className="chart-title text-center text-2xl block">
            Stock by Species:
          </span>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex justify-center items-center w-40 h-48">
              <DonutChart
                data={uniqueStock}
                variant="pie"
                valueFormatter={dataFormatter}
                onValueChange={(v) => console.log(v)}
                colors={enhancedUniqueStock.map((item) => item.color)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="add-inventory my-2">+ Add Inventory Button</div>
      <div className="filter-bar my-2">Filter/Search Bar</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table-auto">
          <thead>
            <tr className="text-lg italic">
              <th>#</th>
              <th>Species</th>
              <th>Format</th>
              <th>Dimensions</th>
              <th>Total bf.</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody className="text-xs">{displayInventory()}</tbody>
        </table>
      )}
    </div>
  );
};

export default Inventory;
