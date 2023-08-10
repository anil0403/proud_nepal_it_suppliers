import React from "react";

interface SelectInputProps {
  brands: any;
  value: any;
  onChange: any;
}

const SelectInput: React.FC<SelectInputProps> = ({
  brands,
  value,
  onChange,
}) => {
  return (
    <select
      className="block w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:border-blue-300"
      value={value}
      onChange={onChange}
    >
      {brands.map((brand: any) => (
        <option key={brand.id} value={brand.name}>
          {brand.name}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
