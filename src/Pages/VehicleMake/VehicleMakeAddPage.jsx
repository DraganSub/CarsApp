import React from "react";
import { inject, observer } from "mobx-react";
import Navigation from "../../Components/Navigation";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import {Redirect} from "react-router-dom";
import VehicleMakeAddStore from "./VehicleMakeAddStore.js";
import VehicleMakeListStore from "./VehicleMakeListStore.js";


class VehicleMakeAddPage extends React.Component{
  constructor(props){
    super(props);
    this.props.vehicleMakeListStore.getVehicleMake();
  }

  componentDidMount(){

  }

  render(){
    const vehicleMakeAdd = this.props.vehicleMakeAddStore;
    
    return(  
      <div>
        <React.Fragment>

          <AppBar position="relative" color="secondary">
            <Navigation />
          </AppBar>

          <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" className="add_title" gutterBottom>
              Add New Vehicle Make
            </Typography> 

            <form onSubmit={e => vehicleMakeAdd.handleSubmit(e)}>
              <div className="form-floating">
                {vehicleMakeAdd.redirect ?     
                  <Redirect to="/listVehiclesMake" />
                  :null
                }

                <input
                  type="text"
                  name="brand"
                  onChange={(event) => vehicleMakeAdd.setBrand(event.target.value)}
                  placeholder="Add a vehicle brand"
                  className="form-control"
                  id="floatingBrand"
                />
                <label htmlFor="floatingBrand">Brand</label>
              </div>

              <button className="w-100 btn btn-lg btn-primary"> 
                Add vehicle Make
              </button>
            </form>
          </Container>

        </React.Fragment>
      </div>
    );
  }
}

export default inject(rootStore => ({
  vehicleMakeAddStore: new VehicleMakeAddStore(rootStore),
  vehicleMakeListStore: new VehicleMakeListStore(rootStore)
}))(observer(VehicleMakeAddPage));