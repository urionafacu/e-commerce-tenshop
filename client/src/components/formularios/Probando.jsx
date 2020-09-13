import React, { useState, useRef, useEffect } from 'react';
import TableProducts from "../Products/TableProducts";
import { connect } from "react-redux";
import { getUsers} from "../../actions"
import Swal from 'sweetalert2';
import ProbandoUsers from './ProbandoUsers';


function Probando({getUsers, users}) {
  
  
  useEffect(() => {
    
    getUsers() 
        
  }, [])
  
  const [input, setInput] = useState({});
      
  

  var categ = [];///ARARAY CATTTTEGORIASSSSS

  var elId = useRef(null)
  
  function update(id, prod) {        
    prod.find((e) => {
      if (e.id == id) {
        setInput(e)
        document.getElementById("name").value = e.name;            
        document.getElementById("description").value = e.description;
        document.getElementById("price").value = e.price;
       

        return;
      }
    })
  }

  
  
         

    return (
      
        <div className="container"> 
            <section class="contact-block"> 
            <div>
            {
              users && users.map((p) => {            
              return (
                 <tr>
                  <th scope="row"> {p.type} </th> 
                  <td > {p.username} </td>
                  <td > {p.firstname} </td>
                  <td > {p.surname} </td>
                    <td>
                      <button type="button" class="btn btn-success" onClick={() => { update(elId.current, users); elId.current = p.id            
                      }}>
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
          }
    </div>            
            </section>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
  return {
     
    getUsers: ()=> dispatch(getUsers())
    

  }
}

const mapStateToProps = state => {
  return {
    categxproducts: state.categores_x_products,    
    categories: state.categories,
    products: state.all_products,   
    users: state.all_users 
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Probando)