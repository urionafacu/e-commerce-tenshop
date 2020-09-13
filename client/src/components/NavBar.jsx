import React, { useState, useEffect } from "react";
import "./NavBar.css";
import SearchBar from "./SearchBar.jsx";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { userLogout, loginUserCookie, lsset , getAllCart, getSumaryCart} from "../actions/index.js";
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
var ls = require('local-storage');

function NavBar({onlineUser, userLogout, getcart, loginUserCookie,setid, lsset, getAllCart,cart, getSumaryCart}) {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [admin, setAdmin] = useState(false);

    useEffect(() => {
        var but = document.getElementById('SIGNIN');

        fetch("http://localhost:3001/categories/")
        .then(r => r.json())
        .then((recurso) => {
            if(recurso) {
                setCategories(recurso)
            }
        })
        if (typeof onlineUser  === "object"){
         getAllCart(onlineUser.id)
         getSumaryCart(onlineUser.id)
          if (onlineUser.type == 1){
            setAdmin(true)
          }
        }
        if (typeof onlineUser !== "object" ) loginUserCookie()
        console.log(onlineUser)

      }, [onlineUser])

       useEffect(()=> {
        if(typeof onlineUser == "object"){
           getAllCart(onlineUser.id)
      }

    },[cart]);

      function alertt(){
        Swal.fire({
          icon: 'error',
          title: 'Hello! To add to cart, log into your account',
        })
     }
/* var cantproductos = [...getcart,ls.get('idProducts')];
console.log(cantproductos); */

     function salirr(){
      Swal.fire({
        icon: 'info',
        title: 'Bye! You have successfully disconnected',
      })
      userLogout()
      setAdmin(false)
      history.push('/');

   }
    return (

    <header id="header">
		<div class="header-middle">
			<div class="container">
				<div class="row" style={{alignItems:'flex-start'}}>
					<div class="col-md-4 clearfix" style={{display:'flex', justifyContent:'center'}}>
						<div class="logo pull-left animate__animated animate__bounceInLeft animate__delay-2s">
                        <NavLink to="/">
							<a href=""><img src="logo.png" alt="" /></a>
                        </NavLink>
						</div>
					</div>
					<div class="col-md-8 clearfix" style={{alignSelf:"center"}}>
						<div class="shop-menu clearfix pull-right">
							<ul class="nav navbar-nav">
								<li>

                                    <NavLink to="/cart">
                                        <i class="fa fa-shopping-cart badge" style={{backgroundColor:'orange'}}>
                                        {typeof onlineUser !== "object" &&  <span className="badge badge-danger" style={{marginLeft:"2px", backgroundColor:'orange'}}>  {ls.get('idProducts').length}</span>}
                                        {typeof onlineUser === "object" &&  <span className="badge badge-danger" style={{marginLeft:"2px", backgroundColor:'orange'}}>  {getcart.length !== 0 ? getcart.length : 0}</span>}

                                        </i>
                                        Cart
                                    </NavLink>

                                </li>
								<li>
                                { typeof onlineUser !== "object" &&
                                    <NavLink to="/signup">
                                    <a href=""><i class="fa fa-user"></i> Create Account</a>
                                    </NavLink>
                                }
                                </li>
								<li>
                                { typeof onlineUser !== "object" &&
                                    <NavLink to="/signin">
                                    <a href=""><i class="fa fa-lock"></i> Login</a>
                                    </NavLink>
                                }
                                </li>
                                {onlineUser.firstname &&

                                         /*    <li class="dropdown">
                                            <a href="" onClick={() => salirr()}><i class="fa fa-lock"></i>WELCOME {onlineUser.firstname.toUpperCase()} {onlineUser.surname.toUpperCase()} Logout</a>
                                            <ul role="menu" class="sub-menu">
                                            <li>LOGOUT</li>
                                            </ul>
                                            <a href="/me" id="profile"><i className="fa fa-user" aria-hidden="true"></i>Profile</a>
                                            </li> */

<li class="dropdown">
<a>WELCOME {onlineUser.firstname.toUpperCase()+" "+onlineUser.surname.toUpperCase()} <i class="fa fa-angle-down"></i></a>
<ul role="menu" class="sub-menu">
<li>
<NavLink className="dropdown-item" to={`/me`}>
<a href=""><i className="fa fa-user" aria-hidden="true" style={{marginLeft:'10px', marginRight:'10px'}}></i>Profile</a>
    </NavLink>
</li>
<li>
<NavLink className="dropdown-item" to={`/`}>
    <a href="" onClick={() => salirr()}><i class="fa fa-sign-out" aria-hidden="true" style={{marginLeft:'10px', marginRight:'10px'}}></i>Logout</a>
    </NavLink>
</li>
</ul>
</li>





                                }
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="header-bottom">
			<div class="container">
				<div class="row" style={{display:"flex"}}>
					<div class="col-sm-9">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
						</div>
						<div class="mainmenu pull-left">
							<ul class="nav navbar-nav collapse navbar-collapse">
								<li>
                                    <NavLink to="/">
                                        <a href="" class="active">Home</a>
                                    </NavLink>
                                </li>
								<li>
                                    <NavLink to="/about" >
                                        <a href="">About</a>
                                    </NavLink>
                                </li>
								<li>
                                    <NavLink to="/contact">
                                        <a href="">Contact</a>
                                    </NavLink>
                                </li>
                                <li class="dropdown">
                                    <a >Categories<i class="fa fa-angle-down"></i></a>
                                    <ul role="menu" class="sub-menu">
                                    <li>
                                        {
                                        categories.map((cat) => {
                                        return (
                                                <NavLink to={`/categories/${cat.name}`}>
                                                    <a href="">{cat.name}</a><br/>
                                                </NavLink>
                                                )
                                            })
                                        }
                                    </li>
                                    </ul>
                                </li>
                                {admin &&
                                <li class="dropdown">
                                    <a >Admin<i class="fa fa-angle-down"></i></a>
                                    <ul role="menu" class="sub-menu">
                                    <li>
                                    <NavLink className="dropdown-item" to={`/formCategory`}>
                                        <a href="">Form Category</a>
                                        </NavLink>
                                    </li>
                                    <li>
                                    <NavLink className="dropdown-item" to={`/formProduct`}>
                                        <a href="">Form Product</a>
                                        </NavLink>
                                    </li>
                                    <li>
                                    <NavLink className="dropdown-item" to={`/formAddProduct`}>
                                        <a href="">Add Product</a>
                                    </NavLink>
                                    </li>
                                    <li>

                                        <a href="/orders">Orders</a>

                                    </li>
                                    <li>
                                    <NavLink className="dropdown-item" to={`/admin`}>
                                        <a href="">Admin</a>
                                    </NavLink>
                                    </li>
                                    </ul>
                                </li>
                                }
							</ul>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="search_box pull-right input-group">
                        <SearchBar/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>

)
}
const mapStateToProps = state => {
    return {
        onlineUser: state.onlineUser,
        getcart: state.getcart,
        setid: state.setid,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(userLogout()),
    loginUserCookie: () => dispatch(loginUserCookie()),
    lsset: () => dispatch(lsset()),
    getAllCart: (id) => dispatch(getAllCart(id)),
    getSumaryCart: (id) => dispatch(getSumaryCart(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
