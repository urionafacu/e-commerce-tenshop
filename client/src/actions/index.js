import axios from "axios";
var ls = require('local-storage');

export const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT';
export const GET_SEARCH_PRODUCTS = "GET_SEARCH_PRODUCTS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DELETECATXPROD = "DELETECATXPROD";
export const GET_CATEGORIES_X_PRODUCTS = "GET_CATEGORIES_X_PRODUCTS";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_ONE_CATEGORY = "GET_ONE_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const MODIFY_CATEGORY = "MODIFY_CATEGORY";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const LOGIN_USER = "LOGIN_USER";
export const ADD_CART = "ADD_CART";
export const GET_ALL_CART = "GET_ALL_CART";
export const USER_LOGOUT = "USER_LOGOUT";
export const ONLINE_USER_ERROR = "ONLINE_USER_ERROR";
export const GET_USERS = "GET_USERS";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_CAR = "UPDATE_CAR";
export const COMPLETE_CAR = "COMPLETE_CAR";
export const CANCELL_CART = "CANCELL_CART";
export const GET_ORDERS = "GET_ORDERS";
export const UPDATE_PRICE_ORDER = "UPDATE_PRICE_ORDER";
export const GET_REVIEWS = "GET_REVIEWS";
export const ADD_REVIEW = "ADD_REVIEW";
export const LOGIN_USER_COOKIE = "LOGIN_USER_COOKIE";
export const UPDATE_ONLINE_USER = "UPDATE_ONLINE_USER";
export const SET_ID = "SET_ID";
export const VACIAR_LS = "VACIAR_LS";
export const ADD_CART_INVITED = "ADD_CART_INVITED";
export const GET_ORDERSXPRODUCT = "GET_ORDERSXPRODUCT";
export const GET_PRODUCTSXORDER = "GET_PRODUCTSXORDER";
export const FINISH_ORDER = "FINISH_ORDER";
export const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";
export const DELETE_PRODUCT_CART = "DELETE_PRODUCT_CART";
export const CANCELL_ORDER = "CANCELL_ORDER";
export const GET_SUMARY_CART = "GET_SUMARY_CART";
export const ACTIVE_ACCOUNT = "ACTIVE_ACCOUNT";
export const SEND_EMAIL_ORDER = "SEND_EMAIL_ORDER";
export const SEND_EMAIL_VISITED = "SEND_EMAIL_VISITED";







export function getSearchProducts (search) {
    return function(dispatch) {
      return axios.get("http://localhost:3001/products/searches/" + search, { withCredentials: true })
        .then(result => result.data)
        .then(data => {
          dispatch({
            type: GET_SEARCH_PRODUCTS,
            payload: data
          })
        })
    };
  }

export function getAllProducts () {
  return function(dispatch) {
    return axios.get("http://localhost:3001/products", { withCredentials: true })
      .then(result => result.data)
      .then(products => {
        dispatch({
            type: GET_ALL_PRODUCT,
            payload: products });
      });
  };
}

export function addCategory(category){
  return function(dispatch){
    return axios.post("http://localhost:3001/categories/add/", category, { withCredentials: true })
    .then(result => {
        dispatch({
            type: ADD_CATEGORY,
            payload: category
          });
    })
  }
}

export function modifyCategory(body,name){
  return function(dispatch){
    return axios.put(`http://localhost:3001/categories/modify/${name}`, body, { withCredentials: true })
    .then(result => result.data)
    .then((data) => {
      dispatch({
        type: MODIFY_CATEGORY,
        payload: data
      });
    })

  }
}

export function deleteCategory(category){
  return function(dispatch){
    return axios.delete(`http://localhost:3001/categories/${category}`)
    .then(() => {
      dispatch({
        type: DELETE_CATEGORY,
        payload: category
      });
    })
  }
}




export function updateProduct (body) {
  return function(dispatch) {
    return axios.post(`http://localhost:3001/products/update/`, body)
      .then(() => {
        dispatch({
          type: UPDATE_PRODUCT,
          payload: body
        })
      })
  }
}

