
import firebase from "./service.js";
import {runInAction} from "mobx";


class VehicleModelService {

  addvehicle(items){
    const id =firebase.database().ref("cars").push().key;
    runInAction(() =>{
      this.update(id,items);
    });
  }

  getDetails(id,callback){
    firebase.database().ref("cars").child(id).once("value",snapshot => {
      runInAction(() => {
        this.data = snapshot.val();
        callback(this.data);
      });
    });
  }
  
  checkByKey(makeId){
    let res = [];
    firebase.database().ref(`vehicles/${makeId}`).on("value",snap=>{
      snap.forEach(item => {
        const data = item.val();
        const key = item.key;
        res.push(data, key);
      });
    });
    return res[0];
  } 

  getvehicle(callback){
    firebase.database().ref("cars").on("value",(snapshot) => {
      runInAction(() =>{
        let result = [];
        snapshot.forEach((item) => {
          result.push({cost:item.val().cost,
            id:item.val().id,
            imageUrl:item.val().imageUrl,
            make:this.checkByKey(item.val().make),
            model:item.val().model, 
            key:item.key});
        });
        callback(result);
      });
    });
  }

  update(id,values){
    firebase.database().ref("cars").update({[id]: {...values}});
  }

  delete = async(id) => {
    await firebase.database().ref("cars").child(id).remove();
  }
}

export default VehicleModelService;