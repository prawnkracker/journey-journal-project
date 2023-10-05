import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from './Home'
import TripList from './TripList'
import NavBar from "./NavBar";

function App() {
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState(null);
  // get trips
  useEffect(() => {
     fetch('/trips_index')
     .then((r) => r.json())
     .then((data) => setTrips(data))
   }, []);
   console.log(trips)
  
   //auto login
  useEffect(() => {
    fetch('/check_session').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []); 


  
  return (
    <div className="app">
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/trips'>
          <TripList trips={trips}/>
        </Route>
      </Switch>
    </div>
  )
}

export default App;
