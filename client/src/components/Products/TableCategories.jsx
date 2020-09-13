import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import  {getAllCategories,  modifyCategory, deleteCategory} from '../../actions'
import Swal from 'sweetalert2';


 function TableCategories({getAllCategories, category, update,  elId, deleteCategory}) {
                            

    useEffect(()=>{
        getAllCategories()
    },[category])

    function deleteCat(name) {   
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
            deleteCategory(name)                                   
            Swal.fire({
                icon: 'success',
                title: 'Your category has been deleted!',
                showConfirmButton: false,
                timer: 2000
            })
          }
        })
          
      }
   
    return (

                <section id="cart_items">
		<div class="container">
        <h3 class="text-center">Category <span>List</span></h3>
			<div class="table-responsive cart_info">
				<table class="table table-condensed table-striped">
					<thead>
						<tr class="cart_menu">
							<td class="delete">Update</td>
                            <td class="total">Delete</td>
							<td class="price">Name</td>
                            <td class="quantity">Description</td>
						</tr>
					</thead>
					<tbody>
                        {
                    category.map((p, i) => {
                    return (
						<tr>
							<td class="cart_total">
							<button type="button" class="btn btn-warning" onClick={() => {
                                elId.current = p.name
                            update(elId.current, category);
                            }}>
                            <i class="fa fa-pencil"></i>
                            </button>
                            </td>
                            <td class="cart_total">
                            <button type="button" class="btn btn-danger" onClick={(e) => deleteCat(p.name)}>
                            <i class="fa fa-trash-o"></i>
                            </button>
							</td>
							<td class="cart_price">
								<p>{p.name}</p>
							</td>
                            <td class="cart_quantity">
								<p>{p.description}</p>
							</td>
						</tr>
                        )
                        })}
						
					</tbody>
				</table>
			</div>
		</div>
	</section> 
    
           
    )
}

const mapDispatchToProps = dispatch =>{

    return {
        getAllCategories: () => dispatch(getAllCategories),
        modifyCategory: (body,id) => dispatch(modifyCategory(body,id)),
        deleteCategory: (category) => dispatch(deleteCategory(category))  

    }
}

const mapStateToProps = state =>{
    return {
        category: state.categories
    }
}

 

export default connect (mapStateToProps, mapDispatchToProps)(TableCategories) 