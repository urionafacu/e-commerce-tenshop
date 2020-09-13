import React, { useState, useEffect } from "react"
import "./NavBar.css"
import SearchBar from "./SearchBar.jsx"
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";
import { userLogout } from "../actions/index.js"
import Swal from 'sweetalert2'
import imagenA from '../image/imagen1.png';
import imagenB from '../image/slider1.png';
import imagenC from '../image/slider2.png';
import imagenD from '../image/slider3.png';

function SliderImage() {

  const estilos = {
    imagen: {
      height: "50px"
    },
  }

    return (
        <section id="slider">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<div id="slider-carousel" class="carousel slide" data-ride="carousel">
						<ol class="carousel-indicators">
							<li data-target="#slider-carousel" data-slide-to="1" class="active"></li>
							<li data-target="#slider-carousel" data-slide-to="2" ></li>
							<li data-target="#slider-carousel" data-slide-to="3" ></li>
							<li data-target="#slider-carousel" data-slide-to="4" ></li>
						</ol>

						<div class="carousel-inner">
							<div class="item active" >
								<div class="col">
									<img src={imagenA}  class="  img-responsive img-fluid" alt="Responsive image"  />						
								</div>
							</div>
							<div class="item ">
								<div class="col">
									<img src={imagenB} class="  img-responsive img-fluid" alt="Responsive image"   />								
								</div>
							</div>
							<div class="item " >
								<div class="col">
									<img src={imagenC}  class="  img-responsive img-fluid" alt="Responsive image"  />						
								</div>
							</div>
							<div class="item " >
								<div class="col">
									<img src={imagenD}  class="  img-responsive img-fluid" alt="Responsive image"   />						
								</div>
							</div>
						</div>

						<a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="prev">
							<i class="fa fa-angle-left"></i>
						</a>
						<a href="#slider-carousel" class="right control-carousel hidden-xs" data-slide="next">
							<i class="fa fa-angle-right"></i>
						</a>
					</div>

				</div>
			</div>
		</div>
	</section>






 )
}
const mapStateToProps = state => {
    return {
        // onlineUser: state.onlineUser,
        // getcart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
  return {
    // userLogout: () => dispatch(userLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderImage)
