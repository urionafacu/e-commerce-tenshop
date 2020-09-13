import React, {  useState } from "react";
import { connect } from "react-redux";
import {Link, NavLink} from 'react-router-dom';
import './Page404.css';
import {getSearchProducts} from "../actions/index";


function Notfound({getSearchProducts}) {
    const [inputSearch, setInputSearch] = useState("");

    function handleChange(e) {
        setInputSearch({
            inputSearch: e.target.value            
        });        
        getSearchProducts(inputSearch.inputSearch)
    };

    function handleSubmit(e) {
        e.preventDefault()
    }

      return(
 <div className="contenedor">

<div className="top ">
  <h1 class='title text-center'>404</h1>
  <h3 class='title text-center'>Page Not Found</h3>
</div>
<div className="containera">
  <div className="ghost-copy">
    <div className="one"></div>
    <div className="two"></div>
    <div className="three"></div>
    <div className="four"></div>
  </div>
  <div className="ghost">
    <div className="face">
      <div className="eye"></div>
      <div className="eye-right"></div>
      <div className="mouth"></div>
    </div>
  </div>
  <div className="shadow"></div>
</div>
<div className="buscador">
  <p>Boo, looks like a ghost stole this page!</p>
    <div className="input-group"> 
  
        <div className="input-group">                
          <form class="form-inline my-2 my-lg-0" onSubmit={(e) => handleSubmit(e)} style={{ width:"300px", display:'flex', alignItems:'center'}}>
              <input style={{fontSize:"15px"}} class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" onChange={(e) => handleChange(e)}/>                        
              <Link to="/search" style={{display:"flex", marginLeft:'3px'}}>
                  <button title="SEARCH" style={{fontSize:"15px"}} class="btn btn-secondary " type="submit"><i className="fa fa-search" ></i></button>
              </Link>
          </form>
      </div>
    </div>
    <div className="buttonsa">
      {/* <button className="btn btn-secondary btn-lg" >Back</button> */}
      <Link to="/">
         <h2 class="title text-center"><i className={'fa fa-arrow-left'}></i> Go to Home</h2>
      </Link>
    </div>
</div>

</div>
      )
    
  }


  const mapDispatchToProps = dispatch => {
    return {
      getSearchProducts: (search) => dispatch(getSearchProducts(search))
    }
  }
  
  
  export default connect(null, mapDispatchToProps)(Notfound)