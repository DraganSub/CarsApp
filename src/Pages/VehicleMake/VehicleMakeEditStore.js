
import { makeObservable, observable, runInAction} from "mobx";
import {action} from "mobx";
import {v4 as uuidv4} from "uuid";
import VehicleMakeService from "../../Common/VehicleMakeService.js";



class VehicleMakeEditStore {
  constructor(rootStore){

    this.carBrand = this.carBrand;
    makeObservable(this,{ 
      brand:observable,
      redirect:observable,
      updateBrand:action,
      getIdFromUrl:action,
      carBrand:observable
    });
    this.vehicleMakeService = new VehicleMakeService();
    this.rootStore = rootStore;
  }

    carBrand = "";
    vehicleMakeService;
    brand=this.carBrand.brand || "";
    redirect=false;
    

    redirect(){
      this.redirect = false;
    };

    updateBrand(brandValue){
      this.carBrand.brand= brandValue;
    };

    redirectTrue(){
      this.redirect = true;
    };

    getDetails(id) {
      this.vehicleMakeService.ref
        .child(id)
        .once("value", (snapshot) => {
          runInAction(() => {
            this.carBrand = snapshot.val();
          });
        });
    };


  handleEdit = e => {
    e.preventDefault();
    const key = this.getIdFromUrl();
    const brand = this.carBrand.brand;
    const id = uuidv4();
    this.vehicleMakeService.update(key,{id,brand});
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