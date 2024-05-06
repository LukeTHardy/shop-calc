"use client";

import React from "react";
import { useState, useEffect, useCallback } from "react";

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
  }, []);

  useEffect(() => {
    fetchAndSetInventory();
  }, [fetchAndSetInventory]);

  const displayInventory = () => {
    if (inventory && inventory.length) {
      return (
        <div>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.quantity}</td>
              <td>{item.species.species}</td>
              <td>{item.format.name}</td>
              <td>
                {item.length} x {item.width} x {item.thickness}
              </td>
              <td>{item.totalBF}</td>
              <td>{item.notes}</td>
              <div className="buttons">
                <button className="edit-btn">Edit</button>
                <button className="edit-btn">Delete</button>
              </div>
            </tr>
          ))}
        </div>
      );
    } else {
      return <div>No inventory saved yet :/</div>;
    }
  };

  return (
    <div className="comp-container flex flex-col items-center">
      <div className="header flex w-auto justify-evenly my-4">
        <h1>My Inventory</h1>
        <div className="pie-chart">[pie chart goes here]</div>
      </div>
      <div className="add-inventory my-4">+ Add Inventory Button</div>
      <div className="filter-bar my-4">Filter/Search Bar</div>
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
    </div>
  );
};

export default Inventory;
