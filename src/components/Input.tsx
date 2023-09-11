import React from "~/pages";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <input
      className="h-10 w-[90%] max-w-[400px] rounded-xl px-4"
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      type="text"
    />
  );
};

export default Input;
