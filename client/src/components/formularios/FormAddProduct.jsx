import React, {useState, useEffect} from 'react';
import axios from "axios"
import { connect } from "react-redux";
import { getAllProducts, getAllCategories } from "../../actions"
import FileBase64 from "react-file-base64"; // npm install react-file-base64
import Page404 from "../Page404";
import Swal from 'sweetalert2'


function FormAddProduct({products, categories, getAllCategories, getAllProducts, onlineUser}) {
    useEffect(() => {
      getAllCategories()
      getAllProducts()
    }, [])

    const [input, setInput] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: [],
        image: "",
        image2: "",
        image3: "",
        image4: ""
      });


      const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }
      var categ = [];

      const handleSubmit = function(e) {
        e.preventDefault();
        console.log("imagen",input.image)
        if (input.image === ""){
          Swal.fire({
              title: "Ups!",
              text: "Please, charge image for upload this product",
              icon: "warning",
            })
        } else {
        let objetoo = {
          name: input.name,
          description: input.description,
          price: parseFloat(input.price),
          stock: parseFloat(input.stock),
          image: input.image,
          category: categ,
          image2: input.image2,
          image3: input.image3,
          image4: input.image4
        }


        if (products.length) {


          for (let i = 0; i < products.length; i++) {
            const element = products[i].name;


            if(element === objetoo.name){

              Swal.fire({
                title: 'Ups!',
                text: "This product already exists, do you want to edit it?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                //confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.value) {
                  window.location = "http://localhost:3000/formProduct"
                }
              })

              return
            }///end if

          }//end for
        }

        Swal.fire(
          'Good job!',
          'The product was inserted successfully!',
          'success'
        )
        document.getElementById("myForm").reset();
        categories.forEach((x, i) => {
          var boton = document.getElementById(`${i}`);
          boton.className = 'btn btn-secondary';
        })
        document.getElementById("contCat").innerHTML = "";
        e.preventDefault();

        return axios.post("http://localhost:3001/products/add", objetoo)
      }
    }


      function addCat(select, btnId){
        //console.log(categ.includes(select))
        //alert(btnId)

        if(categ.includes(select)){
          categ = categ.filter(word => word !== select);
          console.log(categ,"if true")
          document.getElementById(btnId).style.background= "";

        }else{
          categ.push(select);
          console.log(categ,"if false")
          document.getElementById(btnId).style.background= "#FE980F";
        }
      }

      const handlerImageUpload = file => {
        setInput({
          ...input,
          image: file.base64
        })
      }

      const handlerImageUpload2 = file => {
        setInput({
          ...input,
          image2: file.base64
        })
      }

      const handlerImageUpload3 = file => {
        setInput({
          ...input,
          image3: file.base64
        })
      }

      const handlerImageUpload4 = file => {
        setInput({
          ...input,
          image4: file.base64
        })
      }
if( onlineUser.type == 1){
    return (
<div class="container">
<div class="row">
<div class="col-sm-3"> </div>

  <div class="col-sm-6 my-5">
    <div class="login-form ">
      <form onSubmit={handleSubmit} id="myForm">
      <h3 className="text-center" style = {{"background":"#FE980F", "borderRadius":"5px"}}>Form<span style={{color:"black", marginLeft:"10px"}}>Add Product</span></h3>
      <input type="text" className="form-control form-control-lg" name="name" placeholder="Name" id="name" onChange={handleInputChange}  required />
        <input type="text" className="form-control form-control-lg" name="description" placeholder="Description" id="description" onChange={handleInputChange} required/>
          <input type="text" className="form-control form-control-lg" name="price" placeholder="Price $ " id="price" onChange={handleInputChange} required/>
          <input type="text" className="form-control form-control-lg" name="stock" placeholder="Stock" id="stock" onChange={handleInputChange} required/>
          <FileBase64 onDone={handlerImageUpload} required />
          <FileBase64 onDone={handlerImageUpload2} required />
          <FileBase64 onDone={handlerImageUpload3} required />
          <FileBase64 onDone={handlerImageUpload4} required />
          <div className=" form-control-lg">
                                     {categories.map((cat, i) => {
                                         return (
                                          <div class="btn-group p-3" role="group" aria-label="Basic example">
                                           <button style ={{marginRight:'2px', color:"black",border:"solid 1px black",borderRadius:"5px"}} type="button"  class="btn btn-secondary" id={`${i}`}  onClick={(e) => addCat(cat.name, i)} value={cat.name}>

                                             {cat.name}
                                           </button>
                                           </div>
                                         )
                                     })}
                             </div>
                             <div className=" form-control-lg">
                               <span id='contCat'></span>
                             </div>
      <div class="col-sm-4"> </div>
      <div class="col-sm-4">
      <button id = "submitButton" type="submit" className="submit-btn" value="Submit" style={{"borderRadius":"5px","background":"#FE980F",}} class="btn  btn-lg btn-block">Add Product </button>

       </div>
       <div class="col-sm-4"> </div>
      </form>
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
    getAllCategories: () => dispatch(getAllCategories()),
    getAllProducts: () => dispatch(getAllProducts())

  }
}

const mapStateToProps = state => {
  return {
    products: state.all_products,
    categories: state.categories,
    onlineUser: state.onlineUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormAddProduct)
