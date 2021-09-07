import React from "react";
import { inject, observer } from "mobx-react";
import { Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Navigation from "../../Components/Navigation";
import Pagination from"../../Components/Pagination";
import SearchFilterInput from "../../Components/SearchFilter";
import SortOption from "../../Components/SortingOptions";
import TableComponent from "../../Components/TableComponent";




class VehicleMakeListPage extends React.Component{

  constructor(props){
    super(props);
    this.props.rootStore.vehicleMakeListStore.getVehicleMake(); 
  }

  render(){

    const vehiclesMake = this.props.rootStore.vehicleMakeListStore;

    return(

      <React.Fragment>
      
        <AppBar position="relative" color="secondary">
          <Navigation />
        </AppBar>

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
          <SortOption onSort={vehiclesMake.setSortElements} sortBy="brand" />
        </div>
  
        <div className="vehicleMake-list-container">

          <TableComponent 
            currentDataList ={vehiclesMake.currentVehiclesMakeList}
            delete={vehiclesMake.delete}
            pageLink="listVehiclesMake"
            tableHeadRow={["Vehicle Make Id","Vehicle Make Brand","Options"]}
            elementsNum ={["id","brand"]}
          />
         
          <Pagination 
            vehiclesPerPage={vehiclesMake.vehiclesPerPage}
            totalVehicles={vehiclesMake.filteredVehiclesMakeList.length}
            setCurrentPage={vehiclesMake.setCurrentPage}
          />
        </div>

      </React.Fragment>        
    );
  }
}

export default inject("rootStore")(observer(VehicleMakeListPage));