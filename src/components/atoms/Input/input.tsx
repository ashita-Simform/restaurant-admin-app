import * as React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/es/input';

/**
 * Props for the InputAtom component.
 * @property {string} [label] - The label for the input field.
 * @property {React.ReactNode} [prefix] - The prefix element for the input field.
 * @property {"light" | "dark"} [theme="dark"] - The theme for the input field.
 */
interface FormInputProps extends InputProps {
  label?: string;
  prefix?: React.ReactNode;
  theme?: 'light' | 'dark';
}

/**
 * A reusable input component designed for form handling.
 * It supports theming, optional labels, and a prefix for the input field.
 *
 * @param {FormInputProps} props - The properties for the input component.
 * @param {string} [props.label] - An optional label displayed above the input field.
 * @param {React.ReactNode} [props.prefix] - An optional prefix element displayed inside the input field.
 * @param {'dark' | 'light'} [props.theme='dark'] - The theme of the input field, either 'dark' or 'light'.
 * @param {InputProps} rest - Additional properties passed to the input element.
 *
 * @returns {JSX.Element} A styled input field with optional label and prefix.
 */
const InputAtom: React.FC<FormInputProps> = ({
  label,
  prefix,
  theme = 'dark',
  ...rest
}: FormInputProps): React.JSX.Element => {
  return (
    <div className={`form ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <Input
        {...rest}
        prefix={prefix}
        className={`input-field ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-300'
        }`}
      />
    </div>
  );
};

export default InputAtom;
