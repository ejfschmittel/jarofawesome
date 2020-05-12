
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import "./styles/main.scss";


const Test = () => (
  <div>
  <h1>Test</h1>

  </div>
)

function App() {
  return (
    <div className="App">
      <Router>
       
        <Switch>
          <Route path="/" component={Test} exact={true} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;

