import React, {Component} from 'react';
import './Navbar.css';
import {NavLink,Redirect,Link} from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import SwitchButton from '../Button/switch';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import './notification.css';

import EmergencyModal from '../model/emergency';


class Navbar extends Component {
    
    state = {
        isLoggedIn:false,
        userName:localStorage.getItem('userName'),
        redirect:null,
        
        
    }


     logout=() => {
       let url=window.location.href;
       url=url.split("/")[3];
       console.log(url);
       if(url === "login")
        {}
       else this.setState({redirect:"/login"})
       
       localStorage.clear();
    }

    avatar=()=>{
      this.setState({redirect:`user/${localStorage.getItem('userId')}/`})
    }


     render(){
   

      let LoginLinks,firstLetter;

      if(this.state.userName)
          firstLetter = this.state.userName;
      
      else firstLetter = 'A';

       if (this.state.redirect) 
          return <Redirect to={this.state.redirect} />
        
      let notification =
      ( <div className="notification">
        <div className="notification_block">
            <p>Srishti sent you notificaiton</p>
            <p>notification 2</p>
        </div>
      </div> )

       LoginLinks = ( 
       
       <ul className="navbar-nav ml-auto">
  
        <li className="nav-item">
            <Link to={`/user/${localStorage.getItem('userId')}/`} style={{ textDecoration: 'none' }}><Avatar className="avatar">{firstLetter[0].toUpperCase()}</Avatar></Link>
        </li>

        <li className="nav-item"> 
            <NavLink to="/login" onClick={this.logout} activeClassName="btnactive"
             className="nav-link home Signupbtn logout">Logout</NavLink>
        </li>
    </ul>

    ); 

      if(localStorage.getItem('access') === null){

        LoginLinks =( <ul className="navbar-nav ml-auto">

          <li className="nav-item">
              <EmergencyModal/>
          </li>

         

            <li className="nav-item ">
              <span className="notification_parent">
                  <span className="nav-link home"> 
                    <NotificationsNoneRoundedIcon className={"notification_icon"}/>
                  </span>
                    {notification} 
              </span>
                    
            </li>

              <li className="nav-item">
                  <NavLink to="/signup" activeClassName="btnactive" className="nav-link home Signupbtn">Signup</NavLink>
              </li>

              
              <li className="nav-item">
                  <NavLink to="/login" activeClassName="btnactive" className="nav-link  home Loginbtn">Login</NavLink>    
              </li>
    
           </ul>
        )}

    return(
  
  <nav className=" navbar navbar-expand-lg sticky-top ">

    <NavLink to="/home" className="navbar-brand">Saheli</NavLink>
  
    <button className="navbar-toggler" type="button" data-toggle="collapse" 
    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation">
      <i className="fa fa-bars bar-nav" aria-hidden="true"></i>
    </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">

    <ul className="navbar-nav mr-auto">
         
    <li className="nav-item ">
          <span className="nav-link home"> 
          Going out today?</span>
    </li>
          
    <li  className="nav-item">
          <SwitchButton   />
         
    </li>
   
    </ul>
   
    {LoginLinks}
    
  </div>
</nav>

)}
};

export default Navbar;