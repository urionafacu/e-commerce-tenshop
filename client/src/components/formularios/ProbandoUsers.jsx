import React, { useState, useRef } from 'react';
import Probando from "../formularios/TableUsers";

function ProbandoUsers({ categories, categxproducts, deleteProduct, deleteCatxProd, updateProduct, getCategoriesxProducts, getAllCategories, getAllProducts, categoriesxproducts, products }) {
  const [input, setInput] = useState({});

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

  }

  var categ = [];

  var elId = useRef(null)

  const handleSubmit = function (e) {
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
                  <th scope="col">USERS</th>
                </tr>
              </thead>

              <tbody >
                <Probando />
              </tbody>

            </table>
          </div>

          <div class="col-md-6 contact-form alert alert-dark">
            <h3>Management <span>Products</span></h3>
            <form id={'formulario'} onSubmit={handleSubmit}>

              <input type="text" class="form-control form-control-lg" name="name" placeholder="Name" id="name" onChange={handleInputChange} required="" />
              <input type="text" class="form-control form-control-lg" name="description" placeholder="Description" id="description" onChange={handleInputChange} required="" />
              <input type="text" class="form-control form-control-lg" name="price" placeholder="Price $" id="price" onChange={handleInputChange} required="" />

              <div className=" form-control-lg">
                <span id='contCat'></span>
              </div>
              <input type="submit" class="submit-btn" value="Submit" style={{ borderRadius: "15px" }} />
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};


export default ProbandoUsers;