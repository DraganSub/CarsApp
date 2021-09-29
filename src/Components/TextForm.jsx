import React from "react";

function TextForm(props){
  return (
    <div className="form-floating">
      <input 
        type={props.type ? props.type : "text" }
        name={props.name}
        defaultValue={props.value}
        onChange={event => props.setData(event.target.value)}
        placeholder={props.placeholder}
        className="form-control"
        id={"floating"+props.name}
        required
      />
      <label htmlFor={"floating"+props.name}>{props.placeholder}</label>
    </div>
  );
}

export default TextForm;