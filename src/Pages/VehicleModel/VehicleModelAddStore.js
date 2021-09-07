import { makeObservable,observable, runInAction} from "mobx";
import {action} from "mobx";
import {v4 as uuidv4} from "uuid";
import VehicleModelEditStore from "./VehicleModelEditStore.js";
import VehicleModelService from "../../Common/VehicleModelService.js";


class VehicleModelAddStore{
      
  constructor(rootStore){
    this.rootStore = rootStore;

    this.vehicleModelEditStore = new VehicleModelEditStore();
    this.vehicleModelService = new VehicleModelService();

    makeObservable(this,{ 
      brand:observable,
      cost:observable,
      model:observable,
      imageUrl:observable,
      redirect:observable,
      setBrand:action,
      setImageUrl:action,
      setModel:action,
      setCost:action,
      redirectTo:action
    });

  }
  
  brand =""
  cost=""
  model=""
  imageUrl= ""
  redirect= false
  vehicleModelEditStore
  vehicleModelService


  redirectTo(){
    this.redirect = false;
  }
  setBrand(brand){
    this.brand = brand;
  }

  redirectTrue(){
    this.redirect = true;
  }

  setCost(cost){
    this.cost = cost;
  }

  setModel(model){
    this.model = model;
  }

  setImageUrl(imgUrl){
    this.imageUrl = imgUrl;
  }




  

  handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    const id = uuidv4();
    const brand = this.brand;
    const cost = this.cost;
    const model = this.model;
    const imageUrl = this.imageUrl;
    this.vehicleModelService.addvehicle({id,brand,cost,model,imageUrl});
    runInAction(() => {
      this.redirectTrue();
    });
    
    
  };
}

export default VehicleModelAddStore;