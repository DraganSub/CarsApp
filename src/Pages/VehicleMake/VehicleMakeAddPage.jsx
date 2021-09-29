import React from "react";
import { inject, observer } from "mobx-react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {Redirect} from "react-router-dom";
import VehicleMakeAddStore from "./VehicleMakeAddStore.js";
import TextForm from "../../Components/TextForm";
import MainLayout from "../../Layouts/MainLayout";



class VehicleMakeAddPage extends React.Component{

  render(){
    const vehicleMakeAdd = this.props.vehicleMakeAddStore;

    return(  
      <div>
      
        <MainLayout>

          <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" className="add_title" gutterBottom>
              Add New Vehicle Make
            </Typography> 

            <form onSubmit={e => vehicleMakeAdd.handleSubmit(e)}>
              {vehicleMakeAdd.redirect ?     
                <Redirect to="/listVehiclesMake" />
                :null
              }
                  
              <TextForm 
                name="make"
                setData={vehicleMakeAdd.setMake}
                placeholder="Add Vehicle Make"
              />

              <button className="w-100 btn btn-lg btn-primary"> 
                Add vehicle Make
              </button>
            </form>
          </Container>
        </MainLayout>
        
      </div>
    );
  }
}

export default inject(rootStore => ({
  vehicleMakeAddStore: new VehicleMakeAddStore(rootStore)
}))(observer(VehicleMakeAddPage));