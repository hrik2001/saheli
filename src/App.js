import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Otp from './Components/Authentication/Otp/Otp';
import Signup from './Components/Authentication/Signup/Signup';
import Login from './Components/Authentication/Login/Login';
import ResetPassword from './Components/Authentication/ForgotPassword/ResetPassword';
import ForgotPassword from './Components/Authentication/ForgotPassword/ForgotPassword';
import OtpVerify from './Components/Authentication/ForgotPassword/OtpVerify';
import Dashboard from './Components/dashboard/dashboard';
import Profile from './Components/User/Profile';
import TravellingForm from './Components/travellingForm/travelling';
import Group from './Components/group/group';
function App() {
  return (

<BrowserRouter>
    
    <Switch>

     <Route path="/signup" exact component={Signup}/>
     <Route path="/signup/otp"  component={Otp}/>
     <Route path="/ResetPassword" component={ResetPassword}/>
     <Route path="/ForgotPassword" component={ForgotPassword}/>
     <Route path="/Verifyotp" component={OtpVerify}/>
     <Route path="/Login" exact component={Login}/>
     <Route path="/dashboard" exact component={Dashboard}/>
     <Route path="/profile" exact component={Profile}/>
     <Route path="/travelForm" component={TravellingForm}/>
     <Route path="/group" component={Group}/>
    
     <Redirect to="/signup"/> 


     </Switch>

</BrowserRouter>

  );
}

export default App;
