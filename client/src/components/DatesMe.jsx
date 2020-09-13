import React, { useState , useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { loginUserCookie } from "../actions/index.js"
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import { updateOnlineUser, updateUser } from "../actions/index"
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import axios from "axios";

const estilos = {
    labelFontSize: {
      fontSize: "20px"
    },
    input: {
      height: "40px",
      borderRadius: "10px",
      fontSize: "20px"
    },
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "spaceBetween",
      alignContent: "spaceBetween"
    },
    botones: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    emailUsername: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    changePassword: {
      color: "black"
    },
    inputsChange: {
      fontSize: "30px"
    },
    errorPassword: {
      height: "20px",
      color: "red"
    }
  }


const DatesMe = ({ user, loginUserCookie, updateOnlineUser, updateUser }) => {
  
  useEffect(() => {
    loginUserCookie()
  },[])

  const [input, setInput] = useState({});
  const [boton, setBoton] = useState(false)
  const [changePassword, setChangePassword] = useState({password1: "", password2: ""});
  const [errorPassword1, setErrorPassword1] = useState("")
  const [errorPassword2, setErrorPassword2] = useState("")
  const history = useHistory();

  if (boton) {
    document.getElementById("firstname").disabled = false;
    document.getElementById("surname").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("address").disabled = false;
    document.getElementById("username").disabled = false;
  } else if (document.getElementById("firstname")) {
    document.getElementById("firstname").disabled = true;
    document.getElementById("surname").disabled = true;
    document.getElementById("address").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("username").disabled = true;
    document.getElementById("firstname").value = user.firstname;
    document.getElementById("surname").value = user.surname;
    document.getElementById("address").value = user.address;
    document.getElementById("email").value = user.email;
    document.getElementById("username").value = user.username;
  }

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    updateOnlineUser(user.id, input);
    document.getElementById("firstname").disabled = true;
    document.getElementById("surname").disabled = true;
    document.getElementById("address").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("username").disabled = true;
    setBoton(false)
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setErrorPassword1("");
    setErrorPassword2("");
    setChangePassword({...changePassword, [e.target.name]: e.target.value});

  };

  const handleSubmitChangePassword = (e) => {
    e.preventDefault()
    if (!changePassword.password1) {
      setErrorPassword1("Obligatory field!")
      return;
    } else if (!changePassword.password2) {
      setErrorPassword2("Obligatory field!");
      return;
    }
    if (changePassword.password1.length < 8) {
      setErrorPassword1("Does not exceed 8 characters");
      return;
    };
    if (changePassword.password1 !== changePassword.password2) {
      setErrorPassword1("Passwords do not match")
      setErrorPassword2("Passwords do not match")
      return;
    };

    document.getElementById("password1").value = "";
    document.getElementById("password2").value = "";    
    axios.put("http://localhost:3001/users/aaa/updatePassword", { id: user.id, password: changePassword.password1 })

    Swal.fire({
      icon: 'success',
      title: 'Password changed!',
      showConfirmButton: false,
      timer: 1500
    })
  };

  return (

      <div>
        <form>

          <div style={estilos.container}>
            <div class="form-group">
              <label
                for="Pepe"
                style={estilos.labelFontSize}
                className="font-weight-light"
                  >Firstname
              </label>
              <input type="text"
                className="form-control save"
                id="firstname"
                style={estilos.input}
                onChange={handleChange}
                name="firstname"
              />
            </div>
            &nbsp;
            &nbsp;
            <div class="form-group">
              <label
                for="cesarsanchez"
                style={estilos.labelFontSize}
                className="font-weight-light"
                  >Surname
              </label>
              <input type="text"
                className="form-control save"
                id="surname"
                style={estilos.input}
                onChange={handleChange}
                name="surname"
              />
            </div>

          </div>

          <div style={estilos.emailUsername}>
            <div class="form-group">
              <label
                for="cesarsanchez@gmail.com"
                style={estilos.labelFontSize}
                className="font-weight-light"
                  >Email
              </label>
              <input type="email"
                className="form-control save"
                id="email"
                aria-describedby="emailHelp"
                style={estilos.input}
                onChange={handleChange}
                name="email"
              />
            </div>
            &nbsp;
            &nbsp;
            <div class="form-group">
              <label
                for="cesarsanchez@gmail.com"
                style={estilos.labelFontSize}
                className="font-weight-light"
                  >Username
              </label>
              <input type="username"
                className="form-control save"
                id="username"
                style={estilos.input}
                onChange={handleChange}
                name="username"
              />
            </div>
          </div>

          <div class="form-group">
            <label
              for="Santa Julia 231 B° Colón"
              style={estilos.labelFontSize}
              className="font-weight-light"
                >Address
            </label>
            <input type="text"
              className="form-control save"
              id="address"
              style={estilos.input}
              onChange={handleChange}
              name="address"
            />
          </div>

          <div>
            <a style={estilos.changePassword} href="" data-toggle="modal" data-target="#exampleModal"data-whatever="@getbootstrap">Do you want to change the password?</a>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">TEN SHOP</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form onSubmit={(e) => handleSubmitChangePassword(e)}>
                  <div class="modal-body">
                      <div class="form-group">
                        <label for="recipient-name" class="col-form-label">New Password:</label>
                        <input autofocus requireds name="password1" style={estilos.inputsChange} onChange={(e) => handleChangePassword(e)} type="password" class="form-control" id="password1"/>
                        <div style={estilos.errorPassword}><p>{errorPassword1}</p></div>
                      </div>
                      <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Repeat Password Please:</label>
                        <input required name="password2" style={estilos.inputsChange} onChange={(e) => handleChangePassword(e)} type="password" class="form-control" id="password2"/>
                        <div style={estilos.errorPassword}><p>{errorPassword2}</p></div>
                      </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-secondary">Change Password</button>
                  </div>
                </form>
                </div>
              </div>
            </div>
          </div>

          <div style={estilos.botones}>
            {boton   ?
            (<div id="botonSave">
            <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={(e) => handleSave(e)}
            >
              Save
            </Button>
          </div>) :

            (<div id="botonUpload">
            <Button
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
            onClick={() => setBoton(true)}
            >
              Edit
            </Button>
          </div>
            )}
          </div>

        </form>
      </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.onlineUser
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loginUserCookie: () => dispatch(loginUserCookie()),
    updateOnlineUser: (id, body) => dispatch(updateOnlineUser(id, body)),
    updateUser: (id, body) => dispatch(updateUser(id, body))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(DatesMe)
