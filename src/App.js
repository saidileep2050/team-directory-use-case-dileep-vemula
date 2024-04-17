import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Teamdirectory from "./Teamdirectory";
import { IoMdAdd } from "react-icons/io";

function App() {
  return (
    <React.Fragment>
      <Teamdirectory />
      <button className="addBtn">
      <IoMdAdd className="add-icon"  />
      </button>
    </React.Fragment>
  );
}

export default App;
