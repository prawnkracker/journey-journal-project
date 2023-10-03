import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from './Home'

function App() {
  return (
    <div className="app">
      <Route exact path='/'>
        <Home />
      </Route>
    </div>
  )
}

export default App;
