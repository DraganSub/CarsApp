import { observer,inject } from "mobx-react";
import React from "react";
import { Redirect} from "react-router-dom";
import VehicleMakeEditStore from "./VehicleMakeEditStore.js";
import TextForm from "../../Components/TextForm";
import MainLayout from "../../Layouts/MainLayout";

class VehicleMakeEditPage extends React.Component{

  render(){
    const redirect = this.props.vehicleMakeEditStore.redirect;
    const vehicleMakeEdit = this.props.vehicleMakeEditStore;
    const vehicleMakeList = this.props.vehicleMakeEditStore.vehicleMakeListStore.vehiclesMake;
    return(
      
      <MainLayout>

  
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
                  <TextForm 
                    name="make"
                    value={vehicleMakeEdit.carMake.make}
                    setData={vehicleMakeEdit.updateMake}
                    placeholder="Edit Make"
                  />
                     
                  <button className="w-100 btn btn-lg btn-primary"> 
                    Edit
                  </button>
                </form>
              </div>
              : ""
          ))}
          
        </div>
      </MainLayout>
     
    );
  }
}
  
export default inject(rootStore => ({
  vehicleMakeEditStore: new VehicleMakeEditStore(rootStore),
}))(observer(VehicleMakeEditPage));