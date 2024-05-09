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
              <td className="text-center">({item.quantity})</td>
              <td className="flex px-1">
                <Image
                  src={item.species.image} // Route of the image file
                  height={15} // Desired size with correct aspect ratio
                  width={15} // Desired size with correct aspect ratio
                  alt="Wood Image"
                  className="mr-2"
                />
                {item.species.species}
              </td>
              <td className="px-1 text-center">{item.format.name}</td>
              <td className="px-1 text-center">
                {item.length}&quot; x {item.width}&quot; x {item.thickness}
                &quot;
              </td>
              <td className="px-1 text-center">
                {((item.length * item.width * item.thickness) / 144).toFixed(2)}
              </td>
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
              <td className="px-1 flex">
                {/* <button className="edit-btn px-1">Edit</button>
                <button className="edit-btn px-1">Delete</button> */}
                <Image
                  src="/pencil.png" // Route of the image file
                  height={10} // Desired size with correct aspect ratio
                  width={25} // Desired size with correct aspect ratio
                  alt="Edit icon"
                  className="px-1"
                />
                <Image
                  src="/trash.png" // Route of the image file
                  height={10} // Desired size with correct aspect ratio
                  width={25} // Desired size with correct aspect ratio
                  alt="Delete icon"
                  className=""
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
            <tr className="text-sm">
              <th>#</th>
              <th>Species</th>
              <th>Format</th>
              <th>Dimensions</th>
              <th>Total BF.</th>
              <th>Entry Date</th>
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
