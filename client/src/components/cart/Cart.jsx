import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { getAllCart,completeCart, updateCart, cancellCart, priceOrder, getAllProducts, vaciarls, deleteProductCart, getSumaryCart, vaciarpanelorders} from "../../actions";
import Swal from 'sweetalert2';
import './Cart.css'
var ls = require('local-storage');

function Cart({products, getAllCart, getcart, onlineUser, updateCart, completeCart, cart, cancellCart, priceOrder,getAllProducts, vaciarls, deleteProductCart, sumary_cart, getSumaryCart, vaciarpanelorders}) {
    const history = useHistory();

  React.useEffect(() => {
    if(typeof onlineUser === "object"){
    var idUser = onlineUser.id;
    getAllCart(idUser);
  }
  getAllProducts()

  }, [])


  React.useEffect(() => {
    getSumaryCart(onlineUser.id)
  }, [cart, getcart])


  var arr = [];
  if(ls.get('idProducts').length){
    ls.get('idProducts').forEach(function(ele){
       return arr.push(parseInt(ele))
    })
   console.log("ARRINVITADO", arr, ls.get('idProducts'));
  }

  if (getcart[0]) {
    getcart.forEach(element => {
    arr.push(element.product_id)
    });
  }

  const productosConSubtotales = useRef([])

  const calculaTotal = () => {
    let previo_total = 0;
    productosConSubtotales.current.forEach((item, i) => {
      previo_total += item.subtotal
    });
    let taxes = previo_total * 0.21;
    return previo_total + taxes + 400
  };

  if (arr.length && productosConSubtotales.current.length !== arr.length) {
    products.forEach(e => {
      if (arr.includes(e.id)) {
        e.subtotal= e.price
        e.cantidad=1
        productosConSubtotales.current.push(e)
      }
    })

  }

  const shipping = 400; // envío
  const taxes = useRef(0) // impuesto
  const total = useRef(0) // total


  const handleCantidadDelProducto = (id, price) => {

    var subtotal_carrito = 0;

    var cantidad = document.getElementById(id+"input").value;

    var resultado = cantidad * price;

    document.getElementById("total_precio_producto"+id).innerHTML = "$"+resultado;

    productosConSubtotales.current.forEach(el => {
      if (el.id == id) {
        el.subtotal = resultado;
        el.cantidad = el.subtotal/el.price
      };
    });


    productosConSubtotales.current.forEach(el => {
      if (el.subtotal) {
        subtotal_carrito += el.subtotal;
      }
    })

    taxes.current = subtotal_carrito * 0.21;

    total.current = taxes.current + subtotal_carrito + shipping;

    document.getElementById("subtotal").innerHTML = "$"+subtotal_carrito;

    document.getElementById("taxes").innerHTML = "$"+taxes.current;

    document.getElementById("total").innerHTML = "$"+total.current;
  };

  function alertt(e){
    e.preventDefault()
    Swal.fire({
        title: 'Submit your Address Please',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirm Address',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
            if(result.isConfirmed){
              if (total.current === 0) {
                priceOrder(onlineUser.id, calculaTotal())
                updateCart(onlineUser.id, productosConSubtotales.current);
                completeCart(onlineUser.id, result.value);
                vaciarpanelorders()
              } else {
                priceOrder(onlineUser.id,total.current);
                updateCart(onlineUser.id, productosConSubtotales.current);
                completeCart(onlineUser.id, result.value);
                vaciarpanelorders()                

              }

                vaciarls()
                arr = [];
                Swal.fire({
                  title: `Order completed. Thanks You!`,
                  icon: 'success'
                })

            }
        }
      });
    };

    function alerttinvited(e){
      e.preventDefault()
      Swal.fire({
        icon: 'error',
        title: 'Ups...!',
        html: '<span class="aaaa">Please <b>login</b> or <b>register</b> to finalize your purchase. Thank you!</span>',
        footer: '<a class="btn btn-info" href="http://localhost:3000/signin">LOG IN</a>'+ '&nbsp &nbsp' +'<a class="btn btn-warning" href="http://localhost:3000/signup">SIGN UP</a>'
      })
      };

    function cancell(e){
     // console.log("LINEA 106 asdasdasd",total.current)
     e.preventDefault()
     if(typeof onlineUser == "object"){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
              //console.log(result);
            if (result.value) {
              cancellCart(onlineUser.id)
              Swal.fire(
                'Deleted!',
                'Your cart has been clear.',
                'success'
              );
            }
          })
        }else{
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
              //console.log(result);
            if (result.value) {
              ls.set('idProducts', []);
              vaciarls()
              arr = [];
              Swal.fire(
                'Deleted!',
                'Your cart has been clear.',
                'success'
              );
              history.push('/')
            }
          });
        }
    }
    // FE980F color amarillo de la pagina

  const handleDeleteProductCart = id => {

    if(typeof onlineUser == "object"){
    var order = getcart[0].order_id;
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to remove the product from the cart",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        //console.log(result);
      if (result.value) {
        deleteProductCart(order, id)
        Swal.fire(
          'Deleted!',
          'The product has been clear.',
          'success'
        );
      }
    })

  }else{
    let arry = [];
    ls.get('idProducts').forEach(function(ele){
        return arry.push(parseInt(ele))
      });
    const resultadoaa = arry.filter(word => word !== id);
      //console.log(result);
      Swal.fire({
        title: 'Are you sure?',
        text: "You are about to remove the product from the cart",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          //console.log(result);
        if (result.value) {
          ls.set('idProducts', []);
          ls.set('idProducts', resultadoaa);
          history.push('/cart')
          Swal.fire(
            'Deleted!',
            'The product has been clear.',
            'success'
          );
        }
      })




  }


  };

  const iniciaValoresDeLosProductos = () => {
    if (arr.length && document.getElementsByClassName("inputCantidad")) {
      products.forEach((item, i) => {
        if (arr.includes(item.id)) {
          document.getElementById(item.id+"input").value = "1";
        };
      });
    };
  };




     return (
       arr.length !== 0 ?
        (<section id="cart_items">
             <div class="container">
             <div class="row offspace">
             <div class="view-set-block">

                 <div class="col-md-8 col-sm-8 col-xs-12" style={{paddingTop:'0px'}}>

      <div class="asdasd">
			<div class="table-responsive cart_info">
				<table class="table table-condensed">
					<thead >
						<tr class="cart_menu" style={{backgroundColor:'orange'}}>
							<td class="image">Item</td>
							<td class="name">Name</td>
							<td class="price">Price</td>
							<td class="quantity">Quantity</td>
							<td class="total">Total</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
                    {
                        arr.length !== 0 &&
                        products.map((e, i) => {
                            if(arr.includes(e.id)){
                                return(
						<tr id={"fila"+e.id}>
							<td class="cart_product">
								<a href=""><img width={'150'} src={e.image} alt=""/></a>
							</td>
							<td class="name">
								<h4>{e.name}</h4>
							</td>
							<td class="cart_price">
								<p>${e.price}</p>
							</td>
							<td class="cart_quantity">
								<div class="cart_quantity_button">
									{/* <a class="cart_quantity_up" id="boton_cantidad_mas" onClick={handleBotonMas}> - </a>
									<input class="cart_quantity_input" type="quantity" name="quantity" min="1" max={e.stock} value="1" autocomplete="off" size="2"/>
									<a class="cart_quantity_down" id="boton_cantidad_menos"> + </a> */}

                  <input min="1" max={e.stock} defaultValue="1" type="number" id={e.id+"input"} onClick={() => handleCantidadDelProducto(e.id, e.price)} className="form-control inputCantidad" style={{width: "90%", borderColor:"orange", textAlign:'center'}} />

								</div>
							</td>
							<td class="cart_total">
								<p class="cart_total_price" id={"total_precio_producto"+e.id}>${e.price}</p>
							</td>
							<td class="cart_delete">
								<a class="cart_quantity_delete" onClick={() => handleDeleteProductCart(e.id)}><i class="fa fa-times"></i></a>
							</td>
						</tr>
                        )
                        }
                        {
                        }
                        }) }

					</tbody>
				</table>
        </div>

			</div>
		</div>
        <div class="col-sm-4">
        <div class="breadcrumbs"style={{width:'100%', textAlign:'center', height:'51px', backgroundColor:'orange'}}>
				<ol class="breadcrumb" style={{width:'100%', marginBottom:'0px'}}>
				  <li class="active" style={{marginBottom:'0px', color:'white'}}>Shopping Cart</li>
				</ol>
			</div>
					<div class="total_area" style={{width:'100%'}}>
						<ul style={{paddingLeft: '0px'}}>
							<li>Cart Sub Total <span id="subtotal">${sumary_cart.contadorSubtotal ? sumary_cart.contadorSubtotal : "0"}</span></li>
							<li>Eco Tax <span id="taxes">${sumary_cart.contadorEcoTax ? sumary_cart.contadorEcoTax : "0"}</span></li>
							<li>Shipping Cost <span id="shipping">$400</span></li>
							<li>Total <span id="total">${sumary_cart.total ? sumary_cart.total : "0"}</span></li>
						</ul>
            <div style={{display:'flex', justifyContent:'center'}}>

							<a class="btn btn-default update" href="" onClick={(e) => cancell(e)}>Cancel</a>
              {
                typeof onlineUser === "object" ? (<a class="btn btn-default check_out" href="" onClick={(e) => alertt(e)}>Check Out</a>)
                : (<a class="btn btn-default check_out" href="" onClick={(e) => alerttinvited(e)}>Check Out</a>)
              }

            </div>

					</div>
				</div>
                </div>
                </div>
                </div>

        </section>)

        : (<div className="alertacartguille">Your  <span style={{color:"black", margin:'0px 10px 0px 10px'}}>Cart</span> is Empty!</div>
        )

     );
 };

 const mapDispatchToProps = dispatch => {
    return {
        getAllCart: (idUser) => dispatch(getAllCart(idUser)),
        completeCart: (idUser, addres) => dispatch(completeCart(idUser, addres)),
        updateCart: (idUser, body) => dispatch(updateCart(idUser, body)),
        cancellCart: (idUser) => dispatch(cancellCart(idUser)),
        priceOrder: (id, total) => dispatch(priceOrder(id, total)),
        getAllProducts: () => dispatch(getAllProducts()),
        vaciarls: () => dispatch(vaciarls()),
        deleteProductCart: (orderId, productId) => dispatch(deleteProductCart(orderId, productId)),
        getSumaryCart: (id) => dispatch(getSumaryCart(id)),
        vaciarpanelorders: () => dispatch(vaciarpanelorders()),


    }
  }

  const mapStateToProps = state => {
    return {
      products: state.all_products,
      getcart: state.getcart,
      onlineUser : state.onlineUser,
      setid: state.setid,

      sumary_cart: state.sumary_cart

    }
  }




export default connect(mapStateToProps, mapDispatchToProps)(Cart)
