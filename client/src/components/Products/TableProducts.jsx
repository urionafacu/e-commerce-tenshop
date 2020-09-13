import React, { useState, useRef, useEffect } from 'react';
import Product from './Product';
import { connect } from "react-redux";
import { updateProduct, deleteCatxProd, deleteProduct, getCategoriesxProducts, getAllCategories, getAllProducts } from "../../actions"

function TableProducts({products, update, elId, deleteProductxId, categxproducts, deleteCatxprod, getAllProducts, categoriesfromTableProducts}) {
    useEffect(() => {
      getAllCategories()
      getCategoriesxProducts()
      getAllProducts()
    }, [])


    return (
        <section id="cart_items">
            <div class="container">
              <div class="table-responsive cart_info">
                <table class="table table-condensed">
                  <thead>
                    <tr class="cart_menu">
                    <td class="total">Actions</td>
                    <td class="price">Id</td>
                    <td class="quantity">Name</td>
                    <td class="delete">Category</td>

                    </tr>
                  </thead>
                  <tbody>
                    {
                  products.map((p, i) => {

                  return (
                    <tr>
                      <td class="cart_total">
                      <button style={{marginRight: '2px'}} type="button" class="btn btn-success"
                      onClick={()   => {
                        update(p.id, products);
                         elId.current = p.id
                         }}>
                      <i class="fa fa-pencil"></i>
                      </button>

                      <button type="button" class="btn btn-danger"
                      onClick={ (e) => deleteProductxId(p.id)}>
                      <i class="fa fa-times"></i>
                      </button>
                      </td>
                      <td class="cart_price">
                        <p>{p.id}</p>
                      </td>
                        <td class="cart_quantity">
                        <p>{p.name}</p>
                      </td>
                      <td>
            {categxproducts.map((cxp, i) => {//Mapea las cat que tenga cada products
                if(cxp.product_id === p.id){
                return (
                  <div class="btn-group" role="group" aria-label="Basic example">
                <button style={{marginRight: '2px'}} title="Click for delete" id={`${cxp.category}${p.id}`} onClick={ (e) => deleteCatxprod(cxp.category, p.id)} type="button" class="btn btn-secondary">
                     { cxp.category}
                </button>
                </div>
                )
                }
            })}
            </td>


                    </tr>
)})
}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: (id, body) => dispatch(updateProduct(id, body)),
    deleteCatxProd: (name, id) => dispatch(deleteCatxProd(name, id)),
    getCategoriesxProducts: () => dispatch(getCategoriesxProducts()),
    getAllCategories: () => dispatch(getAllCategories()),
    getAllProducts: () => dispatch(getAllProducts())


  }
}

const mapStateToProps = state => {
  return {
    products: state.all_products,
    categories: state.categories
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(TableProducts)
