import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>
);

export default InputField;
