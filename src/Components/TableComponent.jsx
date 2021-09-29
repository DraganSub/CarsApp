import React from "react";
import { Link} from "react-router-dom";
import {v4 as uuidv4} from "uuid";


const TableComponent = (props) =>{
  const tableHeadRow = props.tableHeadRow;
  const headList = tableHeadRow.map(row => (
    <th key={uuidv4()}>{row}</th>
  ));
  return (
    <div className="table-container">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            {headList}
          </tr>
        </thead> 
        <tbody>
          {props.currentDataList.map(data => (
            <tr key={data.key}>
              {props.elementsNum.map(i =>(
                <td key={uuidv4()} className={"table"+i}>{data[i] }</td>
              ))}
              <td>
                <Link to={`/${props.pageLink}/${data.key}` } >
                  <button className="vehicleMake-editBtn">
                    Edit
                  </button>
                </Link>
                <button className="vehicleMake-deleteBtn" onClick={() => props.delete(data.key)}>
                  Delete
                </button>
              </td>                     
            </tr>          
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;