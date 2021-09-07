import React from "react";
import { inject, observer } from "mobx-react";
import { Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import  useStyles  from "../../Layouts/makeStyles.js";
import Container from "@material-ui/core/Container";
import Navigation from "../../Components/Navigation";
import Pagination from"../../Components/Pagination";
import SearchFilter from "../../Components/SearchFilter";
import SortingOptionsBox from "../../Components/MultipleSortingOptions";
import TableComponent from "../../Components/TableComponent";
import CardGridContainer from "../../Components/CardGridContainer";






class VehicleModelListPage extends React.Component{

  constructor(props){
    super(props);
    this.props.rootStore.vehiclesModelListStore.getvehicle();  

  }




  render(){
  
    const classes = useStyles;
    const vehicleStore = this.props.rootStore.vehiclesModelListStore;

    return(

      <div>
        <React.Fragment>
          
          <AppBar position="relative" color="secondary">
            <Navigation />  
          </AppBar>

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
              tableHeadRow={["Vehicle Brand","Vehicle Model", "Vehicle Cost","Options"]}
              elementsNum = {["brand","model","cost"]}
            />
            <Container className={classes.cardGrid} maxWidth="md">
              <CardGridContainer 
                currentDataList={vehicleStore.currentVehicles}
                pageLink={"listVehicles"}
                delete={vehicleStore.delete}
              />

              <Pagination 
                vehiclesPerPage={vehicleStore.vehiclesPerPage}
                totalVehicles={vehicleStore.filteredVehicles.length}
                setCurrentPage={vehicleStore.setCurrentPage}
              />
            </Container>

          </main>

        </React.Fragment>        
      </div>
    );
  }
}

export default inject("rootStore")(observer(VehicleModelListPage));