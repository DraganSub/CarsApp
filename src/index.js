import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import App from "./Pages/App";
import RootStore from "./Stores/rootStore.js";
import "./index.css";



const Root =(
  <Provider rootStore={new RootStore()} >   
    <App />
  </Provider>
);

ReactDOM.render(
  Root,
  document.getElementById("root")
);


