import React, {useEffect}from "react";
import { connect } from "react-redux";
import { addUser, getUsers } from '../actions';
import "./SignUp.css";
import Swal from 'sweetalert2';
import {NavLink} from "react-router-dom";
import { useHistory } from 'react-router-dom';


function SignUp ({addUser, onlineUser,getUsers,all_users}) {
  const history = useHistory(); 
  const [input, setInput] = React.useState({})
  const [errors, setErrors] = React.useState({});
  useEffect(() => {
    getUsers()
  },[])


  function handleInputChange(e) {
    
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    if (input.password !== input.password2){
     errors.password = "The password doesnt equal." 
    }
    setErrors(validate({
          ...input,
          [e.target.name]: e.target.value
      }));

  }

  function handleSubmit() {
    var keys = Object.keys(input)    
    if (errors.firstname || errors.surname || errors.username || errors.password || errors.password2 || errors.email)  {
      var err = Object.keys(errors).filter(el => el !== "password2")
      var sum = "";
      err.forEach(el => {
        sum += el+" invalid!!!\n"
      })
      Swal.fire({
            icon: 'error',
            title: sum,
            showConfirmButton: false,
            timer: 1500
          })                  
    } else if (input.password !== input.password2) {
        Swal.fire({
            icon: 'error',
            title: 'Passwords do not match.',
            showConfirmButton: false,
            timer: 1500
          })        
    } else if (keys.length === 0) {
      Swal.fire({
            icon: 'error',
            title: 'Error!!! Incomplete entries',
            showConfirmButton: false,
            timer: 1500
          })        
    } else {
        addUser(input)
        Swal.fire({
          icon: 'success',
          title: 'Your account has been created successfully',
        })
        history.push('/'); 
    }
  }
  

  function validate(input) {
    let errors = {};

    if (!input.firstname) {
      errors.firstname = "Firstname is required";
    } else if (!/^[a-zA-Z\-]+$/.test(input.firstname)) {
      errors.firstname = "Firstname is invalid"
    }
    
    if (!input.surname) {
      errors.surname = "Surname is required";
    } else if (!/^[a-zA-Z\-]+$/.test(input.surname)) {
      errors.surname = "Surname is invalid"
    }

    if (!input.username) {
      errors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
      errors.username = "Username is invalid"
    } 
    all_users.map((us) =>{
      if (us.username === input.username){
        return errors.username = "Username is already in use"
      }
    })

    if (!input.email) {
      errors.email = "Email is required";
    } else if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(input.email)){
    errors.email = "Email is invalid"
    }
    all_users.map((us) =>{
      if (us.email === input.email){
        return errors.email = "Email is already in use"
    }
  })
    // /(?=.*[0-9])/
    if (!input.password) {
      errors.password = "Password is required";
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(input.password)) {
      errors.password = "Password is invalid"
    }
    if (!input.password2) {
      errors.password2 = "Password is required";
    } else if ( input.password !== input.password2) {
      errors.password2 = "Passwords doesnt equal."
    } 
    return errors;
  };

  return ( 
    

    <section class="contact-block jumbotron bg-info">
      <div class="container h-100 jumbotron bg-info">
    <div class="row justify-content-center h-100 ">
        <div class="col-md-6">
            <div class="well well-sm" style= {{borderRadius: '10px'}}>
                <div style={{fontSize: '18px',  heigth: '25px'}} class="form-horizontal" method="post">
                   <fieldset className='align-items-center h-100'> 
                        <legend class="text-center header"><h2>Sign Up </h2></legend>
                        
                        <div class="form-group">
                            <span class="col-md-1  text-center"><i class="fa fa-user bigicon"></i></span>
                            <div class="col-md-8">
                                <input style={{fontSize: '18px',  heigth: '25px'}} placeholder="Enter your firstname" type="text" name="firstname" value={input.firstname} onChange={handleInputChange} class="form-control input"/>
                            </div>
                                <div class= "col-md-3">{errors.firstname && ( <small style={{fontSize: '14px',color:'red'}} >
                                  {errors.firstname}</small>)}
                                </div>
                        </div>
                        
                        <div class="form-group">
                            <span style={{fontSize: '18px',  heigth: '25px'}} class="col-md-1  text-center"><i class="fa fa-user bigicon"></i></span>
                            <div class="col-md-8">
                                <input style={{fontSize: '18px',  heigth: '25px'}} placeholder="Enter your surname" type="text" name="surname" value={input.surname} onChange={handleInputChange} class="form-control input"/>
                            </div>
                            <div class= "col-md-3">{errors.surname && ( <small style={{fontSize: '14px',color:'red'}} >
                                  {errors.surname}</small>)}
                                  </div>
                        </div>
                        <div class="form-group">
                            <span style={{fontSize: '18px',  heigth: '25px'}} class="col-md-1  text-center"><i class="fa fa-envelope bigicon"></i></span>
                            <div class="col-md-8">
                                <input style={{fontSize: '18px',  heigth: '25px'}} placeholder="Enter your email" type="text" name="email" value={input.email} onChange={handleInputChange} class="form-control input "/>
                            </div>
                            <div class= "col-md-3"></div>{errors.email && ( <small style={{fontSize: '14px',color:'red'}} >
                                  {errors.email}</small>)}
                        </div>
                        <div className="exampleEmail">
                        <h5 style={{marginRight:"25%"}}> example@domine.com </h5>
                        </div>

                        <div class="form-group">
                            <span class="col-md-1 text-center"><i class="fa fa-user-plus"></i></span>
                            <div class="col-md-8">
                              <input style={{fontSize: '18px',  heigth: '25px'}} placeholder="Enter your username" type="text" name="username" value={input.username} onChange={handleInputChange} class={"form-control input"}/>
                            </div>
                            <div class= "col-md-3"></div>{errors.username && ( <small style={{fontSize: '14px',color:'red'}} >
                                  {errors.username}</small>)}
                        </div>

                        <div class="form-group">
                            <span class="col-md-1  text-center"><i class="fa fa-lock"></i></span>
                            <div class="col-md-8">
                              <input style={{fontSize: '18px',  heigth: '25px'}} placeholder="Enter your password" type="password" name="password" value={input.password} onChange={handleInputChange} class="form-control input"/>
                              
                            </div>
                            <div class= "col-md-3"></div>{errors.password && ( <small style={{fontSize: '14px',color:'red'}} >
                                  {errors.password}</small>)}
                              <h5 style={{marginRight:'250px', marginLeft: '70px' }}>
                              -One lowercase character -One uppercase character
                              -One Number
                              -One special character
                              -8 character minimum
                              </h5>
                        </div>

                        <div class="form-group">
                            <span class="col-md-1  text-center"><i class="fa fa-check"></i></span>
                            <div class="col-md-8">
                              <input style={{fontSize: '18px',  heigth: '25px'}} placeholder="Enter your password again" type="password" name="password2" value={input.password2} onChange={handleInputChange} class="form-control input "/>
                              
                            </div>
                            <div class= "col-md-3"></div>{errors.password2 && ( <small style={{fontSize: '14px',color:'red'}} >
                                  {errors.password2}</small>)}
                             
                        </div>

                        <div class="form-group">
                            <div class="col-md-12 text-center">
                                <button type="submit" class="btn btn-outline-primary signbutton" id='15' onClick={() => handleSubmit()}>Create my account</button>
                            </div>
                        </div>
                        <div><h4>Do you have an account? <NavLink style ={{color: "blue"}}to = "/login">Log In!</NavLink></h4></div>
                      </fieldset> 
                </div>
            </div>
        </div>
    </div>
</div>
</section>
    )
}

// hacer confirmar contraseña
// repetir contraseña (validar contraseña que sean iguales)
// seguridad de la contraseña (regex) 
// ¿no tenes cuenta? registrate
// no mostrar boton para registrarse cuando estas conectado como usuario

const mapDispatchToProps = dispatch => {
  return {
    addUser: (body) => dispatch(addUser(body)),
    getUsers: () => dispatch(getUsers())
  }
}


const mapStateToProps = state => {
  return {
    onlineUser: state.onlineUser,
    all_users: state.all_users
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

