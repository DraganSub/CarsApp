import { runInAction } from "mobx";
import firebase from "./service.js";

class VehicleMakeService {


  addVehicleMake = (make) =>{
    const uid = firebase.database().ref("vehicles").push().key;
    this.update(uid,make);
  }

  update(uid,make){
    firebase.database().ref("vehicles").update({
      [uid]:{uid:uid,
        make:make}
    });
  }

  getDetails= (id,callback) =>{
    firebase.database().ref("vehicles").child(id).once("value",snap=> {
      runInAction(()=> {
        this.data = snap.val();
        callback(this.data);
      });
    });
  }

  delete = async(uid) => {
    const test = firebase.database().ref("cars").orderByChild("make").equalTo(`${uid}`);
    test.on("value",snapshot=>{
      snapshot.forEach(function(child){
        firebase.database().ref("/cars/" + child.key).remove();
      });
      firebase.database().ref("vehicles").child(uid).remove();
    });
  }   


  
  getVehicleMake(callback){
    firebase.database().ref("vehicles").on("value",snapshot=>{
      runInAction(() => {
        let result = [];
        snapshot.forEach((item) => {
          result.push({...item.val(), key:item.key});
          callback(result);
        });
      });
    });
  }

}
export default VehicleMakeService;