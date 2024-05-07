"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

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

  const displayInventory = () => {
    if (inventory && inventory.length) {
      return (
        <>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>({item.quantity})</td>
              <td className="flex px-2">
                <Image
                  src={item.species.image} // Route of the image file
                  height={10} // Desired size with correct aspect ratio
                  width={25} // Desired size with correct aspect ratio
                  alt="Wood Image"
                  className="mr-2"
                />
                {/* <img
                  src={item.species.image}
                  alt="Wood image"
                  className="w-4 h-4 mx-2"
                ></img> */}
                {item.species.species}
              </td>
              <td className="px-2">{item.format.name}</td>
              <td className="px-2">
                {item.length}&quot; x {item.width}&quot; x {item.thickness}
                &quot;
              </td>
              <td className="px-2 text-center">
                {((item.length * item.width * item.thickness) / 144).toFixed(2)}
              </td>
              <td className="px-2">
                {new Date(item.entry_date).toLocaleString()}
              </td>
              <td className="px-2">{item.notes}</td>
              <td className="px-2">
                <button className="edit-btn px-1">Edit</button>
                <button className="edit-btn px-1">Delete</button>
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
      <div className="header flex w-auto justify-evenly my-4">
        <h1>My Inventory</h1>
        <div className="pie-chart">[pie chart goes here]</div>
      </div>
      <div className="add-inventory my-4">+ Add Inventory Button</div>
      <div className="filter-bar my-4">Filter/Search Bar</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table-auto">
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Species</th>
              <th>Format</th>
              <th>Dimensions</th>
              <th>Total Board Ft.</th>
              <th>Entry Date</th>
              <th>Notes</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{displayInventory()}</tbody>
        </table>
      )}
    </div>
  );
};

export default Inventory;
