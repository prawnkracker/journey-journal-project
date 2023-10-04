import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from './Home'
import TripList from './TripList'

function App() {
  const [trips, setTrips] = useState([])
  
  useEffect(() => {
    fetch('/trips_index')
    .then((r) => r.json())
    .then((data) => setTrips(data))
  }, []);
  console.log(trips)
  
  return (
    <div className="app">
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/triplist'>
          <TripList trips={trips}/>
        </Route>
      </Switch>
    </div>
  )
}

export default App;
