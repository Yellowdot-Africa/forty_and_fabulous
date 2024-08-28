import React, { ChangeEvent } from 'react';

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value?: string; // Add this line
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readOnly? :boolean
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = 'text',
  required = false,
  placeholder = '',
  value,
  onChange,
  readOnly
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-bold mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default TextInput;
