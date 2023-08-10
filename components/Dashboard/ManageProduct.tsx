import React, { useState } from "react";
import AddProduct from "./Product/AddProduct";

const ManageProduct = () => {
  const [activeTab, setActiveTab] = useState("all_products");

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-bold text-gray-800 pb-2">Manage Products</h2>
      <div className="flex flex-row gap-10 w-full">
        <button
          className={`px-4 py-2 rounded-md font-semibold w-[50%] ${
            activeTab === "all_products"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("all_products")}
        >
          All Products
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold w-[50%] ${
            activeTab === "add"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("add")}
        >
          Add products
        </button>
      </div>
      {activeTab === "add" && (
        <div className="my-2">
          <h2 className="py-2 font-semibold text-medium">
            Enter details to add product{" "}
            <span className="italic text-yellow-500 px-1 text-xs">
              (Note: Small Sized Image Recommended)
            </span>
          </h2>
          <AddProduct />
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
