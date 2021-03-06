
import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

import {AuthContextProvider} from "./contexts/auth.context"
import AuthRoute from "./components/authRoute.component"

import Header from "./components/Header.component"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MyMemoriesPage from "./pages/MyMemoriesPage";
import MemoryShareRedirectPage from "./pages/MemoryShareRedirectPage"

import MemoryDetail from "./pages/MemoryDetailPage"


import "./styles/main.scss";

function App() {
  return (
    <AuthContextProvider>
    <div className="App">
      <Router>
       <Header />
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/memories" component={MyMemoriesPage} exact={true} />
          <Route path="/memories/:memoryid" component={MemoryDetail} />
          <Route path="/m/:shareHash" component={MemoryShareRedirectPage} />
        </Switch>
      </Router>
      

    </div>
    </AuthContextProvider>
  );
}

export default App;

