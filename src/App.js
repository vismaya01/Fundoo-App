import './App.css';
import Registration from './components/registration/registration'
import Login from './components/login/login';
import Forgotpassword from './components/forgotPassword/forgotPassword'
import Resetpassword from './components/resetPassword/resetPassword';
import DashBoard from './components/DashBoard/DashBoard'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/" component={Login} />
          <Route exact path="/forgotpassword" component={Forgotpassword} />
          <Route exact path="/resetpassword/:token" component={Resetpassword} />
          <Route exact path="/dashBoard" component={DashBoard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
