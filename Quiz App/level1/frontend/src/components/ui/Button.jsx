import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  size = "medium",
  loading = false,
  disabled = false,
  icon,
  iconPosition = "right",
  onClick = () => {},
  loadingText = "Loading...",
}) => {
  const buttonClass = clsx("btn", size, { loading, disabled });

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled || loading}>
      {!loading && icon && iconPosition === "left" && <span className="btn-icon-left">{icon}</span>}
      <span>{loading ? loadingText : children}</span>
      {!loading && icon && iconPosition === "right" && <span className="btn-icon-right">{icon}</span>}
    </button>
  );
};

export default Button;
