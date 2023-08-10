import React, { useState } from "react";
import Input from "./Input/Input";
import useBrands from "@/hooks/useBrands";
import useCategories from "@/hooks/useCategories";
import CheckBoxInput from "./Input/CheckBoxInput";
import { ImCross } from "react-icons/im";
import axios from "axios";

const AddProduct = () => {
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(Number);
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState(Number);
  const [total, setTotal] = useState(Number);
  const [stock, setStock] = useState(Number);
  const [features, setFeatures] = useState("");
  const [tag, setTag] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");

  // store categories
  const [checkedValues, setCheckedValues] = useState<string[]>([]); // Provide the type here
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCheckedValues((prevValues) => [...prevValues, value]);
    } else {
      setCheckedValues((prevValues) =>
        prevValues.filter((item) => item !== value)
      );
    }
  };

  // store features
  const [featuresArray, setFeaturesArray] = useState<string[]>([]);
  const featuresArrayHandler = () => {
    setFeaturesArray((prevValues) => [...prevValues, features]);
    setFeatures("");
  };

  // remove features
  const featureArrayRemover = (feature: any) => {
    console.log(feature);
    setFeaturesArray((prevValues) =>
      prevValues.filter((item) => item !== feature)
    );
  };

  console.log(checkedValues);
  console.log(brand);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("brand", brand);
    formData.append("discount", discount.toString());
    formData.append("total", total.toString());
    formData.append("stock", stock.toString());
    formData.append("thumbnail", thumbnail);
    formData.append("img1", img1);
    formData.append("img2", img2);
    formData.append("img3", img3);
    formData.append("categoriesIds", JSON.stringify(checkedValues));
    formData.append("features", JSON.stringify(featuresArray));

    try {
      const response = await axios.post("/api/product/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      encType="multipart/form-data"
      className="border-2 p-4 rounded-lg border-gray-800"
    >
      <div>
        <Input
          onChange={(e: any) => setName(e.target.value)}
          value={name}
          name="Name"
          type="text"
          required
        />
        <div className="flex flex-row gap-5 flex-wrap items-center my-3">
          <Input
            onChange={(e: any) => setPrice(e.target.value)}
            value={price}
            name="Price"
            type="number"
            required
          />
          <Input
            onChange={(e: any) => setDiscount(e.target.value)}
            value={discount}
            name="Discount in %"
            type="number"
          />
          <Input value={total} name="Total" disabled type="number" />
          <Input
            onChange={(e: any) => setStock(e.target.value)}
            value={stock}
            name="Stock"
            type="number"
          />
        </div>
        {/* features */}
        <div className="flex flex-row items-start gap-5 my-3">
          <Input
            onChange={(e: any) => setFeatures(e.target.value)}
            value={features}
            name="Features"
            type="text"
          />
          <button
            onClick={featuresArrayHandler}
            className="px-4 py-1 my-1 text-white bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            Add
          </button>
          <div className="px-5 border-2 border-gray-800 rounded-md w-2/4 my-1">
            {<h2 className="font-semibold">Features: </h2>}
            <ol className="flex flex-row flex-wrap gap-5 py-2">
              {featuresArray.map((feature) => (
                <div className="text-xs font-semibold flex flex-row items-center gap-3 border-2 border-gray-800 rounded-md  px-2 py-1">
                  <li>{feature}</li>
                  <li onClick={() => featureArrayRemover(feature)}>
                    <ImCross
                      className="cursor-pointer p-2 rounded-md hover:bg-gray-800 hover:text-white"
                      size={25}
                    />
                  </li>
                </div>
              ))}
            </ol>
          </div>
        </div>
        {/* tags */}

        <div className="flex flex-row flex-2 justify-start gap-5 items-start">
          {/* brand */}
          <div>
            <h2 className="font-semibold py-2">Select The Brand</h2>
            <select
              name="brand"
              id="brand"
              className="border-2 text-medium font-semibold border-gray-800 rounded-md overflow-y-auto"
              onChange={(e) => setBrand(e.target.value)}
            >
              <option
                className="font-semibold text-xs"
                value=""
                disabled
                defaultValue="Choose Brand"
              >
                Choose Brand
              </option>
              {brands?.map((brand: any) => {
                return (
                  <option
                    className="font-semibold text-xs"
                    key={brand?.id}
                    value={brand?.id}
                  >
                    {brand?.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* category */}
          <div className="flex-1">
            <h2 className="font-semibold py-2">Check the category:</h2>
            <div className="w-full py-1 flex flex-row gap-5 flex-wrap ">
              {categories?.map((category: any, i: number) => (
                <CheckBoxInput
                  key={category?.id}
                  category={category}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center flex-wrap my-3">
        <Input
          onChange={(e: any) => setThumbnail(e.target.files[0])}
          name="Thumbnail Image"
          type="file"
          required
          accept="image/*"
        />
        <Input
          onChange={(e: any) => setImg1(e.target.files[0])}
          name="Additional Image 1"
          type="file"
          required
          accept="image/*"
        />
        <Input
          onChange={(e: any) => setImg2(e.target.files[0])}
          name="Additional Image 2"
          type="file"
          accept="image/*"
        />
        <Input
          onChange={(e: any) => setImg3(e.target.files[0])}
          name="Additional Image 3"
          type="file"
          accept="image/*"
        />
      </div>

      <button className="w-full my-3 py-1 bg-gray-800 rounded-md text-white font-semibold hover:bg-gray-700">
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
