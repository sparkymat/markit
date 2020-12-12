import React, { FunctionComponent } from "react";

export interface ButtonProps {
  color:      string;
  type?:      "button" | "submit" | undefined;
  className?: string;
  disabled?:  boolean;
  onClick():  void;
}

const Button: FunctionComponent<ButtonProps> = (props) => {
  let bgColor = `bg-${props.color}-500`;
  let hoverBgColor = `bg-${props.color}-600`;

  if (props.disabled) {
    bgColor = "bg-gray-300";
    hoverBgColor = "bg-gray-300";
  }

  let className = `text-lg ${bgColor} hover:bg-${hoverBgColor} ${ props.disabled ? "" : "shadow hover:shadow-inner"} text-white font-bold font-mono p-2 rounded ${props.className}`;

  return (
    <button
      type      = { props.type === undefined ? "button" : props.type }
      className = { className                                        }
      onClick   = { props.disabled ? () => {} : props.onClick        }
      >
      { props.children }
    </button>
  );
};

export default Button;
