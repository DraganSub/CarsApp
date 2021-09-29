
import {makeObservable,observable,action, computed} from "mobx";
import sortItemsBy from "../../Common/sortItemsBy.js";
import getCurrentIndex from "../../Common/getCurrentIndex.js";
import VehicleModelService from "../../Common/VehicleModelService.js";
import VehicleMakeService from "../../Common/VehicleMakeService.js";
import VehicleMakeListStore from "../VehicleMake/VehicleMakeListStore.js";

class VehicleModelListStore {

  constructor(rootStore){
    this.rootStore =rootStore;

    
    makeObservable(this, {
      vehicles: observable,
      currentPage:observable,
      searchText:observable,
      sortElements:observable,
      vehiclesPerPage:observable,
      changeSearchText:action,
      setSortElements:action,
      setCurrentPage:action,
      filteredVehicles:computed,
      currentVehicles:computed, 
      getvehicle:action,
      delete:action,


      
    });
    this.vehicleModelService = new VehicleModelService();
    this.vehicleMakeListStore = new VehicleMakeListStore();

    this.vehicleMakeListStore.getVehicleMake();
    this.getvehicle();

  }
  

  
  searchText = "";
  sortElements = {
    sortBy: "make",
    direction: "ascending",
  };
  vehiclesPerPage = 6;
  vehicles = [];
  currentPage = 1;

  
  changeSearchText = (event) => {
    this.searchText = event.target.value;
  }

  setSortElements = (sortBy, direction) => {
    this.sortElements = {sortBy, direction};
  }

  setCurrentPage = (pageNum) => {
    this.currentPage = pageNum;
  }
  
  get filteredVehicles(){
    const sortedVehicles = sortItemsBy(this.vehicles.slice(), this.sortElements.direction, this.sortElements.sortBy);
    return sortedVehicles.filter(vehicle => {
      return(
        vehicle.make.toLowerCase().includes(this.searchText) || vehicle.model.toLowerCase().includes(this.searchText)
      );
    });
  }

  get currentVehicles(){
    return getCurrentIndex(this.filteredVehicles,this.currentPage,this.vehiclesPerPage);
  }

  checkByKey(makeId){
    this.vehicleModelService.checkByKey(makeId);
  } 

  getvehicle(){
    this.vehicleModelService.getvehicle(data => this.vehicles = data);
  }
      
  delete = (id) => { 
    this.vehicleModelService.delete(id);
  }

}

export default VehicleModelListStore;