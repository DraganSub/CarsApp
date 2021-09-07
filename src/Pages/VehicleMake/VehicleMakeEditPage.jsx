import { observer,inject } from "mobx-react";
import AppBar from "@material-ui/core/AppBar";
import Navigation from "../../Components/Navigation";
import React from "react";
import { Redirect} from "react-router-dom";
import VehicleMakeEditStore from "./VehicleMakeEditStore.js";
import VehicleMakeListStore from "./VehicleMakeListStore.js";

class VehicleMakeEditPage extends React.Component{
  constructor(props){
    super(props);
    this.props.vehicleMakeListStore.getVehicleMake();
    const id = this.props.vehicleMakeEditStore.getIdFromUrl();
    this.props.vehicleMakeEditStore.getDetails(id);
  }  
  

  render(){
    const redirect = this.props.vehicleMakeEditStore.redirect;
    const vehicleMakeEdit = this.props.vehicleMakeEditStore;
    const vehicleMakeList = this.props.vehicleMakeListStore.vehiclesMake;
    return(
      <React.Fragment>
      
        <AppBar position="relative" color="secondary">
          <Navigation /> 
        </AppBar>
  
        <div className="container py-12" id="container-edit-page">

          {vehicleMakeList.map(vehicle => ( 
            (vehicleMakeEdit.getIdFromUrl() === vehicle.key ) ?

             
  
              <div key={vehicle.key}  className="col-md-12" id="edit-form-input">
                <h1 style={{textAlign:"center"}}>Edit Vehicle</h1>

                <form onSubmit={(e)=>vehicleMakeEdit.handleEdit(e)}>
                  {redirect ?
                    <Redirect to="/listVehiclesMake" />
                    :null
                  }
                  <div className="form-floating">
                    <input
                      type="text"
                      name="brand"
                      value={vehicleMakeEdit.carBrand.brand}
                      onChange={event => vehicleMakeEdit.updateBrand(event.target.value)}
                      className="form-control"
                      id="brandLabel"
                    />
                    <label htmlFor="brandLabel">Brand</label>
                  </div>
  
                     
                  <button className="w-100 btn btn-lg btn-primary"> 
                    Edit
                  </button>
                </form>
              </div>
              : ""
          ))}
        </div>
        
      </React.Fragment>
    );
  }
}
  
export default inject(rootStore => ({
  vehicleMakeListStore: new VehicleMakeListStore(rootStore),
  vehicleMakeEditStore: new VehicleMakeEditStore(rootStore),
}))(observer(VehicleMakeEditPage));