import React from "react";

export interface InputFieldProps {
  id?:             string;
  label?:          string;
  name?:           string;
  value:           string;
  hasError?:       boolean;
  errorMessage?:   string | undefined | null;
  multiline?:      boolean | undefined;
  containerClass?: string;

  onChange(value: string): void;
}

const InputField = (props: InputFieldProps) => (
  <React.Fragment>
    { props.label && <label className="p-2" htmlFor={props.id}>{props.label}:</label> }
    <div className={ `flex-grow flex flex-col ${props.containerClass}` }>
      { props.multiline ?
        <textarea
          className={ `border ${ props.hasError ? "border-red-700" : "border-gray-500"} rounded p-2` }
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={(e: React.FormEvent<HTMLTextAreaElement>) => props.onChange(e.currentTarget.value) }
          /> :
        <input
          type="text"
          id={props.id}
          name={props.name}
          value={props.value}
          className={ `border ${ props.hasError ? "border-red-700" : "border-gray-500"} rounded p-2` }
          onChange={(e: React.FormEvent<HTMLInputElement>) => props.onChange(e.currentTarget.value) }
          />
      }
      { props.hasError && <p className="font-sm font-bold text-red-700">{props.errorMessage}</p> }
    </div>
  </React.Fragment>
);

export default InputField;
