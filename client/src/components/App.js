import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from './Home'
import TripList from './TripList'
import NavBar from "./NavBar";
import SignupLogin from "./SignupLogin";

function App() {
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState(null);
  // get trips
  useEffect(() => {
     fetch('/trips_index')
     .then((r) => r.json())
     .then((data) => setTrips(data))
   }, []);
  
   //auto login
  useEffect(() => {
    fetch('/check_session').then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []); 

  if (!user) return <SignupLogin onLogin={setUser}/>
  
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
