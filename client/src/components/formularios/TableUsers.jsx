import React, { useState, useRef, useEffect } from 'react';
import { connect } from "react-redux";
import { getUsers } from "../../actions/index";

  function TableUsers ({update,elId, getUsers,users}) {
 
    useEffect(() => {
      getUsers();
      //console.log('adasdsas');
    },[])
  return (
    
              users && users.map((p) => {                 
                
              return (
                 <tr>
                  <th scope="row">{p.type}</th>
                  <td> {p.username} </td>
                  <td> {p.firstname} </td>
                  <td> {p.surname} </td>
                    <td>
                      <button type="button" class="btn btn-success" onClick={() => update(elId.current, users, elId.current = p.id)            
                      }>
                    <i className="fa fa-pencil"></i>
                      </button>
                    &nbsp;
                    {/* onClick={ (e) => deleteProduct(p.id)} */}
                    <button type="button" class="btn btn-danger"  >
                      <i className="fa fa-trash"></i>
                    </button>
                   </td>
                  </tr>
                  )
                }
          )
          
         )
      }
 const mapDispatchToProps = dispatch => {
   return {
    getUsers: () => dispatch((getUsers()))
   }
 }
 const mapStateToProps = state => {
   return {
     users: state.all_users
   }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(TableUsers)
  