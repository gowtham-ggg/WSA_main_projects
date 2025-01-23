import React from "react";
import clsx from "clsx";
import CustomDatePicker from "./CustomDatePicker";

const InputField = ({
  name,
  label,
  type,
  inputImg,
  placeholder,
  claasName,
  value,
  onChange,
}) => {
  return (
    <div className={clsx("input-field-container", claasName)}>
      <p className="input-label">{label}</p>
      <div
        className={clsx(
          "input-wrapper",
          type === "textarea" && "textarea-wrapper"
        )}
      >
        {inputImg && (
          <img src={inputImg} className="input-field-img" alt={`${label} icon`} />
        )}

        {type === "date" ? (
          <CustomDatePicker name={name} date={value} onDateChange={onChange} />
        ) : type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="textarea-field-input"
            rows={4}
          />
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="input-field-input"
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
