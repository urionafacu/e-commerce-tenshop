import React , {useEffect} from "react";
import {getReviews, getUsers} from "../actions"
import {connect} from "react-redux"
import Rater from 'react-rater'

function Reviews ({idProduct, all_users,reviews,getUsers,getReviews}) {
  console.log("ASDASDASD", reviews,idProduct)
  useEffect(()=> {
    getUsers()
  },[])

  useEffect(() => {
    getReviews(idProduct.id)
  },[reviews.lenth])
  console.log(idProduct, "este es el id product ")
  
  


return ( reviews && reviews.map (p => 
  <div className="commented-section mt-2 row">
     <div className="d-flex flex-row align-items-center commented-user col">
        <h2 className="mr-2">{all_users.map(u => {if( p.userId === u.id) return ("  " + u.firstname.charAt(0).toUpperCase()+u.firstname.slice(1) + " " + u.surname.charAt(0).toUpperCase()+u.surname.slice(1))})}</h2>
        {/* <span class="dot mb-1"></span> */}
     </div>
     <div className="reply-section col" style={{ textAlign:"right"}}>
      <Rater total={5} rating={p.rating} interactive = {false} style={{fontSize:"30px"}}  />  
    </div>
     <div class="w-100"></div>
     <div className="comment-text-sm col" style={{ textAlign:"left"}}><span style={{fontSize:"20px", textAlign:"left"}}>{p.comments}</span></div>
    <div className= "col" style={{marginTop:"10px", textAlign:"right"}}>                          
     <span class="mb-1 ml-2" style= {{ textAlign:"right", fontSize:"14px"}}>{p.createdAt.slice(0,10)}</span>
     </div>
  </div>
      ))
    }

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    getReviews: (idProduct) => dispatch(getReviews(idProduct))
  }
}
const mapStateToProps = state => {
  return {
    all_users: state.all_users,
    reviews: state.reviews

  }
}
export default connect (mapStateToProps, mapDispatchToProps)(Reviews)