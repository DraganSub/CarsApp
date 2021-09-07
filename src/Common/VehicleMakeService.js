import firebase from "./service.js";

class VehicleMakeService {
     
  ref =  firebase.database().ref("vehicles");

  addVehicleMake = async (items) =>{
    const id = await this.ref.push().key;
    this.update(id,items);
  }

  async update(id,values){
    await this.ref.update({[id]: {...values}});
  }

  delete =  async(id)=>{
    await this.ref.child(id).remove();
  }   
}
export default VehicleMakeService;