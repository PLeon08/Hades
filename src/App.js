import "./App.css";
import { useState } from "react";
import Home from "./components/Home";

function App() {
  
  const [nombre, setNombre] = useState("Mablo");
  const funcion = () => {};

  return (
    <div className="maincontainer">
      <Home></Home>
    </div>
  );
}

export default App;
