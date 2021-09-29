import React from "react";

const Pagination = (props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalVehicles / props.vehiclesPerPage); i++) {
    pageNumbers.push(i);
  }
  return( 
    
    <div className="d-flex justify-content-center" id="pagination">
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => props.setCurrentPage(number)} className='page-link pagination-btn'>
              {number}
            </button> 
          </li>
        ))}
      </ul>   
    </div>
  );
};
export default Pagination;