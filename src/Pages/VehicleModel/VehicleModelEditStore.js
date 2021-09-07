
import { makeObservable, observable, runInAction} from "mobx";
import {action} from "mobx";
import {v4 as uuidv4} from "uuid";
import VehicleModelService from "../../Common/VehicleModelService.js";


class VehicleModelEditStore {

  constructor(rootStore){

    this.vehicleModelService = new VehicleModelService();

    this.carDetails = this.carDetails;
    makeObservable(this,{ 
      brand:observable,
      carDetails:observable,
      cost:observable,
      redirect:observable,
      model:observable,
      imageUrl:observable,
      updateBrand:action,
      updateCost:action,
      updateModel:action,
      updateImageUrl:action,
      getIdFromUrl:action,
      redirectTo:action,
      getDetails:action,

      
    });

    this.rootStore = rootStore;
  }



      carDetails = "";
      brand=this.carDetails.brand || "";
      cost=this.carDetails.cost  || "";
      model=this.carDetails.model  || "";
      imageUrl= this.carDetails.imageUrl  || "";
      redirect= false
      
      updateBrand(brandValue){
        this.carDetails.brand = brandValue;
      }

      getDetails(id) {
        this.vehicleModelService.ref
          .child(id)
          .once("value", (snapshot) => {
            runInAction(() => {
              this.carDetails = snapshot.val();
            });  
          });   
      }

  setCarDetails = carDetails => {
    this.carDetails = carDetails;
  }

  redirectTo(){
    this.redirect = false;
  }

  redirectTrue(){
    this.redirect = true;
  }

  updateCost(costValue){
    this.carDetails.cost = costValue;
  }

  updateModel(modelValue){
    this.carDetails.model = modelValue;
  }

  updateImageUrl(imgUrlValue){
    this.carDetails.imageUrl =  imgUrlValue;
  }



  handleEdit = e => {
    e.preventDefault();
    const key = this.getIdFromUrl();
    const id = uuidv4();
    const brand = this.carDetails.brand;
    const cost = this.carDetails.cost;
    const model = this.carDetails.model;
    const imageUrl = this.carDetails.imageUrl;
    this.vehicleModelService.update(key,{id,brand,cost,model,imageUrl});
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



    
};

export default VehicleModelEditStore;