export function deleteProduct (id) {
  return function(dispatch) {
    return axios.delete(`http://localhost:3001/products/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_PRODUCT,
          payload: id
        })
      })
  }
 }

export function deleteCatxProd (name, id) {
  return function(dispatch) {
    return axios.delete(`http://localhost:3001/products/cxp/${id}/${name}`)
      .then(() => {
        dispatch({
          type: DELETECATXPROD,
          payload: {name, id}
        })
      })
  }
}

export function getCategoriesxProducts ()  {
  return function(dispatch) {
    return axios.get("http://localhost:3001/products/cxp", { withCredentials: true })
      .then(result => result.data)
      .then(data => {
        dispatch({
            type: GET_CATEGORIES_X_PRODUCTS,
            payload: data });
      })
  }
}


export function getAllCategories () {
  return function(dispatch) {
    return axios.get("http://localhost:3001/categories/" , { withCredentials: true })
      .then(result => result.data)
      .then(data => {
        dispatch({
          type: GET_ALL_CATEGORIES,
          payload: data
        })
      })
  }
}



export function getOneCategory (category) {
    return function(dispatch) {
      return fetch("http://localhost:3001/categories/"+category)
        .then(response => response.json())
        .then(json => {
          dispatch({
              type: GET_ONE_CATEGORY,
              payload: json });
        });
    };
  }
export function addUser (body) {
  return function(dispatch) {
    return axios.post("http://localhost:3001/users/adduser", body, { withCredentials: true })
      .then(result => result.data)
      .then(data => {
        dispatch({
          type: ADD_USER,
          payload: data
        })
      })
  }
}



export function deleteUser (id) {
  console.log('El IDDDD', id)
  return function(dispatch) {
    return axios.delete(`http://localhost:3001/users/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_USER,
          payload: id
        })
      })
  }
 }
  ///AGREGANDO PRODUCT AL CARRITO
  export function addCart (idProduct, idUser) {
      var body = {
      id: idProduct
    }
    return function(dispatch) {
      return axios.post(`http://localhost:3001/users/${idUser}/cart/`, body, { withCredentials: true })
        .then(() => {
          dispatch({
            type: ADD_CART,
            payload: body
          })
        })
    }
  }

    ///AGREGANDO PRODUCT AL CARRITO CUANDO TE LOGEAS RECIEN.
    export function addCartInvited (ids, idUser) {
      let body = ids
    return function(dispatch) {
      return axios.post(`http://localhost:3001/users/${idUser}/invited/cart/`, body, { withCredentials: true })
        .then(() => {
          dispatch({
            type: ADD_CART_INVITED,
          })
        })
    }
  }

    //TRAYENDO PRODUCTOS DEL CARRITO DE UN USUARIO
    export function getAllCart (idUser) {
      return function(dispatch) {
        return axios.get(`http://localhost:3001/users/${idUser}/cart/`,{ withCredentials: true })
          .then(result => result.data)
          .then(productsCart => {
            dispatch({
                type: GET_ALL_CART,
                payload: productsCart });
          });
      };
    }


/*export function userLogout() {
  return function(dispatch) {
    return axios.get('http://localhost:3001/logout', { withCredentials: true })
      .then(() => {
        return {
          type: USER_LOGOUT
        }
      })
  }
}*/





export function onlineUserError () {
  return {
    type: ONLINE_USER_ERROR
  }
}

export function getUsers () {
  return function (dispatch) {
    return axios.get('http://localhost:3001/users', { withCredentials: true })
    .then(result => result.data)
    .then(result => {
      dispatch({
        type: GET_USERS,
        payload: result
      })
    })
  }
}
export function updateUser(id, body) {
  return function (dispatch) {
    return axios.put(`http://localhost:3001/users/${id}`, body)
      dispatch({
        type: UPDATE_USER,
        payload: {id,body}
      })
  }
}

export function updateCart(idUser, body) {
 //console.log("ACCIONSSSSSSSSSSSSSSS//////////////////////////////////////",body)
  return function (dispatch) {
    return axios.post(`http://localhost:3001/users/${idUser}/c/cart`, body, { withCredentials: true })
    .then(result => result.data)
    .then(result => {
      dispatch({
        type: UPDATE_CAR,
      })
    })
    .catch(err => {console.log("EL ERRRORRRRRRR",err)})
  }
}

export function priceOrder(idUser, total) {
  // console.log("ACCIONSSSSSSSSSSSSSSS//////////////////////////////////////",total)
let body = {
  total_price: Math.round(total)
}
  return function (dispatch) {
    return axios.post(`http://localhost:3001/users/${idUser}/c/order`, body)
    .then(result => result.data)
    .then(result => {
      dispatch({
        type: UPDATE_PRICE_ORDER,
      })
    })
  }
}

export function completeCart(idUser, addres){
  //console.log("Acionssssss",addres,idUser)
  let body = {
    status: "processing",
    address: addres
  };
  return function (dispatch) {
    return axios.post(`http://localhost:3001/users/${idUser}/update/cart`, body, { withCredentials: true })
    .then(result => result.data)
    .then(result => {
      dispatch({
        type: COMPLETE_CAR,
      })
    })
  }
}

export function finishorder(idUser, idOrder){
  console.log("Acionssssss",idUser, idOrder)
  return function (dispatch) {
    return axios.post(`http://localhost:3001/users/${idUser}/aceptar/${idOrder}`, { withCredentials: true })
    .then(result => result.data)
    .then(result => {
      dispatch({
        type: FINISH_ORDER,
      })
    })
  }
}

export function cancellCart(idUser){
  let body = {
    status: "cancelled",
  };
  return function (dispatch) {
    return axios.post(`http://localhost:3001/users/${idUser}/update/cart`, body, { withCredentials: true })
    .then(result => result.data)
    .then(result => {
      dispatch({
        type: CANCELL_CART,
      })
    })
  }
}


export function celarordenPanel(idUser, idOrder){
  return function (dispatch) {
    return axios.post(`http://localhost:3001/users/${idUser}/canc/${idOrder}`, { withCredentials: true })
    .then(result => result.data)
    .then(result => {
      dispatch({
        type: CANCELL_ORDER,
      })
    })
  }
}

export function vaciarpanelorders () {
  return {
    type: FINISH_ORDER
  }
}

export function getOrders(status){
  return function (dispatch) {
    return axios.get(`http://localhost:3001/orders/status/${status}`, { withCredentials: true })
    .then(result => result.data)
    .then(result => {
      dispatch({
        type: GET_ORDERS,
        payload: result

      })
    })
  }
}



export function addReview(aux, idProduct) {
  return function(dispatch) {
    return axios.post(`http://localhost:3001/products/${idProduct}/review`, aux)
    .then(result => result.data)
    .then(data => {
      dispatch({
        type: ADD_REVIEW,
      })
    })
  }
}


export function loginUser(body){
 // console.log("QUE ENTRA AL BODY", body)
  return function(dispatch){
    return axios.post("http://localhost:3001/login",body, { withCredentials: true })
    .then(result => result.data)
    .then(data => {
      dispatch({
        type: LOGIN_USER,
        payload: data
      })
    })
  }
}
export function userLogout () {
  axios.get('http://localhost:3001/logout', { withCredentials: true })
  return {
    type: USER_LOGOUT
  }

}

export function loginUserCookie(){
  return function(dispatch){
    return axios.get("http://localhost:3001/login", { withCredentials: true })
    .then(result => result.data)
    .then(data => {
      dispatch({
        type: LOGIN_USER_COOKIE,
        payload: data
      })
    })
  }
}
    export function getReviews(id){
      return function (dispatch){
        return axios.get(`http://localhost:3001/products/${id}/review`)
        .then(result => result.data)
        .then(result => {
          dispatch({
            type: GET_REVIEWS,
            payload: result
          })
        })
      }
    }


export function updateOnlineUser (id, body) {
  return function(dispatch) {
    return axios.put(`http://localhost:3001/users/${id}`, body)
      .then(result => result.data)
      .then(data => {
        dispatch({
          type: UPDATE_ONLINE_USER,
          payload: data
        })
      })
  }
}


export function lsset() {
 let idproductos = ls.get('idProducts');
  return function(dispatch) {
      dispatch({
        type: SET_ID,
        payload: idproductos
    })
  }
}

export function vaciarls() {
  ls.set('idProducts', []);
   return function(dispatch) {
       dispatch({
         type: VACIAR_LS,
     })
   }
 }

//TRAE TODAS LAS ORDENES DE UN PRODUCTO:
export function getOrdersxproduct(idProd) {
  return function(dispatch) {
    return axios.get(`http://localhost:3001/orders/ORDD/${idProd}`)
    .then(result => result.data)
    .then(result => {
      dispatch({
        type: GET_ORDERSXPRODUCT,
        payload: result
      })
    })
  }
}
//TRAE TODOS LOS PRODUCTOS DE UNA ORDEN:
export function getproductsxorders(idOrder) {
  console.log(idOrder);
  return function(dispatch) {
    return axios.get(`http://localhost:3001/orders/products/${idOrder}`)
    .then(result => result.data)
    .then(result => {
      dispatch({
        type: GET_PRODUCTSXORDER,
        payload: result
      })
    })
    .catch(err => {console.log("ASDASDASDADAS",err)})
  }
}

export function getAllReviews(){
  return function(dispatch){
    return axios.get('http://localhost:3001/products/reviews/allReviews')
  .then(result => result.data)
  .then(result => {
    dispatch({
      type: GET_ALL_REVIEWS,
      payload: result
    })
  })
  }
}

export function activeaccount(idUser){
  return function(dispatch){
    return axios.get(`http://localhost:3001/users/activeaccount/${idUser}`, { withCredentials: true })
  .then(result => result.data)
  .then(result => {
    dispatch({
      type: ACTIVE_ACCOUNT,
    })
  })
  }
}

export function sendemailorder(User, body){
let first = User.firstname;
let last = User.surname
let email = User.email
  return function(dispatch){
    return axios.post(`http://localhost:3001/users/sendorder/${first}/${last}/${email}`,body, { withCredentials: true })
  .then(result => result.data)
  .then(result => {
    dispatch({
      type: SEND_EMAIL_ORDER,
    })
  })
  }
}



export function deleteProductCart(orderId, productId) {
  return function(dispatch) {
    return axios.delete(`http://localhost:3001/orders/orderdelete/${orderId}/${productId}`)
      .then(result => result.data)
      .then(data => {
        dispatch({
          type: DELETE_PRODUCT_CART,
          payload: { orderId, productId }
        });
      });
  };
};

export function getSumaryCart(idUser) {
  console.log("USUARIOOOOOO", idUser)
  return function(dispatch) {
    return axios.get("http://localhost:3001/users/cart/sumary/" + idUser)
      .then(result => result.data)
      .then(data => {
        dispatch({
          type: GET_SUMARY_CART,
          payload: data
        })
      })
  }
}

export function sendEmailVisited(body) {
    
  return function(dispatch) {
    return axios.post(`http://localhost:3001/users/send_email/`,body)
      .then(result => result.data)
      .then(data => {
        dispatch({
          type: SEND_EMAIL_VISITED,
          payload: data
        })
      })
  }
}
