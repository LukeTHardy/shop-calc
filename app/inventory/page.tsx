"use client";

import React from "react";
import { useState, useEffect } from "react";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    const response = await fetch("http://localhost:8000/inventory", {
      headers: {
        Authorization: 'Token 954e988f90c0b292139fbcad13a4ceebd659c9f0',
      },
    });
    return await response.json();
  };

  const fetchAndSetInventory = async () => {
    const inventoryArray = await fetchInventory();
    const alphinventory = inventoryArray
      .slice()
      .sort((a: any, b: any) => a.name.localeCompare(b.name));
    setInventory(alphinventory);
  };

  useEffect(() => {
    fetchAndSetInventory();
  }, []);

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
            <th>Notes</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
            {(inventory && inventory.length) && }
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
          </tr>
          <tr>
            <td>Shining Star</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
