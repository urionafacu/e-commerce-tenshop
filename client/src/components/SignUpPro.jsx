import React, {useEffect, useRef } from "react";
import { connect } from "react-redux";
import { addUser, getUsers, addCartInvited } from '../actions';
// import "./SignUp.css";
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { FormHelperText } from '@material-ui/core';
import "./SignUpPro.css";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';

const ValidationTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'orange',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor:"#FE980F",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    fontSize:"14px",
    backgroundColor:"#FE980F",
    margin: theme.spacing(3, 0, 2),
  },
  help: {
    fontSize: 12,
  }
}));


function SignUp ({addUser, onlineUser,getUsers,all_users, addCartInvited, setid}) {
  
  const classes = useStyles();
  const history = useHistory(); 
  const [input, setInput] = React.useState({})
  const [errors, setErrors] = React.useState({});
  useEffect(() => {
    getUsers()
  },[])
  var verified = useRef("true");


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

  function handleSubmit(e) {
    e.preventDefault()
    //mailgun.messages().send(data, (error, body) => {
     // console.log(body);
     // });

     

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
      console.log("Si agrega usuario" , input)
        addUser(input)
        
        Swal.fire({
          icon: 'success',
          title: 'Your account has been created successfully',
        })
        history.push('/'); 
      }
      
        //console.log("ANTESS DE ENTRARRRRRR", setid)
  /*           if(typeof onlineUser == "object"){
              console.log("ENTROOOOOOO", setid)
              let arr = [];
              setid.forEach(function(ele){
                  return arr.push(parseInt(ele))
                });
                addCartInvited(arr, onlineUser.id)
              console.log("SIGN IN PROOOOOOO", arr, onlineUser,onlineUser.id) 
            }  */
    }
  var flagName = useRef("true");
  var flagSurname = useRef("true");
  var flagUsername = useRef("true");
  var flagPass = useRef("true");
  var flagPass2 = useRef("true");
  var flagEmail = useRef("true");

//   var API_KEY = '42a6fff54d7abd9021a77f44e0d7eb51-7cd1ac2b-8b692ccc';
// var DOMAIN = 'sandbox233afed3745040c296739c02f2367640.mailgun.org';
// var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

// const data = {
//   from: 'tenshop@mailinator.com',
// 	to: 'faqqu.fu@gmail.com',
//   subject: 'faq',
//   text: 'Probandoooooss!'
// };



    
  function validate(input) {
    let errors = {};
    
    if (!input.firstname) {
      errors.firstname = "Firstname is required";
    } else if (!/^[a-zA-Z\-]+$/.test(input.firstname)) {
      errors.firstname = "Firstname is invalid";
    } else {
      flagName.current = "";
     }
    
    if (!input.surname) {
      errors.surname = "Surname is required";
    } else if (!/^[a-zA-Z\-]+$/.test(input.surname)) {
      errors.surname = "Surname is invalid";
    } else {
      flagSurname.current = "";
    }
    console.log("1", input.email)
    if (!input.username) {
      errors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
      errors.username = "Username is invalid";
    } else {
    all_users.map((us) =>{
      if (us.username === input.username){
        return errors.username = "Username is already in use"
      }
    })} 
    if(errors.username === undefined) {
      flagUsername.current = ""
    }
  
    if (!input.email) {
      errors.email = "Email is required";
    } else if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(input.email)){
      errors.email = "Email is invalid"
    } else {
    all_users.map((us) =>{
      if (us.email === input.email){
        return errors.email = "Email is already in use"
    }
  })
  }
  if ( errors.email === undefined){ flagEmail.current = ""}
  
  // /(?=.*[0-9])/
  if (!input.password) {
    errors.password = "Password is required";
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(input.password)) {
    errors.password = "Password is invalid"
  } else {
    flagPass.current = ""
  }
  if (!input.password2) {
    errors.password2 = "Password is required";
    } else if ( input.password !== input.password2) {
      errors.password2 = "Passwords doesnt equal."
    } else { flagPass2.current = ""} 
    if(Object.keys(errors).length == 0){
      verified.current = false;
    }
    return (errors)
  };
  console.log(errors.username)

  return ( 

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error = {flagName.current}
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleInputChange}
                inputProps={{style: {fontSize: 20}}}
              />
              <FormHelperText
                id="help" 
                children = {errors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error = {flagSurname.current}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="surname"
                autoComplete="lname"
                onChange={handleInputChange}
                inputProps={{style: {fontSize: 20}}}
              />
              <FormHelperText
                id="help" 
                children = {errors.surname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error = {flagEmail.current}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
                inputProps={{style: {fontSize: 20}}}
              />
              <FormHelperText
                id="help" 
                children = {errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error = {flagUsername.current}
                variant="outlined"
                required
                fullWidth
                name="username"
                label="Username"
                id="username"
                onChange={handleInputChange}
                inputProps={{style: {fontSize: 20}}}
              />
              <FormHelperText
                id="help" 
                children = {errors.username}
              />
            </Grid>
            <Grid item xs={12} sm ={6}>
              <TextField 
                error ={flagPass.current}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                inputProps={{style: {fontSize: 20}}}
              />
              <FormHelperText
                id="help" 
                children = {errors.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                error ={flagPass2.current}
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Repeat your password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                inputProps={{style: {fontSize: 20}}}
              />
              <FormHelperText
                id="help" 
                children = {errors.password2}
              />
            </Grid>
            
            
          </Grid>
          <Button
            //disabled = {verified.current}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {handleSubmit(e)}}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/signin" style= {{"fontSize":"13px","color":"black"}} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    addUser: (body) => dispatch(addUser(body)),
    getUsers: () => dispatch(getUsers()),
    addCartInvited: (diProduc, idUser) => dispatch(addCartInvited(diProduc, idUser)),
  }
}


const mapStateToProps = state => {
  return {
    onlineUser: state.onlineUser,
    all_users: state.all_users,
    setid: state.setid,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

