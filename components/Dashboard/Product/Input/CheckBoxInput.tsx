import React from "react";

interface CheckBoxInputProps {
  category: any;
  onChange: any;
}

const CheckBoxInput: React.FC<CheckBoxInputProps> = ({ category, onChange }) => {
  return (
    <>
      <label className="text-md font-semibold flex flex-row items-center gap-2">
        <input
          type="checkbox"
          name={category?.name}
          value={category?.name}
          onChange={onChange}
        
        />
        {category?.name}
      </label>
    </>
  );
};

export default CheckBoxInput;
