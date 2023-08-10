import React from "react";
interface InputProps {
  name: String;
  type: String;
  disabled?: boolean;
  onChange?: any;
  value?: any;
  required?: any;
  accept?: any;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  disabled,
  onChange,
  value,
  required,
  accept,
}) => {
  return (
    <div className="flex flex-row gap-3 items-center my-2">
      <label className="font-semibold">{name} </label>
      <input
        type={`${type}`}
        className="flex-grow outline-none bg-gray-300 rounded-md px-2 py-1 text-xs font-semibold text-gray-800"
        disabled={disabled}
        onChange={onChange}
        value={value}
        required={required}
        accept={accept}
      />
    </div>
  );
};

export default Input;
