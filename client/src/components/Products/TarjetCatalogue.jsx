import React, {useEffect} from 'react';
import { connect } from "react-redux";
import "./TarjetCatalogue.css"
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2';
import {addCart, lsset, getReviews, getAllCart} from "../../actions";
import Rater from "react-rater";
import { useHistory } from 'react-router-dom';
var ls = require('local-storage');


 function Catalogo({price, name, stock, id, image, description,addCart, onlineUser, lsset, reviews,getReviews,getAllCart,cart,rating}) {
	const history = useHistory();
 	useEffect(()=> {
 	 //getReviews(id)
	 },[])
	 
	 useEffect(()=> {
        if(typeof onlineUser == "object"){
           getAllCart(onlineUser.id)
      }

	},[cart]);
	
 	//console.log("producto: ",name, "id: ", id, "reviews: ", reviews )
 	
	function addhome(data){
		//console.log(data.target.value);
		Swal.fire({
			title: data.target.value,
			text: "You want to add it to the cart?",
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: 'orange',
			cancelButtonColor: 'gray',
			confirmButtonText: 'Yes, Add To Cart!',
			reverseButtons: 'ture',
		  }).then((result) => {
			if (result.value) {
				if(typeof onlineUser == "object"){
				addCart(id, onlineUser.id);
				history.push('/')
			}else{
				ls.set('idProducts', [...ls.get('idProducts'),id]);
				lsset();
			}

			  Swal.fire(
				'ADDED PRODUCT!',
				'The product was added to your cart',
				'success'
			  )
			}
		  })

	  }


    const notCart = e => {
      e.preventDefault()
      Swal.fire({
        title: 'Oops!',
        text: 'Sold Out Product :(',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    };

	return (

		<div className="content">


						<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12"  >
							<div class="product-image-wrapper" id="tarjetita">

							<NavLink to ={`/product/${id}`} >

								<div class="single-products">
										<div class="productinfo text-center">
											<img className="ddd" src={image}/>
											<h2>{name}</h2>
											<p>$ {price}</p>


										</div>
										<div style ={{"display":"flex","justifyContent": "center"}}> 
					  		<Rater style={{'react-rater-active': 'blue'}} rating = {rating} interactive={false}/>

					  	</div>
										<div class="product-overlay">
											<div class="overlay-content">
												<h2 style= {{marginBottom:"60px"}}>{description}</h2>
												<a href="#" class="btn btn-default add-to-cart" style={{borderRadius:"10px"}} ><i class="fa fa-shopping-cart" ></i>Click for more detail</a>
											</div>
										</div>
								</div>
					  	</NavLink>


								{stock != 0 ? (<div class="  text-center">

								<button type="button" className="btn btn-secondary addhome" onClick={(e) => addhome(e)} id="op1" value={name}>
								<i class="fa fa-shopping-cart" style={{marginRight:'10px'}}></i>
								Add to cart
								</button>

              </div>) :
              (<div class="  text-center">
              <button type="button" className="btn btn-secondary notCart" onClick={(e) => notCart(e)} id="op1" value={name}>
              <i class="fa fa fa-ban" style={{marginRight:'7px'}}></i>
              Sold Out
              </button>
            </div>)}
							</div>
						</div>


		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		addCart: (diProduc, idUser) => dispatch(addCart(diProduc, idUser)),
		lsset: () => dispatch(lsset()),
		getReviews: (id) => dispatch(getReviews(id)),
		getAllCart: (id) => dispatch(getAllCart(id)),
		
	}
  }

  const mapStateToProps = state => {
	return {
	  onlineUser : state.onlineUser,
		reviews: state.reviews,
		cart: state.cart
	}
  }




export default connect(mapStateToProps, mapDispatchToProps)(Catalogo)
