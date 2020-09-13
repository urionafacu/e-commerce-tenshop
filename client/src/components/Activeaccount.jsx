import React, {  useState } from "react";
import { connect } from "react-redux";
import {Link, NavLink} from 'react-router-dom';
import { activeaccount } from "../actions";



 function Activeaccount({onlineUser, activeaccount}) {


if(typeof onlineUser !== 'object'){
    console.log(onlineUser)
   // activeaccount(onlineUser.id)
}
      return(
 <div className="contenedor">
     
  
<div class="jumbotron text-center">
  <h1 class="display-3" style={{color:'orange'}}>Thank You!</h1>
  <p class="lead"><strong>Your email has been activated</strong>  It's time to shop!.</p>
  <hr></hr>
  <p>
    Having trouble? <NavLink to='/contact' style={{color:'orange'}}>Contact us.</NavLink>
  </p>
  <p class="lead" style={{marginBottom:'100px'}}>
  <Link to='/'><button type="button" className="btn btn-warning btn-lg" id="op1" value="allorders">Continue to homepage</button></Link>
   {/*  <button class="btn btn-primary btn-sm">Continue to homepage</button> */}
  </p>
</div>

</div>
      )
    
  }

  const mapStateToProps = state => {
    return {
      onlineUser: state.onlineUser,  
    }
  }


  const mapDispatchToProps = dispatch => {
        return {
            activeaccount: (id) => dispatch(activeaccount(id)),
        }
   }
  
  
  
  export default connect(null, mapDispatchToProps)(Activeaccount)