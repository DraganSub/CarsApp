import { makeObservable, observable, runInAction} from "mobx";
import {action} from "mobx";
import {v4 as uuidv4} from "uuid";
import VehicleMakeService from "../../Common/VehicleMakeService.js";


class VehicleMakeAddStore{

  constructor(rootStore){
    makeObservable(this,{
      brand:observable,
      redirect:observable,
      setBrand:action,
      handleSubmit:action,
      redirectTo:action,
      redirectTrue:action
    });

    this.rootStore = rootStore;
    this.vehicleMakeService = new VehicleMakeService();
  }

  vehicleMakeService;
  brand="";
  redirect=false;

  redirectTo(){
    this.redirect = false;
  }

  redirectTrue(){
    this.redirect = true;
  }

  setBrand(brand){
    this.brand = brand;
  }

  handleSubmit = e => {
    e.preventDefault();
    const id = uuidv4();
    const brand = this.brand;
    this.vehicleMakeService.addVehicleMake({id,brand,});
    e.target.reset();
    runInAction( () => {
      this.redirectTrue();
    });
  }
};

export default VehicleMakeAddStore;