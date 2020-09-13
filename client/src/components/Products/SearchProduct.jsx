import React from 'react';
import TarjetCatalogue from './TarjetCatalogue.jsx';
import { connect } from "react-redux";
import { getAllProducts } from "../../actions"

function SearchProduct({products}) { 
  console.log("LOS Productos", products)
    if(products){
      return (
        <div className='container'>
          {products.map(c => {            
            return <TarjetCatalogue
                id={c.id}
                name={c.name}
                description={c.description}
                price={c.price}
                stock={c.stock}
                image={c.image}

              />
          } )}

        </div>
      );
    } else {
      return(
        <div className="alert alert-danger">No found products</div>
      )
    }
  }

const mapStateToProps = state => {
  return {
    products: state.search_result
  }
}  



export default connect(mapStateToProps)(SearchProduct)