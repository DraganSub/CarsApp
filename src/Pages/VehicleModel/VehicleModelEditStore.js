
import { makeObservable, observable, runInAction} from "mobx";
import {action} from "mobx";
import VehicleModelService from "../../Common/VehicleModelService.js";
import VehicleMakeListStore from "../VehicleMake/VehicleMakeListStore.js";
import VehicleModelListStore from "./VehicleModelListStore.js";


class VehicleModelEditStore {

  constructor(rootStore){
    this.rootStore = rootStore;
   

    makeObservable(this,{ 
      make:observable,
      carDetails:observable,
      cost:observable,
      redirect:observable,
      model:observable,
      imageUrl:observable,
      updateMake:action,
      updateCost:action,
      updateModel:action,
      updateImageUrl:action,
      getIdFromUrl:action,
      getDetails:action,

      
    });

    this.vehicleModelService = new VehicleModelService();
    this.vehicleModelListStore = new VehicleModelListStore();
    this.vehicleMakeListStore = new VehicleMakeListStore();
    
    this.vehicleModelListStore.getvehicle();
    this.vehicleMakeListStore.getVehicleMake(); 

    const id = this.getIdFromUrl();
    this.getDetails(id);
    
  }



      carDetails = "";
      make=this.carDetails.make || "";
      cost=this.carDetails.cost  || "";
      model=this.carDetails.model  || "";
      imageUrl= this.carDetails.imageUrl  || "";
      redirect= false

      
  updateMake = (makeValue) => {
    this.carDetails.make = makeValue;
  }

  redirectTrue(){
    this.redirect = true;
  }

  updateCost = (costValue) => {
    this.carDetails.cost = costValue;
  }

  updateModel = (modelValue) => {
    this.carDetails.model = modelValue;
  }

  updateImageUrl = (imgUrlValue) => {
    this.carDetails.imageUrl =  imgUrlValue;
  }


  handleEdit = e => {
    e.preventDefault();
    const id = this.getIdFromUrl();
    const make = this.carDetails.make;
    const cost = this.carDetails.cost;
    const model = this.carDetails.model;
    const imageUrl = this.carDetails.imageUrl;
    this.vehicleModelService.update(id,{id,make,cost,model,imageUrl});
    runInAction(() => {
      this.redirectTrue();
    });
  }

  getIdFromUrl= () =>{
    const str = window.location.pathname;
    const char = str.split("/");
    const id = char[2];
    return id;
  }; 

  getDetails(id) {
    this.vehicleModelService.getDetails(id,data => this.carDetails = data);
  }

    
};

export default VehicleModelEditStore;