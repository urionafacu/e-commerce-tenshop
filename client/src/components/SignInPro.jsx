import React, { useState } from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import { loginUser ,onlineUserError, addCartInvited, addUser} from "../actions";
import {connect} from "react-redux";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import GoogleLogin from 'react-google-login';
import { useGoogleLogin } from 'react-google-login'
import "./SignIn.css"
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#FE980F"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: "#FE980F",
    margin: theme.spacing(3, 0, 2),
    height: "40px",
    fontSize: "15px",
    },
  tolink: {
    fontSize: "15px"
  },
  anchoGoogle: {
    width: "200px",
    marginLeft:"60px"
}

}));


const SignIn = ({ loginUser, onlineUser , onlineUserError, setid, addCartInvited, addUser}) => {
  const classes = useStyles();
  const history = useHistory();
  const [input, setInput] = useState({username: "", password: ""});
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const responseGoogle = (res) => {
  console.log(res);
  addUser({
    firstname:res.profileObj.givenName,
    surname: res.profileObj.familyName,
    password: res.Da,
    username: res.profileObj.givenName + res.profileObj.familyName,
    email: res.profileObj.email,
    googleId: res.googleId
  })
}


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input)
    loginUser(input);

  };
     if ( onlineUser == 2) {
      onlineUserError()
      Swal.fire({
              icon: 'error',
              title: 'Oops... user or password invalid!',
              showConfirmButton: false,
              timer: 3000
            })
    }
    if (typeof onlineUser === "object") {
      Swal.fire({
              icon: 'success',
              title: 'Welcome,'+ ' ' +onlineUser.firstname.toUpperCase(),
              showConfirmButton: false,
              timer: 1500
            })
            history.push('/');
          /*   if(setid.length !== 0){
              let arr = [];
              setid.forEach(function(ele){
                  return arr.push(parseInt(ele))
                });
              //console.log("SIGN IN PROOOOOOO", arr)
    }  */
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            className={classes.input}
            helperText=""
            error={false}
            onChange={handleChange}
            inputProps={{style: {fontSize: 20}}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className={classes.input}
            onChange={handleChange}
            error={false}
            inputProps={{style: {fontSize: 20}}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Link href="/signup" style= {{"fontSize":"13px","color":"black"}} variant="body2">
                {"You don't have an account?"}
              </Link>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Link href="/signup" style= {{"fontSize":"13px","color":"black"}} variant="body2">
                {"I forgot the password."}
              </Link>
                
              </Grid>
              <Grid item xs={12} sm={6} style={{paddingLeft:"50px"}} >
              <GoogleLogin
              className= {classes.anchoGoogle}
                clientId="1091738503095-fha2ruo3mic5qr58e7k7a3ov886bd1st.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
              </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}

const mapDispatchToProps = dispatch => {
    return {
    loginUser: (body) => dispatch(loginUser(body)),
    onlineUserError: () => dispatch(onlineUserError()),
    addCartInvited: (diProduc, idUser) => dispatch(addCartInvited(diProduc, idUser)),
    addUser:(user) => dispatch(addUser(user))
    }
}
const mapStateToProps = state => {
    return {
        onlineUser : state.onlineUser,
        setid: state.setid,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
