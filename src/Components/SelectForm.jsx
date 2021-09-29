
import React from "react";

function SelectForm(props){
  return (
    <select name={props.name} 
      id={props.name}
      required  
      onChange={(event) => props.setData(event.target.value)}
      value={props.value ? props.value : undefined }
    >
      <option className="select-option" value= "">
        {props.optionPlaceholder}
      </option>

      {props.list.map((item) => (
        <option key={item.key} value={item.uid}>
          {item.make}
        </option>
      ))}
    </select>
  );
}

export default SelectForm;