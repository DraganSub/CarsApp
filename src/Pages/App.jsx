
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import VehicleModelAddPage from "./VehicleModel/VehicleModelAddPage";
import VehicleModelListPage from "./VehicleModel/VehicleModelListPage";
import * as ROUTES from "../Common/constants/routes.js";
import VehicleModelEditPage from "./VehicleModel/VehicleModelEditPage";
import HomePage from "../Layouts/HomePage";
import { Router,RouterStore} from "react-router-mobx";
import { BrowserRouter,  Route } from "react-router-dom";
import VehicleMakeAddPage from "./VehicleMake/VehicleMakeAddPage";
import VehicleMakeListPage from "./VehicleMake/VehicleMakeListPage";
import VehicleMakeEditPage from "./VehicleMake/VehicleMakeEditPage";
const routerStore = new RouterStore();

class App extends Component {

  render() { 
    return (
      <div>
        <Router component={BrowserRouter} routerStore={routerStore}>
          <div>  
            <Route exact path={routerStore.location.push=ROUTES.HOME} component={HomePage}/>

            {/* routes for vehicles model */}
            <Route exact path={routerStore.location.push=ROUTES.LIST_VEHICLE} component={VehicleModelListPage} />
            <Route exact path={routerStore.location.push=ROUTES.ADD_VEHICLE} component={VehicleModelAddPage} />
            <Route path={routerStore.location.push=ROUTES.EDIT_VEHICLE} component={VehicleModelEditPage}/>

            {/* routes for vehicles make */}
            <Route exact path={routerStore.location.push=ROUTES.LIST_VEHICLE_MAKE} component={VehicleMakeListPage} />
            <Route exact path={routerStore.location.push=ROUTES.ADD_VEHICLE_MAKE} component={VehicleMakeAddPage} />
            <Route  path={routerStore.location.push=ROUTES.EDIT_VEHICLE_MAKE} component={VehicleMakeEditPage} />
          </div> 
        </Router>
      </div>
    );
  };
};
export default inject("rootStore")(observer(App));
