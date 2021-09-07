import VehicleModelListStore from "../Pages/VehicleModel/VehicleModelListStore.js";
import VehicleMakeListStore from "../Pages/VehicleMake/VehicleMakeListStore.js";

class RootStore  {
  constructor(){
    this.vehiclesModelListStore = new VehicleModelListStore(this);
    this.vehicleMakeListStore = new VehicleMakeListStore(this);

  }
}

export default RootStore;