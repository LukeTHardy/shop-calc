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

interface StockItem {
  name: string;
  value: number;
}

interface SpeciesMap {
  [key: string]: number;
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

  let stock: StockItem[] = inventory.map((item) => ({
    name: item.species.species, // Corrected to access item.species.name
    value: item.totalBF,
  }));

  // Reduce the stock array to an object where the keys are species names
  let speciesMap: SpeciesMap = stock.reduce(
    (acc: SpeciesMap, curr: StockItem) => {
      if (!acc[curr.name]) {
        acc[curr.name] = 0;
      }
      acc[curr.name] += curr.value;
      return acc;
    },
    {}
  );

  // Transform the speciesMap object back into an array
  let uniqueStock: StockItem[] = Object.keys(speciesMap).map((name) => ({
    name: name,
    value: speciesMap[name],
  }));

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
      <div className="header flex w-auto justify-evenly">
        <div className="mx-auto space-y-1">
          <div className="">
            <span className="text-center text-2xl block">My Inventory</span>
            <div className="flex justify-center">
              <DonutChart
                data={uniqueStock}
                variant="pie"
                valueFormatter={dataFormatter}
                onValueChange={(v) => console.log(v)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="add-inventory my-2">+ Add Inventory Button</div>
      <div className="filter-bar my-2">Filter/Search Bar</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table-auto">
          <thead>
            <tr className="text-lg">
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
