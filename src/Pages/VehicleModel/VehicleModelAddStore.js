import { makeObservable,observable, runInAction} from "mobx";
import {action} from "mobx";
import {v4 as uuidv4} from "uuid";
import VehicleModelService from "../../Common/VehicleModelService.js";
import VehicleMakeListStore from "../VehicleMake/VehicleMakeListStore.js";


class VehicleModelAddStore{
      
  constructor(rootStore){
    this.rootStore = rootStore;

    this.vehicleModelService = new VehicleModelService();
    this.vehicleMakeListStore = new VehicleMakeListStore();
    this.vehicleMakeListStore.getVehicleMake();

    makeObservable(this,{ 
      make:observable,
      cost:observable,
      model:observable,
      imageUrl:observable,
      redirect:observable,
      setMake:action,
      setImageUrl:action,
      setModel:action,
      setCost:action,
    });

  }
  
  
  make =""
  cost=""
  model=""
  imageUrl= ""
  redirect= false

  redirectTrue(){
    this.redirect = true;
  }

  setMake = (make) =>{
    this.make = make;
  }

  setCost = (cost) => {
    this.cost = cost;
  }

  setModel = (model) => {
    this.model = model;
  }

  setImageUrl = (imgUrl) => {
    this.imageUrl = imgUrl;
  }


  handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    const id = uuidv4();
    const make = this.make;
    const cost = this.cost;
    const model = this.model;
    const imageUrl = this.imageUrl;
    this.vehicleModelService.addvehicle({id,make,cost,model,imageUrl});
    runInAction(() => {
      this.redirectTrue();
    });
     
  };
}

export default VehicleModelAddStore;