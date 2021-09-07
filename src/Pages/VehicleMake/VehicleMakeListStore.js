import { makeObservable, observable,action,computed, runInAction} from "mobx";
import sortItemsBy from "../../Common/sortItemsBy.js";
import getCurrentIndex from "../../Common/getCurrentIndex.js";
import VehicleMakeService from "../../Common/VehicleMakeService.js";


class VehicleMakeListStore{

  constructor(rootStore){
 
    this.rootStore = rootStore;

    makeObservable(this, {
      vehiclesMake:observable,
      currentPage:observable,
      changeSearchText:action,
      setSortElements:action,
      vehiclesPerPage:observable,
      searchText:observable,
      sortElements:observable,
      setCurrentPage:action,
      filteredVehiclesMakeList:computed,
      currentVehiclesMakeList:computed,
      getVehicleMake:action,
      delete: action
    });

    this.vehicleMakeService = new VehicleMakeService();

  }

  searchText = "";
  sortElements = {
    sortBy: "brand",
    direction: "ascending",
  };
  vehiclesMake = [];
  currentPage = 1;
  vehiclesPerPage=4;
  changeSearchText = (e) => {
    this.searchText = e.target.value;
  }

  setSortElements = (sortBy, direction) => {
    this.sortElements = {sortBy, direction};
  }

  setCurrentPage = (pageNum) => {
    this.currentPage = pageNum;
  }

  get filteredVehiclesMakeList(){
    const sortedVehiclesMake = sortItemsBy(this.vehiclesMake.slice(), this.sortElements.direction,this.sortElements.sortBy);
    return sortedVehiclesMake.filter(vehicle => {
      return(
        vehicle.brand.toLowerCase().includes(this.searchText)
      );
    });
  }

  get currentVehiclesMakeList(){
    return getCurrentIndex(this.filteredVehiclesMakeList,this.currentPage,this.vehiclesPerPage);
  }

  async getVehicleMake(){
    this.vehicleMakeService.ref.on("value",(snapshot) => {
      runInAction(() =>{
        let result = [];
        snapshot.forEach((item) => {
          result.push({...item.val(), key:item.key});
        });
        this.vehiclesMake = [...result];
      });
    });
  }

    delete = async(id) =>{
      await this.vehicleMakeService.delete(id);
    };
    
}

export default VehicleMakeListStore;