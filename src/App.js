import './App.css'
import React from "react";
import Registration from './components/registration/registration'
import Login from './components/login/login';
import Forgotpassword from './components/forgotPassword/forgotPassword'
import Resetpassword from './components/resetPassword/resetPassword';
import DashBoard from './components/DashBoard/DashBoard'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from "./ProtectedRoute";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/" component={Login} />
          <Route exact path="/forgotpassword" component={Forgotpassword} />
          <Route exact path="/resetpassword/:token" component={Resetpassword} />
          <ProtectedRoute path="/dashBoard" component={DashBoard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
