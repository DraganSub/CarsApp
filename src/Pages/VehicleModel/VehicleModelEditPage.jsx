import { observer,inject } from "mobx-react";
import AppBar from "@material-ui/core/AppBar";
import Navigation from "../../Components/Navigation";
import React from "react";
import {Redirect } from "react-router-dom";
import VehicleModelListStore from "./VehicleModelListStore.js";
import VehicleModelEditStore from "./VehicleModelEditStore.js";
import VehicleMakeListStore from "../VehicleMake/VehicleMakeListStore.js";

class VehicleModelEditPage extends React.Component{

  constructor(props){
    super(props);
    this.props.vehiclesStore.getvehicle();
    this.props.editVehicleStore.redirectTo();
    const id = this.props.editVehicleStore.getIdFromUrl();
    this.props.editVehicleStore.getDetails(id);
    this.props.vehicleMakeListStore.getVehicleMake(); 
  }  



  render(){
       
    const editVehicleStore = this.props.editVehicleStore;

    return(

      <React.Fragment>
        
        <AppBar position="relative" color="secondary">
          <Navigation /> 
        </AppBar>

        <div className="container py-4" id="container-edit-page">
         
          <div key={editVehicleStore.carDetails.id} >
            <div>
              <h1 style={{textAlign:"center"}}>Edit Vehicle</h1>
              <form >
                {editVehicleStore.redirect ?  
                  <Redirect to="/listVehicles" />
                  :null
                }  
                <select name="cars" id="cars" value={editVehicleStore.carDetails.brand}  onChange={event => editVehicleStore.updateBrand(event.target.value)}>
                  {this.props.vehicleMakeListStore.vehiclesMake.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.brand}>{vehicle.brand}</option>
                  ))}  
                </select>


                <div className="form-floating">
                  <input 
                    type="number"
                    name="cost"
                    defaultValue={editVehicleStore.carDetails.cost}
                    onChange={event => editVehicleStore.updateCost(event.target.value)}
                    className="form-control"
                    id="costLabel"
                    required
                  />
                  <label htmlFor="costLabel">Cost</label>
                </div>

                <div className="form-floating">
                  <input 
                    type="text"
                    name="imageUrl"
                    defaultValue={editVehicleStore.carDetails.imageUrl}
                    onChange={event => editVehicleStore.updateImageUrl(event.target.value)}
                    required
                    className="form-control"
                    id="imageUrlLabel"
                  />
                  <label htmlFor="imageUrlLabel" style={{fontSize:"13px"}}>Image URL</label>
                </div>

                <div className="form-floating">
                  <input
                    type="text"
                    name = "model"
                    defaultValue={editVehicleStore.carDetails.model}                      
                    onChange={event => editVehicleStore.updateModel(event.target.value)}
                    className="form-control"
                    id="modelLabel"
                    required
                  />
                  <label htmlFor="modelLabel">Model</label>
                </div>
                 
                <button className="w-100 btn btn-lg btn-primary" onClick={(e)=>editVehicleStore.handleEdit(e)}> 
                  Edit vehicle
                </button>
              </form>
            </div>
          </div> 
        </div>
      </React.Fragment>
    );
  }
};

export default inject(rootStore => ({
  vehiclesStore: new VehicleModelListStore(rootStore),
  editVehicleStore: new VehicleModelEditStore(rootStore),
  vehicleMakeListStore: new VehicleMakeListStore(rootStore)

}))(observer(VehicleModelEditPage));