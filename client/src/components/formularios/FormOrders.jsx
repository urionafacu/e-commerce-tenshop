import React from 'react';
import "./FormOrders.css";
import { connect } from "react-redux";
import { getOrders, updateProduct, getproductsxorders,finishorder, celarordenPanel,vaciarpanelorders, sendemailorder} from "../../actions";
import Page404 from "../Page404";
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';


function FormProduct({ orders, getOrders, onlineUser,getproductsxorders, productsxorder,finishorder, celarordenPanel,vaciarpanelorders,sendemailorder}) {
  const history = useHistory();

 
      function getord(select){
        let status = select.target.value;    
        for (let i = 1; i < 6; i++) {
          var boton = document.getElementById("op"+i);
          boton.className = 'btn btn-secondary btn-lg';
        }
        select.target.className = 'btn  btn-lg orange';
        getOrders(status)
    
      }
      function completeorder(select){
        let status = select.target.value;    
        for (let i = 1; i < 6; i++) {
          var boton = document.getElementById("op"+i);
          boton.className = 'btn btn-secondary btn-lg';
        }
        select.target.className = 'btn btn-lg orange';
        getOrders(status) 
      
      
      }

function orderpriv(data){
  console.log(data, "SGFDDFGFDg",data.target.value, "ASDASDASD")
  getproductsxorders(data.target.value)
}
function ordddddddd(data){
  console.log(data, "ASDASDASD")
  getproductsxorders(data)
}


function cancelaorden(data){
  //console.log(data)
  //console.log(productsxorder.userId)
  celarordenPanel(productsxorder.userId, productsxorder.id);
  vaciarpanelorders()
}


function terminarorden(data){
  let usuario = orders.find((el) => {
    if (el.userId == productsxorder.userId) {
      return el
    }
  });
 
  finishorder(productsxorder.userId, productsxorder.id);
  sendemailorder(usuario.user,productsxorder)
  Swal.fire({
    icon: 'success',
    title: 'The Order,'+ ' ' +productsxorder.id+' '+ 'is Complete',
    showConfirmButton: false,
    timer: 3000
  });
 
}
      
            
  if( onlineUser.type == 1){
      return (
  
          <div className="container">
  {/* <!-- Modal 1 --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
       {/*  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
        
       <div className="alertorderguille3"><span style={{color:"black", margin:'0px 10px 0px 10px'}}>Orders</span> Summary
        <button type="button btn-lg" class="close" data-dismiss="modal" aria-label="Close" style={{background:'white', fontSize:'40px', height:'45px'}}>
        <span aria-hidden="true">&times;</span>
        </button>
       </div>
        
    {/*     <div class="alert alert-danger col" role="alert">Order Summary
        
        <button type="button btn-lg" class="close" data-dismiss="modal" aria-label="Close">

          <span aria-hidden="true">&times;</span>
        </button>
        </div> */}



      </div>
      <div class="modal-body">
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Product</th>
      <th scope="col">Amount</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
  {productsxorder.products && productsxorder.products.map((p,i) =>{ return ( <tr>
      <th scope="row">{i}</th>
      <td>{p.name}</td>
      <td>{p.productsxorders.amount}</td>
      <td>{p.productsxorders.total_price}</td>
    </tr>)
    })}
  </tbody>
</table>
<div className="alertorderguille"><span style={{color:"black", margin:'0px 10px 0px 10px'}}>Orders</span> Details</div>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">Shipping</th>
      <th scope="col">Payment details</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td scope="row">{productsxorder.address}</td>
      <td>Credit Card</td>
    
    </tr>
      
    
  </tbody>
</table>
      </div>
      <div class="modal-footer" style={{display:"flex", justifyContent:"space-between"}}>
        
        <button type="button" class="btn btn-secondary btn-lg" data-dismiss="modal" onClick={(e) => cancelaorden(e)}>Cancell Order</button>
      
        <button type="button" class="btn btn-warning btn-lg" data-dismiss="modal" onClick={(e) => terminarorden(e)} >Confirm Order</button>
       
      </div>
    </div>
  </div>
</div>
   {/* <!-- Modal --> */}
   
     {/* <!-- Modal ---- 2 --> */}
<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
       {/*  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
        
       <div className="alertorderguille3"><span style={{color:"black", margin:'0px 10px 0px 10px'}}>Orders</span> Summary
        <button type="button btn-lg" class="close" data-dismiss="modal" aria-label="Close" style={{background:'white', fontSize:'40px', height:'45px'}}>
        <span aria-hidden="true">&times;</span>
        </button>
       </div>
        
    {/*     <div class="alert alert-danger col" role="alert">Order Summary
        
        <button type="button btn-lg" class="close" data-dismiss="modal" aria-label="Close">

          <span aria-hidden="true">&times;</span>
        </button>
        </div> */}



      </div>
      <div class="modal-body">
      <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Product</th>
      <th scope="col">Amount</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
  {productsxorder.products && productsxorder.products.map((p,i) =>{ return ( <tr>
      <th scope="row">{i}</th>
      <td>{p.name}</td>
      <td>{p.productsxorders.amount}</td>
      <td>{p.productsxorders.total_price}</td>
    </tr>)
    })}
  </tbody>
</table>
<div className="alertorderguille"><span style={{color:"black", margin:'0px 10px 0px 10px'}}>Orders</span> Details</div>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">Shipping</th>
      <th scope="col">Payment details</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td scope="row">{productsxorder.address}</td>
      <td>Credit Card</td>
    </tr>
      
    
  </tbody>
</table>
      </div>
      
    </div>
  </div>
</div>
   {/* <!-- Modal --> */}
          <section class="contact-block"></section>
              <section class="contact-block jumbotron">
                  <div class="container">

  
                      <div class="col-md-12 contact-form alert alert-secondary" style={{paddingBottom:"25px"}}>
                      <div className="alertaguille">Management  <span style={{color:"black", marginLeft:"10px"}}>Orders</span></div>
                         <form id={'formulario'} style={{display:''}} >
  
                              <button type="button" className="btn btn-secondary btn-lg" onClick={(e) => getord(e)} id="op1" value="allorders">ALL ORDERS</button>
                              &nbsp; 
                              <button type="button" class="btn btn-secondary btn-lg" onClick={(e) => getord(e)} id="op2" value="created">CREATED ORDERS</button>
                              &nbsp; 
                              <button type="button" class="btn btn-secondary btn-lg" onClick={(e) => getord(e)} id="op3" value="cancelled">CANCELLED ORDERS</button>
                              &nbsp; 
                              <button type="button" class="btn btn-secondary btn-lg" onClick={(e) => getord(e)} id="op4" value="processing"><a href=""></a> PROCESSING ORDERS</button>
                              &nbsp; 
                              <button type="button" class="btn btn-secondary btn-lg" onClick={(e) => completeorder(e)} id="op5" value="complete"><a href=""></a> COMPLETE ORDERS</button>
                              
                              
                              &nbsp;                                                 
                              
                          </form>
                          
                      </div>
                      {orders.length !== 0 && <div class="col-md-12 contact-form alert alert-dark">
                          <div className="alertaguille2">Orders <span style={{color:"white", marginLeft:"10px"}}>List</span></div>
                          <table class="table table-hover">
                               <thead>
                                  <tr className="table-danger table-primary">
                                      <th scope="col">ID</th>
                                      <th scope="col">OWNER</th>
                                      <th scope="col">STATUS</th>
                                      <th scope="col">DETAILS</th>
                                      <th scope="col">TOTAL PRICE</th>
  
                                  </tr>
                               </thead>
  
                                  <tbody >
                                    {  orders.map((p, i) => {            

                                                        return ( <tr>
                                                                      <th scope="row"> {p.id} </th>
                                                                      <td> <span className="palabras"> {p.user.firstname.toUpperCase()} {p.user.surname.toUpperCase()}</span> </td>
                                                                      <td>
                                                                      <span className="palabras">  {p.status.toUpperCase()}</span>
                                                                      </td>
                                                                      {p.status== "processing" && <td>  <span className="palabras">   <button type="button" value={p.id} onClick={(e) => orderpriv(e)} class="btn btn-warning" data-toggle="modal" data-target="#exampleModal">View Order</button> </span></td>} 
                                                                      {p.status !== "processing" && <td>  <span className="palabras">  <button type="button" value={p.id} onClick={(e) => ordddddddd(p.id)}> <span className="palabras" data-toggle="modal" data-target="#exampleModal2">  {p.updatedAt.slice(0,10)+" | "+p.updatedAt.slice(11,19)}</span></button></span></td>}
                                                                    <td>  <span className="palabras"> $ {p.total_price}</span></td>
                                                                  </tr>
                                                                )
                                          })
                                      }
                                  </tbody>
  
                          </table>
                      </div>
                    }
  
                  </div>
                  
              </section>
  
          </div>
      );
    }else{
      return (
        <div>
        <Page404 />
        </div>
      )
     }
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      getOrders: (status) => dispatch(getOrders(status)),
      getproductsxorders: (id) => dispatch(getproductsxorders(id)),
      finishorder: (id, idd) => dispatch(finishorder(id, idd)),
      celarordenPanel: (idus,idpr) => dispatch(celarordenPanel(idus,idpr)),
      vaciarpanelorders: () => dispatch(vaciarpanelorders()),
      sendemailorder: (id, body) => dispatch(sendemailorder(id, body)),

      
      
    }
  }
  
  const mapStateToProps = state => {
    return {
    
      orders: state.getorders,  
      onlineUser: state.onlineUser,
      productsxorder: state.productsxorder,
   
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(FormProduct)