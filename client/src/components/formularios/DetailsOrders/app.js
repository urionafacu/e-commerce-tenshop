import React from 'react';
import { Route } from 'react-router-dom';
import Checkorder from './Checkorder';

function App() {
    if(ls.get('idProducts')== null){

        ls.set('idProducts',[]);
    }

    return (
      <div className="App jumbotron bg-white">
          <Route exact path="/orders/details" render={() => <Checkorder />} />                
      </div>
      )

}

export default App;
