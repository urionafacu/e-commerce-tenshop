import React from 'react';
import TarjetCatalogue from './TarjetCatalogue.jsx';
import { connect } from "react-redux";
import { getOneCategory } from "../../actions/index";

function MenuCategories({category, getOneCategory, products}) { 
  
  
  React.useEffect(() => {
   getOneCategory(category)
  }, [category])

    
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

const mapDispatchToProps = dispatch => {
  return {
    getOneCategory: nombre => dispatch(getOneCategory(nombre))
  }
}

const mapStateToProps = state => {
  return {
    products: state.onecategory
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MenuCategories)

