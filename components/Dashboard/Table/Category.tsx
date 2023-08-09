import React, { useCallback, useState } from "react";
import axios from "axios";
import useBrands from "@/hooks/useBrands";
import useCategories from "@/hooks/useCategories";

interface CategoryProps {
  item: any;
  sn: number;
}
const Brand: React.FC<CategoryProps> = ({ item, sn }) => {
  const { mutate } = useCategories();

  const [active, setActive] = useState(false);
  const [name, setName] = useState(item.name);

  const activeHandler = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  // delete category
  const deleteCategoryHandler = useCallback(async (id: any) => {
    try {
      const deletedCategory = await axios.post("api/category/removeCategory", {
        id: id,
      });
      console.log(deletedCategory);
      mutate();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // update category
  const updateCategoryHandler = useCallback(
    async (id: any) => {
      try {
        const updatedCategory = await axios.post(
          "api/category/updateCategory",
          {
            id: id,
            name: name,
          }
        );
        mutate();
        activeHandler();
        console.log(updatedCategory);
      } catch (error) {
        console.log(error);
      }
    },
    [name]
  );
  
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
          onClick={
            active ? () => updateCategoryHandler(item.id) : activeHandler
          }
          className={` ${
            !active ? "bg-yellow-600" : "bg-green-600"
          }    px-5 py-1 rounded-lg text-white font-semibold  ${
            !active ? "hover:bg-yellow-500 " : "hover:bg-green-500"
          }`}
        >
          {!active ? "Edit" : "Modify"}
        </button>
        <button
          onClick={() => deleteCategoryHandler(item.id)}
          className="bg-red-600 px-5 py-1 rounded-lg text-white font-semibold hover:bg-red-500"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Brand;
