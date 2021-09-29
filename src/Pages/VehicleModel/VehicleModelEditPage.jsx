import { observer,inject } from "mobx-react";
import React from "react";
import {Redirect } from "react-router-dom";
import VehicleModelEditStore from "./VehicleModelEditStore.js";
import SelectForm from "../../Components/SelectForm";
import TextForm from "../../Components/TextForm";
import MainLayout from "../../Layouts/MainLayout";

class VehicleModelEditPage extends React.Component{


  render(){
       
    const editVehicleStore = this.props.editVehicleStore;

    return(
      <MainLayout>
        <div className="container py-4" id="container-edit-page">
          <div key={editVehicleStore.carDetails.id} >
            <div>
              <h1 style={{textAlign:"center"}}>Edit Vehicle</h1>
              <form >
                {editVehicleStore.redirect ?  
                  <Redirect to="/listVehicles" />
                  :null
                }  

                <SelectForm 
                  name="cars"
                  value={editVehicleStore.carDetails.make}
                  setData={editVehicleStore.updateMake}
                  optionPlaceholder = "-- Choose your Car Brand --"
                  list ={editVehicleStore.vehicleMakeListStore.vehiclesMake}

                />
                
                <TextForm 
                  type="number"
                  name="cost"
                  value={editVehicleStore.carDetails.cost}
                  setData={editVehicleStore.updateCost}
                />

                <TextForm 
                  name="imageUrl"
                  value={editVehicleStore.carDetails.imageUrl}
                  setData={editVehicleStore.updateImageUrl}
                />

                <TextForm 
                  name="model"
                  value={editVehicleStore.carDetails.model}
                  setData={editVehicleStore.updateModel}
                />
                 
                <button className="w-100 btn btn-lg btn-primary" onClick={(e)=>editVehicleStore.handleEdit(e)}> 
                  Edit vehicle
                </button>
              </form>
            </div>
          </div> 
        </div>
      </MainLayout>
    );
  }
};

export default inject(rootStore => ({
  editVehicleStore: new VehicleModelEditStore(rootStore),
}))(observer(VehicleModelEditPage));