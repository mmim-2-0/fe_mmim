import React, { useState, useImperativeHandle } from "react";

export const InputBox = React.forwardRef(
  (
    {
      className,
      labelText,
      labelClass,
      labelStyle,
      inputClass,
      inputStyle,
      placeholder,
      errorText,
      errorClass,
      errorStyle,
      onSubmit,
      onChange,
    },
    ref
  ) => {

    const [value, setValue] = useState("");
    const _onChange = ({ target: { value } }) => {
      setValue(value);
      onChange?.(value);
    };

    useImperativeHandle(ref, () => ({
      setValue,
    }));
    console.log(value)
    
    return (
      <div className={className}>
        <p className={labelClass} style={labelStyle}>
          {labelText}
        </p>
        <input
          className={inputClass}
          style={inputStyle}
          type="text"
          placeholder={placeholder}
          value={value}
          onSubmit={onSubmit}
          onChange={_onChange}
        />

        <p className={errorClass} style={errorStyle}>
          {errorText}
        </p>
      </div>
    );
  }
);
