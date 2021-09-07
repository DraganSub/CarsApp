
import firebase from "./service.js";
import {runInAction} from "mobx";


class VehicleModelService {
  
  ref =  firebase.database().ref("cars");

  addvehicle = async (items) =>{
    const id = await this.ref.push().key;
    runInAction(() =>{
      this.update(id,items);
    });
  }

  async update(id,values){
    await this.ref.update({[id]: {...values}});
  }

  delete = async(id) => {
    await this.ref.child(id).remove();
  }
}

export default VehicleModelService;