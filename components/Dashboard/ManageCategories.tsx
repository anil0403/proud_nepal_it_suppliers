import React, { useState, useCallback } from "react";
import Category from "./Table/Category";
import axios from "axios";
import useCategories from "@/hooks/useCategories";

const ManageCategories = () => {
  const { data: categories, mutate } = useCategories();

  const [category, setCategory] = useState("");
  // add new brandsetCategory
  const addNewCategory = useCallback(async () => {
    try {
      const newCategory = await axios.post("api/category/addCategory", {
        name: category,
      });
      mutate();
      console.log(` new category = ${newCategory}`);
      setCategory("");
    } catch (error) {
      console.log(error);
    }
  }, [category]);

  return (
    <div>
      <div className="border-b-2 p-2">
        <h2 className="text-lg font-bold text-gray-800 py-2">
          Add New Category
        </h2>
        <div className="flex gap-4 items-center flex-row py-2">
          <label htmlFor="name " className="font-semibold ">
            Enter Category Name
          </label>
          <input
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            type="text"
            className="bg-gray-300 outline-none px-2 py-1 rounded-lg  text-sx font-semibold "
          />
          <button
            onClick={addNewCategory}
            className="bg-gray-800 py-1 px-6 text-white rounded-lg hover:bg-gray-700"
          >
            Add
          </button>
        </div>
      </div>
      <div className=" flex items-center justify-cente">
        <div className="w-full">
          <h2 className="text-2xl mb-4 py-2 font-bold">Categories</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border text-left">S.N</th>
                <th className="py-2 px-4 border text-left">Name</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((item: any, i: number) => (
                <Category key={i + 1} sn={i} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
