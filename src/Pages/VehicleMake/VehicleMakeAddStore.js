import { makeObservable, observable, runInAction} from "mobx";
import {action} from "mobx";

import VehicleMakeService from "../../Common/VehicleMakeService.js";
import VehicleMakeListStore from "./VehicleMakeListStore";
class VehicleMakeAddStore{

  constructor(rootStore){
    makeObservable(this,{
      make:observable,
      redirect:observable,
      setMake:action,
      handleSubmit:action,
      redirectTrue:action
    });

    this.rootStore = rootStore;
    this.vehicleMakeService = new VehicleMakeService();
    this.vehicleMakeListStore = new VehicleMakeListStore();
    this.vehicleMakeListStore.getVehicleMake();
  }

  make="";
  redirect=false;

  redirectTrue(){
    this.redirect = true;
  }

  setMake = (make) =>{
    this.make = make;
  }

  handleSubmit = e => {
    e.preventDefault();
    const make = this.make;
    this.vehicleMakeService.addVehicleMake(make);
    e.target.reset();
    runInAction( () => {
      this.redirectTrue();
    });
  }
  
};

export default VehicleMakeAddStore;