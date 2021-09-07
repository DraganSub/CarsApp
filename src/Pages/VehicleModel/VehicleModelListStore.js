
import {makeObservable,observable,action,runInAction, computed} from "mobx";
import sortItemsBy from "../../Common/sortItemsBy.js";
import getCurrentIndex from "../../Common/getCurrentIndex.js";
import VehicleModelService from "../../Common/VehicleModelService.js";


class VehicleModelListStore {


  constructor(rootStore){
    this.vehicleModelService = new VehicleModelService();
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
      delete:action
    });
    this.rootStore =rootStore;

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
        vehicle.brand.toLowerCase().includes(this.searchText) || vehicle.model.toLowerCase().includes(this.searchText)
      );
    });
  }

  get currentVehicles(){
    return getCurrentIndex(this.filteredVehicles,this.currentPage,this.vehiclesPerPage);
  }

  async getvehicle(){
    
    this.vehicleModelService.ref.on("value",(snapshot) => {
      runInAction(() =>{
        let result = [];
        snapshot.forEach((item) => {
          result.push({...item.val(), key:item.key});
        });
        this.vehicles = [...result];
      });
    });
  }
      
  delete = (id) => { 
    this.vehicleModelService.delete(id);
  }

}

export default VehicleModelListStore;