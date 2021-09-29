import React from "react";
import { inject, observer } from "mobx-react";
import { Link} from "react-router-dom";
import  useStyles  from "../../Layouts/makeStyles.js";
import Container from "@material-ui/core/Container";
import Pagination from"../../Components/Pagination";
import SearchFilter from "../../Components/SearchFilter";
import SortingOptionsBox from "../../Components/MultipleSortingOptions";
import TableComponent from "../../Components/TableComponent";
import CardGridContainer from "../../Components/CardGridContainer";
import VehicleModelListStore from "./VehicleModelListStore.js";
import MainLayout from "../../Layouts/MainLayout.jsx";






class VehicleModelListPage extends React.Component{

  render(){
  
    const classes = useStyles;
    const vehicleStore = this.props.listVehicleStore;

    return(
      <MainLayout>
        <main>
          <div className="vehicleModel-addBtn">
            <Link to={"/addVehicles"} >
              <button className="vehicleModel-list-addBtn">
                Add Vehicle Model
              </button>
            </Link>
          </div>
          <SearchFilter 
            onChange={vehicleStore.changeSearchText}
            placeholder="search"
            searchText={vehicleStore.searchText}
          />

          <SortingOptionsBox onSort ={vehicleStore.setSortElements} />

          <TableComponent 
            currentDataList={vehicleStore.currentVehicles}
            delete={vehicleStore.delete}
            pageLink="listVehicles"
            tableHeadRow={["Vehicle Make","Vehicle Model", "Vehicle Cost","Options"]}
            elementsNum = {["make","model","cost"]}
            mapFunc={vehicleStore.checkByKey}
          />
          
          <Container className={classes.cardGrid} maxWidth="md">
            <CardGridContainer 
              currentDataList={vehicleStore.currentVehicles}
              pageLink={"listVehicles"}
              delete={vehicleStore.delete}
              elementsNum={["make","model","cost"]}
            />

            <Pagination 
              vehiclesPerPage={vehicleStore.vehiclesPerPage}
              totalVehicles={vehicleStore.filteredVehicles.length}
              setCurrentPage={vehicleStore.setCurrentPage}
            />
            
          </Container>
        </main>
      </MainLayout>
    );
  }
}

export default inject(rootStore => ({
  listVehicleStore: new VehicleModelListStore(rootStore),
}))(observer(VehicleModelListPage));