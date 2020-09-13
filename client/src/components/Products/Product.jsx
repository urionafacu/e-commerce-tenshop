import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { images,addCart, addReview , getReviews, getUsers, getOrders, getOrdersxproduct, lsset, getAllCart, getAllProducts} from "../../actions";
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import "./Product.css";
import Rater from 'react-rater' // PARA INSTALAR --> npm install --save react-rater
import 'react-rater/lib/react-rater.css';
var ls = require('local-storage');

function Product({getImages, addCart, id, products, searchProducts, onlineUser, reviews,addReview,getReviews, all_users,getUsers, newrev,getOrders,orders,getOrdersxproduct,ordersxproduct, lsset, getAllCart, getAllProducts}) {
    const [input,setInput] = useState({});
    const [inputRating, setInputRating] = useState({});



    useEffect(()=> {
      getAllProducts()
        getUsers();
				getReviews(id);
				getOrders("complete")
        getOrdersxproduct(id)

    },[newrev]);

    function handleInputChange (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function invited () {
      ls.set('idProducts', [...ls.get('idProducts'),id]);
      lsset();
      Swal.fire({
        icon: 'success',
        title: 'Your cart has been update!',
        showConfirmButton: false,
        timer: 1500
      })
      //console.log("EEEEEEEEEEE",ls.get('idProducts'))
  }
    var aux = {
        username: onlineUser.username,
        review: {
        rating: inputRating,
        comments: input.comments
    }
}
     function handleSubmit (e) {
      e.preventDefault()
         addReview(aux, id);
         getReviews(id);

    }
    if(typeof onlineUser === "object"){
    var idUser = onlineUser.id;
    }
    var todosLosProductos = products.concat(searchProducts);
    var resultado = todosLosProductos.find((el) => {
      if (el.id == id) {
        return el
      }
    })
    var acum = 0;
    for ( let i = 0; i < reviews.length; i++) {
      acum = acum + reviews[i].rating;
    }
		function promedy(acum, length){
			var promedy = acum / length
			if (length === 0){
				return 0
			}
			promedy.toFixed(2)
			return promedy
		}

     function exitoAdd(){

        addCart(resultado.id, idUser);

        Swal.fire({
            icon: 'success',
            title: 'Your cart has been update!',
            showConfirmButton: false,
            timer: 1500
          })
          getAllCart(idUser)
     }


     function soldout(){
        Swal.fire({
            icon: 'error',
            title: 'Oops... Sorry',
            text: 'Sold out',
          })
     }


    function onRate(rating) {
			console.log(rating)
     setInputRating(rating)

		};
		var flag = false
    if (onlineUser === 0 || onlineUser === 1) {
      flag = true
    } else {
    flag = false
    }
    var flagOrders = false
     reviews && reviews.map((p) => {if (p.userId === onlineUser.id) flag = true})
        if (orders.length > 0){
          orders.map((or) => {
            if (or.userId === onlineUser.id){
              ordersxproduct.map((op) => {if(op.order_id === or.id){if(or.status === "complete"){flagOrders = true}}} )
            }
          })
        }
    if(!flagOrders){flag = true}

  //console.log("flag", flag)
//
  function changeImage(image, idimg) {

    if(idimg === 1){
      var element = document.getElementById("img1");
      element.style.opacity =' 0.3';
    }else if(document.getElementById("img1")){
      var element = document.getElementById("img1");
      element.style.opacity ='';
    }

    if(idimg === 2){
      var element = document.getElementById("img2");
      element.style.opacity =' 0.3';
    }else if(document.getElementById("img2")){
      var element = document.getElementById("img2");
      element.style.opacity ='';
    }

    if(idimg === 3){
      var element = document.getElementById("img3");
      element.style.opacity =' 0.3';
    }else if(document.getElementById("img3")){
      var element = document.getElementById("img3");
      element.style.opacity ='';
    }

    if(idimg === 4){
      var element = document.getElementById("img4");
      element.style.opacity =' 0.3';
    }else if(document.getElementById("img4")){
      var element = document.getElementById("img4");
      element.style.opacity ='';
    }


    document.getElementById("imgClickAndChange").src = image;
}

//
// ///harcod cambiar por DB
//
var img1 = resultado.image2;
var img2 = resultado.image3;
var img3 = resultado.image4;
var img4 = resultado.image;


// var idImagenDB = 2
// console.log('nameeeeee', images[idImagenDB - 1].id)
// console.log('IDDDDDDD', id)

if (resultado){
    return (

     <section className="container" style={{marginTop: "10px"}}>

         <div class="product-details">
						<div class="col-sm-5">
							<div class="view-product">
								<img id="imgClickAndChange" src={resultado && resultado.image} alt="" />
								<h3>{resultado && resultado.name}</h3>
							</div>
							<div id="similar-product" class="carousel slide" data-ride="carousel">

								    <div class="carousel-inner">
										<div class="item active">
										  {!!img1 ? (<a  onMouseOver={(e)=> changeImage(img1, 1)}><img id={'img1'} src={img1} width='84' height='85' alt=""/></a>) : <div></div>}
										  {!!img2 ? (<a  onMouseOver={(e)=> changeImage(img2, 2)}><img id={'img2'} src={img2} width='84' height='85' alt=""/></a>) : <div></div>}
										  {!!img3 ? (<a  onMouseOver={(e)=> changeImage(img3, 3)}><img id={'img3'} src={img3} width='84' height='85' alt=""/></a>) : <div></div>}
                      <a  onMouseOver={(e)=> changeImage(img4, 4)}><img id={'img4'} src={img4} width='84' height='85' alt=""/></a>
										</div>
									</div>

							</div>

						</div>
						<div  class="col-sm-7 title text-center">
							<div class="product-information">
								<h2>{resultado && resultado.name}</h2>
								<p>{resultado && resultado.description}</p>
								{/* <img src="images/product-details/rating.png" alt="" /> */}
								<span>
									<span>US $ {resultado && resultado.price}</span>
                    {/*resultado.stock == 0 ? (<div> <button type="button" onClick={() => soldout()} class="btn btn-danger"> Sold Out  <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i></button></div>) : (<div> <button type="button" onClick={() => exitoAdd()} class="btn btn-success"> Add To Cart  <i  class="fa fa-shopping-cart fa-lg"></i></button> </div>)*/}
                    {resultado && resultado.stock == 0 ? (<div> <button type="button" onClick={() => soldout()} class="btn btn-danger"> Sold Out  <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i></button></div>) : typeof onlineUser !== "object" ?
                    (<div> <button type="button" onClick={() => invited()} class="btn btn-danger"> Add To Cart  <i class="fa fa-shopping-cart fa-lg"></i></button></div>) :
                    (<div> <button type="button" onClick={() => exitoAdd()} class="btn btn-success"> Add To Cart  <i  class="fa fa-shopping-cart fa-lg"></i></button> </div>)}
								</span>
								<p><b>Availability:</b> {resultado && resultado.stock}</p>
								<p><b>State:</b> New</p>
								<p><b>Shipping:</b> $400</p>
                <p><b>Rating: </b> 	<Rater total={5} rating={promedy(acum, reviews.length)} interactive = {false} style={{fontSize:"30px"}} onRate={({rating}) => onRate(rating)} /></p>
								<a><img style={{margin: "0 auto"}}  src="https://cuidar.org/images/icons/formasdepago/mini_tarjetas.jpg" width="200" height="350" class="share img-responsive"  alt="" /></a>
							</div>
						</div>
					</div>



        {!flag ? <div class="tab-pane" id="reviews" >
						<div class="col-sm-12">
	    			  <div class="contact-form">
               <form id="main-contact-form" class="contact-form row" name="contact-form" >


                    <div class="form-group col-md-8">
				                <input type="text" onChange={handleInputChange}  style={{height: "60px", fontSize:"20px"}}  name = "comments" id="review" class="form-control" required="required" placeholder="Add comment"/>
                        Add Rating: <Rater total= {5}  onRate={({rating}) => onRate(rating)} style={{fontSize:"30px", alignSelf:"flexStart", height:"30px"}}/>

				                <input onClick={(e)=> handleSubmit(e)} type="submit" name="submit" class="btn btn-primary pull-right" value="Leave my review."/>
				            </div>
				        </form>
                </div>
            </div>

          </div>:''}



        {reviews && reviews.map (p =>
        <div class="tab-pane fade active in" id="reviews" >

								<div class="col-sm-12">
                  <div class='container alert alert-success'>

                    <ul>
                      <li><a><i class="fa fa-user"></i>
                      {all_users.map(u => {if( p.userId === u.id) return ("  " + u.firstname.charAt(0).toUpperCase()+u.firstname.slice(1) + " " + u.surname.charAt(0).toUpperCase()+u.surname.slice(1))})}
                      </a>
                      </li>
                      <li><a><i class="fa fa-calendar-o"></i>
                      {p.createdAt.slice(0,10)}
                      </a></li>
                    </ul>

                    <p>{p.comments}</p>
                    <p> Rating:
                    <Rater total={5} rating= {p.rating}interactive = {false} style={{fontSize:"30px"}}  />
                    </p>
                    </div>
                  </div>
							</div>
              	)}

         </section>



    );}else {
      return(
        <div>dryhgh</div>
      )
    }
};
const mapDispatchToProps = dispatch => {
    return {
        addCart: (diProduc, idUser) => dispatch(addCart(diProduc, idUser)),
        addReview: (input, idProduct) => dispatch(addReview(input, idProduct)),
        getReviews: (id) => dispatch(getReviews(id)),
				getUsers: () => dispatch(getUsers()),
				getOrders: (status) => dispatch(getOrders(status)),
        getOrdersxproduct: (idProd) => dispatch(getOrdersxproduct(idProd)),
        lsset: () => dispatch(lsset()),
        getAllCart: (id) => dispatch(getAllCart(id)),
        getAllProducts: () => dispatch(getAllProducts()),



    }
  }

  const mapStateToProps = state => {
    return {
      products: state.all_products,
      searchProducts: state.search_result,
      onlineUser : state.onlineUser,
      reviews: state.reviews,
      all_users: state.all_users,
			newrev: state.newrev,
			orders: state.getorders,
			ordersxproduct: state.ordersxproduct
    }
  }




export default connect(mapStateToProps, mapDispatchToProps)(Product)
