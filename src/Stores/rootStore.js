import { RouterStore } from "mobx-react-router";

class RootStore  {
  constructor(){
    this.routerStore =  new RouterStore(this);
  }
}

export default RootStore;