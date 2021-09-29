import React, {Component} from "react";
import Navigation from "../Components/Navigation";
import AppBar from "@material-ui/core/AppBar";

class MainLayout extends Component{
  render(){
    return (
      <div>
        <AppBar position="relative" color="secondary">
          <Navigation />
        </AppBar>
        <div>
          {this.props.children};
        </div>
      </div>
    );
  }
}
export default MainLayout;