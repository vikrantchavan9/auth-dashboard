import React from 'react';

interface SubmitButtonProps {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => (
  <button
    type="submit"
    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
  >
    {label}
  </button>
);

export default SubmitButton;
