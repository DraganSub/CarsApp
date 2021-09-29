import { makeObservable, observable, runInAction} from "mobx";
import {action} from "mobx";
import VehicleMakeService from "../../Common/VehicleMakeService.js";
import VehicleMakeListStore from "./VehicleMakeListStore.js";



class VehicleMakeEditStore {
  constructor(rootStore){
    this.rootStore = rootStore;

    makeObservable(this,{ 
      make:observable,
      redirect:observable,
      updateMake:action,
      getIdFromUrl:action,
      carMake:observable
    });

    this.vehicleMakeService = new VehicleMakeService();
    this.vehicleMakeListStore = new VehicleMakeListStore();
    this.vehicleMakeListStore.getVehicleMake();
    const id = this.getIdFromUrl();
    this.getDetails(id);
    
  }

    carMake = "";
    make=this.carMake.make || "";
    redirect=false;
    



    updateMake = (makeValue) =>{
      this.carMake.make= makeValue;
    };

    redirectTrue(){
      this.redirect = true;
    };

    getDetails(id) {
      this.vehicleMakeService.getDetails(id,data=> this.carMake = data);
    };


    handleEdit = e => {
      e.preventDefault();
      const uid = this.getIdFromUrl();
      const make = this.carMake.make;
      this.vehicleMakeService.update(uid,make);
      e.target.reset();
      runInAction(() => {
        this.redirectTrue(); 
      });   
    };
   
    getIdFromUrl= () =>{
      const str = window.location.pathname;
      const char = str.split("/");
      const id = char[2];
      return id;
    } ;
  

};
  
export default VehicleMakeEditStore;