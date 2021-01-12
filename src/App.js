import './App.css'
import React from "react";
import Registration from './components/registration/registration'
import Login from './components/login/login';
import Forgotpassword from './components/forgotPassword/forgotPassword'
import Resetpassword from './components/resetPassword/resetPassword';
import DashBoard from './components/DashBoard/DashBoard'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ProtectedRoute } from "./ProtectedRoute";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login"/>
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgotpassword" component={Forgotpassword} />
          <Route exact path="/resetpassword/:token" component={Resetpassword} />
          <ProtectedRoute path="/dashBoard" component={DashBoard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
