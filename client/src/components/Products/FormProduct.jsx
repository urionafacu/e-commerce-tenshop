import React, { useState, useRef, useEffect } from 'react';
import TableProducts from "../Products/TableProducts";
import { connect } from "react-redux";
import { updateProduct, deleteCatxProd, deleteProduct, getCategoriesxProducts, getAllCategories, getAllProducts } from "../../actions"
import Swal from 'sweetalert2';


function FormProduct({ categories, categxproducts, deleteProduct, deleteCatxProd, updateProduct, getCategoriesxProducts, getAllCategories, getAllProducts, categoriesxproducts, products}) {
  
  
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
        boton.className = 'btn btn-primary';      
      })
      document.getElementById("contCat").innerHTML = "" 
      
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
          boton.className = 'btn btn-danger';          
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
          boton.className = 'btn btn-primary';
        } else {
          boton.className = 'btn btn-success';
        }
        if(categ.includes(select)){
          categ = categ.filter(word => word !== select);                           
          }else{
            categ.push(select);                                     
          }   
            
         }  
         
         

    return (
      
        <div className="container">       

        <section class="contact-block"></section>
            <section class="contact-block jumbotron">

                <div class="container">
                    <div class="col-md-6 contact-form alert alert-dark">
                        <h3>Products in <span>List</span></h3>
                        <table class="table table-hover">
                             <thead>
                                <tr className="table-primary">
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Categories</th>
                                    <th scope="col">Edit</th>

                                </tr>
                             </thead>

                            <tbody >
                                <TableProducts update={update} elId={elId} deleteProductxId={deleteProductxId} categxproducts={categxproducts} deleteCatxprod={deleteCatxprod} categoriesfromTableProducts={categoriesfromTableProducts}/>
                            </tbody>

                        </table>
                    </div>

                    <div class="col-md-6 contact-form alert alert-dark">
                        <h3>Management <span>Products</span></h3>
                       <form id={'formulario'} style={{display:'none'}} onSubmit={handleSubmit}>

                            <input type="text" class="form-control form-control-lg" name="name" placeholder="Name" id="name" onChange={handleInputChange} required=""/>
                            <input type="text" class="form-control form-control-lg" name="description" placeholder="Description" id="description" onChange={handleInputChange} required=""/>
                            <input type="text" class="form-control form-control-lg" name="price" placeholder="Price $" id="price" onChange={handleInputChange} required=""/>
                            <input type="text" class="form-control form-control-lg" name="stock" placeholder="Stock" id="stock" onChange={handleInputChange} required=""/>
                            <div className=" form-control-lg">
                                    {categories && categories.map((cat, i) => {
                                       
                                        return (                                           
                                          <button type="button" class="btn btn-primary" onClick={(e) => addCat(cat.name, i)} id={i+"cat"} value={cat.name}>
                                            {cat.name}
                                          </button>                                          
                                        )
                                    })}   
                            </div>
                            <div className=" form-control-lg"> 
                              <span id='contCat'></span>
                            </div>   
                            <input type="text" class="form-control form-control-lg" name="image" placeholder="Url Imagen" id="image" onChange={handleInputChange} required=""/>
                            <input type="submit" class="submit-btn" value="Submit" style={{borderRadius: "15px"}}/>
                        </form>
                    </div>

                </div>
            </section>

        </div>
    );
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
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormProduct)