import React from "react";
import { inject, observer } from "mobx-react";
import { Link} from "react-router-dom";
import Pagination from"../../Components/Pagination";
import SearchFilterInput from "../../Components/SearchFilter";
import SortOption from "../../Components/SortingOptions";
import TableComponent from "../../Components/TableComponent";
import VehicleMakeListStore from "./VehicleMakeListStore";
import MainLayout from "../../Layouts/MainLayout";




class VehicleMakeListPage extends React.Component{



  render(){

    const vehiclesMake = this.props.vehicleMakeListStore;

    return(

      <MainLayout>
       
        <div className="vehicleMake-addBtn">
          <Link to={"/addVehiclesMake"} >
            <button className="vehicleMake-list-addBtn">
              Add Vehicle Make
            </button>
          </Link>
        </div>
   
        <div>
          <SearchFilterInput 
            onChange={vehiclesMake.changeSearchText}
            placeholder="Search vehicle by make"
            searchText={vehiclesMake.searchText}
          />
        </div>

        <div className="vehicleMake-sortContainer">
          <SortOption onSort={vehiclesMake.setSortElements} sortBy="make" />
        </div>
  
        <div className="vehicleMake-list-container">

          <TableComponent 
            currentDataList ={vehiclesMake.currentVehiclesMakeList}
            delete={vehiclesMake.delete}
            pageLink="listVehiclesMake"
            tableHeadRow={["Id","Make","Options"]}
            elementsNum ={["uid","make",]}
          />
         
          <Pagination 
            vehiclesPerPage={vehiclesMake.vehiclesPerPage}
            totalVehicles={vehiclesMake.filteredVehiclesMakeList.length}
            setCurrentPage={vehiclesMake.setCurrentPage}
          />
        </div>
      </MainLayout>
        
    );
  }
}

export default inject(rootStore => ({
  vehicleMakeListStore: new VehicleMakeListStore(rootStore),
}))(observer(VehicleMakeListPage));