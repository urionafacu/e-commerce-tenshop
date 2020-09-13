import React from "react"
import { connect } from "react-redux";
import { userLogout } from "../actions/index.js"


function NavBar({}) {
     
    return (

        <footer id="footer">
		 <div class="footer-top">
			<div class="container">
				<div class="row">
                <div class="col-sm-12 text-center"> 
					<div class='content fluid alert alert'>
						
					</div>                     

					<div class="contactinfo social-icons">
								<div class="content">
									<ul>
										<li><a href=""><i class="fa fa-phone"></i> +2 95 01 88 821</a></li>
										<li><a href=""><i class="fa fa-envelope"></i> info@tenshop.com</a></li>
										<li><a href=""><i class="fa fa-facebook"></i></a></li>
										<li><a href=""><i class="fa fa-twitter"></i></a></li>
										<li><a href=""><i class="fa fa-linkedin"></i></a></li>
										<li><a href=""><i class="fa fa-dribbble"></i></a></li>
										<li><a href=""><i class="fa fa-google-plus"></i></a></li>
									</ul>
								</div>
							</div>					 
					</div>
				</div>
			</div>
		</div>
		
		<div class="footer-widget">
			<div class="container">
				<div class="row">
					<div class="col-sm-2">
						<div class="single-widget">
							<h2>Service</h2>
							<ul class="nav nav-pills nav-stacked">
								<li><a href="">Online Help</a></li>
								<li><a href="">Contact Us</a></li>
								<li><a href="">Order Status</a></li>
								<li><a href="">Change Location</a></li>
								<li><a href="">FAQ’s</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-2">
						<div class="single-widget">
							<h2>Quock Shop</h2>
							<ul class="nav nav-pills nav-stacked">
								<li><a href="">T-Shirt</a></li>
								<li><a href="">Mens</a></li>
								<li><a href="">Womens</a></li>
								<li><a href="">Gift Cards</a></li>
								<li><a href="">Shoes</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-2">
						<div class="single-widget">
							<h2>Policies</h2>
							<ul class="nav nav-pills nav-stacked">
								<li><a href="">Terms of Use</a></li>
								<li><a href="">Privecy Policy</a></li>
								<li><a href="">Refund Policy</a></li>
								<li><a href="">Billing System</a></li>
								<li><a href="">Ticket System</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-2">
						<div class="single-widget">
							<h2>About Ten/Shop</h2>
							<ul class="nav nav-pills nav-stacked">
								<li><a href="">Company Information</a></li>
								<li><a href="">Careers</a></li>
								<li><a href="">Store Location</a></li>
								<li><a href="">Affillate Program</a></li>
								<li><a href="">Copyright</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-3 col-sm-offset-1">
					<div class="single-widget">
					<h2>Contact direct Ten/Shop</h2>
					</div>
						<div className="input-group">                
								<form class="form-inline my-2 my-lg-0"   style={{ width:"300px", display:'flex', alignItems:'center'}}>
									<input style={{fontSize:"15px"}} class="form-control mr-sm-2" type="text" placeholder="Your Email" aria-label="Search" /> 
									<button title="Send Email" style={{fontSize:"15px"}} class="btn btn-default " type="submit"><i className="fa fa-location-arrow" ></i></button>
								</form>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		
		<div class="footer-bottom">
			<div class="container">
				<div class="row">
					<p class="pull-left">Copyright © 2020 TEN/SHOP Inc. All rights reserved.</p>
					<p class="pull-right">Designed by <span><a target="_blank" href="http://www.themeum.com">Soy-Henry</a></span></p>
				</div>
			</div>
		</div>
		
	</footer>
            
       
        
 )
}
const mapStateToProps = state => {
    return {
        onlineUser: state.onlineUser,
        getcart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(userLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
