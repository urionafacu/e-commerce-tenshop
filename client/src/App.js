import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import NavBar from "./components/NavBar"
import Product from "./components/Products/Product"
import FormProduct from "./components/formularios/FormProduct"
import Catalogue from "./components/Products/Catalogue"
import About from "./components/About"
import FormAddProduct from "./components/formularios/FormAddProduct"
import FormCategory from "./components/formularios/FormCategory"
import Contact from './components/Contact.jsx';
import SearchProduct from './components/Products/SearchProduct.jsx';
import MenuCategories from './components/Products/MenuCategories';
import SignUp from "./components/SignUp"
import SignInPro from "./components/SignInPro"
import SignUpPro from "./components/SignUpPro"
import { UserMe } from './components/UserMe'
import Cart from './components/cart/Cart';
import FormAdmin from './components/formularios/FormAdmin';
import FormOrders from './components/formularios/FormOrders';
import Orders from './components/formularios/FormAdmin';
import SliderImage from './components/SliderImage';
import Footer from './components/Footer';
import Page404 from './components/Page404';
import Activeaccount from './components/Activeaccount';
var ls = require('local-storage');


function App() {
    if(ls.get('idProducts')== null){

        ls.set('idProducts',[]);
    }


    return (
      <div className="App jumbotron">
          <Route path="/" component={NavBar} />
          <Route exact path="/" component={SliderImage} />
          <Route exact path="/" component={Catalogue} />
          <Route path="/product/:id" render={({match}) => <Product id={match.params.id}/> } />
          <Route exact path="/formProduct" component={FormProduct} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/formAddProduct" component={FormAddProduct} />
          <Route exact path= "/formCategory" component={FormCategory} />
          <Route exact path="/search" component={SearchProduct} />
          <Route exact path="/categories/:categories" render={({match}) => <MenuCategories category={match.params.categories}/> } />
          <Route exact path="/signin" component={SignInPro}/>
          <Route exact path="/signup" component={SignUpPro} />
          <Route exact path="/signupcomun" component={SignUp} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/orders" component={FormOrders} />
          <Route exact path="/admin" component={FormAdmin} />
          <Route exact path="/404" component={Page404} />
          <Route exact path="/activeaccount" component={Activeaccount} />
          <Route exact path="/me" component={UserMe}/>
          <Route path="/" component={Footer} />
      </div>
      )

}

export default App;
