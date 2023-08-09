import React, { useCallback, useState } from "react";
import axios from "axios";
import useBrands from "@/hooks/useBrands";

interface BrandProps {
  item: any;
  sn: number;
}
const Category: React.FC<BrandProps> = ({ item, sn }) => {
  const { mutate } = useBrands();
  const [active, setActive] = useState(false);
  const [name, setName] = useState(item.name);

  const activeHandler = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  // delete brand
  const deleteBrandHandler = useCallback(async (id: any) => {
    try {
      const deletedBrand = await axios.post("api/brand/removeBrand", {
        id: id,
      });
      console.log(deletedBrand);
      mutate();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // update brand
  const updateBrandHandler = useCallback(
    async (id: any) => {
      try {
        const updatedBrand = await axios.post("api/brand/updateBrand", {
          id: id,
          name: name,
        });
        mutate();
        activeHandler();
      } catch (error) {
        console.log(error);
      }
    },
    [name]
  );
  // update brand
  return (
    <tr className="transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md">
      <td className="py-2 px-4 border">{sn + 1}</td>
      <td className="py-2 px-4 border">
        <input
          className="bg-white"
          type="text"
          onChange={(e) => setName(e.target.value)}
          disabled={!active}
          value={name}
        />
      </td>
      <td className="py-2 px-4 border flex flex-row gap-5 justify-center">
        <button
          onClick={active ? () => updateBrandHandler(item.id) : activeHandler}
          className={` ${
            !active ? "bg-yellow-600" : "bg-green-600"
          }    px-5 py-1 rounded-lg text-white font-semibold  ${
            !active ? "hover:bg-yellow-500 " : "hover:bg-green-500"
          }`}
        >
          {!active ? "Edit" : "Modify"}
        </button>
        <button
          onClick={() => deleteBrandHandler(item.id)}
          className="bg-red-600 px-5 py-1 rounded-lg text-white font-semibold hover:bg-red-500"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Category;
