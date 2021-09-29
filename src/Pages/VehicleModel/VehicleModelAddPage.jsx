import React from "react";
import { inject, observer } from "mobx-react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {Redirect} from "react-router-dom";
import VehicleModelAddStore from "./VehicleModelAddStore.js";
import SelectForm from "../../Components/SelectForm";
import TextForm from "../../Components/TextForm";
import MainLayout from "../../Layouts/MainLayout";

class VehicleModelAddPage extends React.Component{


  render(){

    const vehicleModelAddStore = this.props.vehicleModelAddStore;
    
    return(  
    
      <MainLayout>
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h3" align="center" color="textPrimary" className="add_title" gutterBottom>
            Add New Vehicle
          </Typography> 

          <form onSubmit={e => vehicleModelAddStore.handleSubmit(e)}>
            {vehicleModelAddStore.redirect ?
              <Redirect to="/listVehicles" />        
              :null
            }

            <SelectForm 
              name="cars"
              setData={vehicleModelAddStore.setMake}
              optionPlaceholder = "-- Choose your Car Brand --"
              list={vehicleModelAddStore.vehicleMakeListStore.vehiclesMake}
            />

            <TextForm 
              name="cost"
              setData={vehicleModelAddStore.setCost}
              placeholder="Cost"
              type="number"
            />
           
            <TextForm 
              name = "imageUrl"
              setData = {vehicleModelAddStore.setImageUrl}
              placeholder = "Image Url"
            />

            <TextForm
              name="model"
              setData = {vehicleModelAddStore.setModel}
              placeholder = "Model"
            />
      
            <button className="w-100 btn btn-lg btn-primary"> 
              Add vehicle
            </button>
          </form>
        </Container>
      </MainLayout>
    );
  }
}

export default inject(rootStore => ({
  vehicleModelAddStore: new VehicleModelAddStore(rootStore),
}))(observer(VehicleModelAddPage));