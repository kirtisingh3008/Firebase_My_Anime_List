import React from "react"
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from './pages/About/About';
import Add from './pages/Add/Add';
import Home from './pages/Home/Home';
import View from './pages/View/View';
import Navbar from "./Components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <BrowserRouter>
    
      <div className="App">
        {/* calling our navbar component where actual logic is there */}
      <Navbar/>
        <ToastContainer position="top-center" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add" component={Add} />
           {/* We need an id of the particluar anime which we want to update  and view */}
          <Route path="/update/:id" component={Add} />
          <Route path="/view/:id" component={View} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
