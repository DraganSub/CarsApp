import React from "react";
import { inject, observer } from "mobx-react";
import Navigation from "../../Components/Navigation";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import {Redirect} from "react-router-dom";
import VehicleMakeListStore from "../VehicleMake/VehicleMakeListStore.js";
import VehicleModelAddStore from "./VehicleModelAddStore.js";

class VehicleModelAddPage extends React.Component{
  constructor(props){
    super(props);
    this.props.vehicleMakeListStore.getVehicleMake(); 
  }

  render(){
    const addVehicle = this.props.addVehicle;
   
    return(  
      <React.Fragment>
        
        <AppBar position="relative" color="secondary">
          <Navigation /> 
        </AppBar>
        
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h3" align="center" color="textPrimary" className="add_title" gutterBottom>
            Add New Vehicle
          </Typography> 

          <form onSubmit={e => addVehicle.handleSubmit(e)}>
            {addVehicle.redirect ?
              <Redirect to="/listVehicles" />        
              :null
            }

            <select name="cars" id="cars" required  onChange={(event) => addVehicle.setBrand(event.target.value)}>
              <option className="select-option" value="">-- Choose your Car Brand --</option>
              {this.props.vehicleMakeListStore.vehiclesMake.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.brand}>{vehicle.brand}</option>
              ))}
            </select>
           
        
            <div className="form-floating">
              <input 
                type="number"
                name="cost"
                onChange={(event) => addVehicle.setCost(event.target.value)}
                placeholder="Add a vehicle cost"
                className="form-control"
                id="floatingcost"
                required
              />
              <label htmlFor="floatingcost">cost</label>
            </div>

            <div className="form-floating">
              <input
                type="text"
                name = "imageUrl"
                onChange={(event) => addVehicle.setImageUrl(event.target.value)}
                placeholder="Add a vehicle image url"
                className="form-control"
                id="floatingImageUrl"
                required
              />
              <label htmlFor="floatingImageUrl">ImageUrl</label>
            </div>

            <div className="form-floating">
              <input
                type="text"
                name = "model"
                onChange={(event) => addVehicle.setModel(event.target.value)}
                placeholder="Add a vehicle model"
                className="form-control"
                id="floatingModel"
                required
              />
              <label htmlFor="floatingModel">Model</label>
            </div>
      
            <button className="w-100 btn btn-lg btn-primary"> 
              Add vehicle
            </button>
          </form>
        </Container>
        
      </React.Fragment>
    );
  }
}

export default inject(rootStore => ({
  addVehicle: new VehicleModelAddStore(rootStore),
  vehicleMakeListStore: new VehicleMakeListStore(rootStore)
}))(observer(VehicleModelAddPage));