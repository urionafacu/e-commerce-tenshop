import React from 'react';
import TarjetCatalogue from './TarjetCatalogue.jsx';
import { connect } from "react-redux";
import { getAllProducts, getAllCategories, onlineUserError, loginUserCookie , addCartInvited, getAllCart, vaciarls, getAllReviews} from "../../actions";
import Swal from 'sweetalert2';
var ls = require('local-storage');

function Catalogue({ products, getAllProducts, onlineUser, onlineUserError, loginUserCookie , addCartInvited, setid, getAllCart, getcart, vaciarls, getAllReviews,allreviews}) {      

  React.useEffect(() => {
    getAllProducts()
    getAllReviews()
  }, [])
  function promedy(id){
      var acum = 0;
      var cont = 0;
    allreviews.forEach(r => {
      if (r.productId === id) {
        cont += 1
        acum += r.rating
      }
    })
      if (cont === 0){
        return 0
      } else {
      var promedy = acum / cont
      promedy.toFixed(2)
      //console.log("PRoemdios", promedy)
      return promedy
      }
    }


  var flag = false;  
        if (typeof onlineUser === "object" && ls.get('idProducts').length !== 0 ) {
                  let arr = [];
                  ls.get('idProducts').forEach(function(ele){
                      return arr.push(parseInt(ele))
                    });
                    addCartInvited(arr, onlineUser.id);
                    getAllCart(onlineUser.id);
                    //console.log("SIGN IN PROOOOOOO", arr)          
                    if(getcart.length >= ls.get('idProducts').length){
                      vaciarls()
                    }
                  }  
                  /*       if(setid.length !== 0){
            let arr = [];
            setid.forEach(function(ele){
                return arr.push(parseInt(ele))
              }); */
    if(products){
      
      return (
        <div className='container' style={{marginTop: "40px"}}>
          {products.map(c => 
            <TarjetCatalogue
              id={c.id}
              name={c.name}
              description={c.description}
              price={c.price}
              stock={c.stock}
              image={c.image}    
              rating= {promedy(c.id)}
            /> )}
        </div>
      );
    } else {
      return(
        <div>No products found.</div>
      )
    }
  }

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
    onlineUserError: () => dispatch(onlineUserError()),
    addCartInvited: (diProduc, idUser) => dispatch(addCartInvited(diProduc, idUser)),
    getAllCart: (idUser) => dispatch(getAllCart(idUser)),
    vaciarls: () => dispatch(vaciarls()),
    getAllReviews: () => dispatch(getAllReviews())
    
    
  }
}

const mapStateToProps = state => {
  return {
    products: state.all_products,
    onlineUser: state.onlineUser,
    setid: state.setid,
    getcart: state.getcart,
    allreviews: state.allreviews


  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Catalogue)