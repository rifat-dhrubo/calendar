import React from 'react';

type Props = {
  children: React.ReactNode;
  name: string;
  error?: boolean;
  labelText: string;
  errorMessage?: string;
  wrapperClass?: string;
};

const FormSelect: React.FC<Props> = ({
  error,
  name,
  errorMessage,
  labelText,
  children,
  wrapperClass,
}) => {
  return (
    <div className={wrapperClass}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {labelText}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">{children}</div>
      {error ? (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

export default FormSelect;
