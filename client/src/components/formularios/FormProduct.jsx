import React, { useState, useRef, useEffect } from 'react';
import TableProducts from "../Products/TableProducts";
import { connect } from "react-redux";
import { updateProduct, deleteCatxProd, deleteProduct, getCategoriesxProducts, getAllCategories, getAllProducts } from "../../actions"
import Swal from 'sweetalert2';
import Page404 from "../Page404";


function FormProduct({ categories, categxproducts, deleteProduct, deleteCatxProd, updateProduct, getCategoriesxProducts, getAllCategories, getAllProducts, categoriesxproducts, products, onlineUser}) {


  useEffect(() => {
    getAllCategories()
    getCategoriesxProducts()
    getAllProducts()

  }, [])

  const [input, setInput] = useState({});



  const handleInputChange = function(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

  }

  var categ = [];///ARARAY CATTTTEGORIASSSSS

  var elId = useRef(null)
  var categoriesfromTableProducts = []
  function update(id, prod) {
    prod.find((e) => {
      if (e.id == id) {
        setInput(e)
        document.getElementById("name").value = e.name;
        document.getElementById("description").value = e.description;
        document.getElementById("price").value = e.price;
        document.getElementById("stock").value = e.stock;
        document.getElementById("image").value = e.image;
        var form = document.getElementById('formulario');
        form.style.display = '';

        return;
      }
    })
  }

  const handleSubmit = function(e) {
    let form = document.getElementById('formulario');
        form.style.display = 'none';
    e.preventDefault();
      var array = [];
      // este forEach se hace para que las categorias que se manden no vayan repetidas
      // y tambien para que array contenga a las categorias anteriores
      categxproducts.forEach(el => {
        if (el.product_id === elId.current) {
          array.push(el.category)
        }
      })

    categ.forEach(el => {
      if (!array.includes(el)) array.push(el)
    })
    let objetoo = {
        name: input.name,
        description: input.description,
        price: parseFloat(input.price),
        stock: parseFloat(input.stock),
        image: input.image,
        category: array,
        id: elId.current
      }

      updateProduct(objetoo)
      categories.forEach((x, i) => {
        var boton = document.getElementById(`${i}cat`);
        boton.className = 'btn btn-warning';
      })
      document.getElementById("contCat").innerHTML = ""
      getAllProducts()
      Swal.fire({
        title: "Good job!",
        text: "Update product saccess!",
        icon: "success",
      });
      getAllProducts()
    }

    function deleteProductxId(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          deleteProduct(id)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

    }


    function deleteCatxprod(nameCxp, idProd){
      // nameCxp es la cateogoria que se esta por borrar
      // idProd el id del producto al cual se le borra la categoria
     //console.log('NAME y el ID PROD', nameCxp + idProd)
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          var boton = document.getElementById(`${nameCxp}${idProd}`);
          boton.style.display = 'none';          
          deleteCatxProd(nameCxp, idProd)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

      // alert('Delete success Category')

    }


    function addCat(select, i){//inser categorias al array y eliminar
        const boton = document.getElementById(`${i}cat`);
        var style = document.getElementById(`${i}cat`).className;
        if (style === 'btn btn-success') {
          boton.className = 'btn btn-warning';
        } else {
          boton.className = 'btn btn-success';
        }
        if(categ.includes(select)){
          categ = categ.filter(word => word !== select);
          }else{
            categ.push(select);
          }

         }


if( onlineUser.type == 1){
    return (

        <div >
          <div class="col-md-8 ">
          <h3>Products <span>List</span></h3>
                <TableProducts update={update} elId={elId} deleteProductxId={deleteProductxId} categxproducts={categxproducts} deleteCatxprod={deleteCatxprod} categoriesfromTableProducts={categoriesfromTableProducts}/>
          </div>
          <div class="container">
			<div class="row">
				<div class="col-md-3 my-5">
					<div class="content">
						<form id="main-contact-form" class="contact-form row" id={'formulario'} style={{display:'none', marginTop:"100px"}} onSubmit={handleSubmit}>
            <h3>Update <span>Product</span></h3>
                <div class="form-group col-md-10">
                  <input type="text" class="form-control form-control-lg" name="name" placeholder="Name" id="name" onChange={handleInputChange} required=""/>
                </div>
                <div class="form-group col-md-10">
                  <input type="text" class="form-control form-control-lg" name="description" placeholder="Description" id="description" onChange={handleInputChange} required=""/>
                </div>
                <div class="form-group col-md-10">
                  <input type="text" class="form-control form-control-lg" name="price" placeholder="Price $" id="price" onChange={handleInputChange} required=""/>
                </div>
                <div class="form-group col-md-10">
                  <input type="text" class="form-control form-control-lg" name="stock" placeholder="Stock" id="stock" onChange={handleInputChange} required=""/>
                </div>
                <div class="form-group col-md-10" >
                  {categories && categories.map((cat, i) => {

                              return (
                                <button style={{marginRight: '2px'}} type="button" class="btn btn-warning" onClick={(e) => addCat(cat.name, i)} id={i+"cat"} value={cat.name}>
                                  {cat.name}
                                </button>
                              )
                          })}
                </div>
                <div className=" form-control-lg">
                  <span id='contCat'></span>
                </div>
                  <input type="text" class="form-control form-control-lg" name="image" placeholder="Url Imagen" id="image" onChange={handleInputChange} required=""/>
            <button type="submit" className="submit-btn" value="Submit" class="btn btn-default update">Add</button>
						</form>
					</div>
				</div>
			</div>
		</div>
        </div>
    );
  }else{
    return (
      <div>
      <Page404 />
      </div>
    )
   }
};

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: (id, body) => dispatch(updateProduct(id, body)),
    deleteCatxProd: (name, id) => dispatch(deleteCatxProd(name, id)),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
    getCategoriesxProducts: () => dispatch(getCategoriesxProducts()),
    getAllCategories: () => dispatch(getAllCategories()),
    getAllProducts: () => dispatch(getAllProducts())

  }
}

const mapStateToProps = state => {
  return {
    categxproducts: state.categores_x_products,
    categories: state.categories,
    products: state.all_products,
    onlineUser: state.onlineUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormProduct)
