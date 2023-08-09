import React, { useState, useCallback } from "react";
import useBrands from "@/hooks/useBrands";
import Brand from "./Brand/Brand";
import axios from "axios";

const ManageBrands = () => {
  const { data: brands, mutate } = useBrands();

  const [brand, setBrand] = useState("");
  // add new brand
  const addNewBrand = useCallback(async () => {
    try {
      const newBrand = await axios.post("api/brand/addBrand", {
        name: brand,
      });
      mutate();
      console.log(` new brand = ${newBrand}`);
      setBrand("");
    } catch (error) {
      console.log(error);
    }
  }, [brand]);

  return (
    <div>
      <div className="border-b-2 p-2">
        <h2 className="text-lg font-bold text-gray-800 py-2">Add New Brand</h2>
        <div className="flex gap-4 items-center flex-row py-2">
          <label htmlFor="name " className="font-semibold ">
            Enter Brand Name
          </label>
          <input
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            type="text"
            className="bg-gray-300 outline-none px-2 py-1 rounded-lg  text-sx font-semibold "
          />
          <button
            onClick={addNewBrand}
            className="bg-gray-800 py-1 px-6 text-white rounded-lg hover:bg-gray-700"
          >
            Add
          </button>
        </div>
      </div>
      <div className=" flex items-center justify-cente">
        <div className="w-full">
          <h2 className="text-2xl mb-4">Brands</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">S.N</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {brands?.map((item: any, i: number) => (
                <Brand key={i + 1} sn={i} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBrands;
