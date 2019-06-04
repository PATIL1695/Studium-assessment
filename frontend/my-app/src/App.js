import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Doctors from './components/allDoct';
import Details from './components/Details';

function App() {
  return (
    <Router>
    <div className="App">
    <div className="container">
    <Route exact path="/" component={Doctors}/> 
    <Route exact path="/Details" component={Details}/> 

    </div>
    </div>
    </Router>


  );
}

export default App;
