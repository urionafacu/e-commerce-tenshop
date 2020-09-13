import React, { useState, useRef, useEffect } from 'react';
import TableUsers from "./TableUsers";
import { connect } from "react-redux";
import { getUsers , updateUser, onlineUserError, deleteUser} from "../../actions";
import Swal from 'sweetalert2';
import Page404 from "../Page404";
import { useHistory } from 'react-router-dom';




function FormAdmin({ updateUser, users, onlineUser, getUsers, deleteUser}) {
  const history = useHistory();
  useEffect(() => {
    getUsers()

  },[])

  const [input, setInput] = useState([])

  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  var elId = useRef(null)
   function update(id, users) {
     users.find((e) => {
       if (e.id == id) {
         setInput(e)
         document.getElementById("username").value = e.username;
         document.getElementById("firstname").value = e.firstname;
         document.getElementById("surname").value = e.surname;
         document.getElementById("type").value = e.type;
         var form = document.getElementById('formulario');
         form.style.display = ''
         return;
       }
     })
   }
   elId = useRef(null)
  const handleSubmit = function(e) {
    updateUser(elId.current, input)
    //getUsers()
    var form = document.getElementById('formulario');
        form.style.display = 'none'

    console.log(elId.current)
    console.log(input)
    getUsers();
    Swal.fire(
      'Good job!',
      'User updated successfully',
      'success'
    )    
    //getUsers()
  }


  function deleUser(idUser){
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this User?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        deleteUser(idUser)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

    // alert('Delete success Category')

  }



 if(onlineUser.type == 1){
    return (
<div>
        <section id="cart_items">
		<div >
    <div class="col-md-8">
			<div class="table-responsive cart_info">
				<table class="table table-condensed">
					<thead>
						<tr class="cart_menu">
              <td class="total">Actions</td>
							<td class="price">Type</td>
              <td class="quantity">Username</td>
              <td class="price">Name</td>
							<td class="delete">Surname</td>

						</tr>
					</thead>
					<tbody>
          {users && users.map((p) => {
             return (
						<tr>
              <td class="cart_total">
							<button style={{marginRight: '2px'}} type="button" class="btn btn-success" onClick={(e) => update(elId.current = p.id, users)
                                            }>
              <i class="fa fa-pencil"></i>
              </button>

              <button type="button" class="btn btn-danger" onClick={(e)=>deleUser(p.id)}>
              <i class="fa fa-times"></i>
              </button>
							</td>
							<td class="cart_price">
								<p>{ p.type == 1 && 'ADMIN' ||  p.type == 2 && 'USER'}</p>
							</td>
                <td class="cart_quantity">
								<p>{p.username}</p>
							</td>
              <td class="cart_quantity">
								<p>{p.firstname}</p>
							</td>
              <td class="cart_quantity">
								<p>{p.surname}</p>
							</td>

						</tr>
                )
                               }
                        )}
					</tbody>
				</table>
			</div>
		</div>
    </div>
  </section>
  <div class="container">
			<div class="row">
				<div class="col-sm-3 my-5" style={{"marginTop":"25px"}}>
					<div class="login-form">

                        <form id={'formulario'} onSubmit = {handleSubmit} style={{display:'none'}}>
                          <h3>Management <span>Users</span></h3>
                          <div class="form-group row">
                             <input type="text" class="form-control form-control-lg" name="username" placeholder="Username" id="username" onChange={handleInputChange} required="true"/>
                             
                           </div>
                           <div class="form-group row">
                             <input type="text" class="form-control form-control-lg" name="firstname" placeholder="Firstname" id="firstname" onChange={handleInputChange} required="true"/>

                           </div>
                           <div class="form-group row">
                             <input type="text" class="form-control form-control-lg" name="surname" id="surname" onChange={handleInputChange} required="true"/>

                           </div>
                         <div class="form-group row">
                             <select class="form-control form-control-lg" name="type" placeholder="Type" id="type" onChange={handleInputChange} required="true">
                               <option name='type' value='1'>Admin</option>
                               <option name='type' value='2'>User</option>
                             </select>
                           </div>
                           <div class="form-group row">
                               <button  type = 'submit' style={{backgroundColor: "orange", borderRadius: "10px" }} class="submit-btn">Submit</button>
                           </div>
                         </form>
					</div>
				</div>
			</div>
		</div>
  </div>
    );
  }else{
    return(
      <div>
      <Page404 />
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (id, body) => dispatch(updateUser(id, body)),
    getUsers: () => dispatch(getUsers()),
    deleteUser: (id) => dispatch(deleteUser(id))
  }
}

const mapStateToProps = state => {
  return {
    users: state.all_users,
    onlineUser : state.onlineUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAdmin)
