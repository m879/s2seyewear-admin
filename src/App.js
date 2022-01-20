import React, { Component,useEffect,useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from './Routes/Route';
import Home from './containers/Home';
import Login from './components/Login';

import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import Layout from './Routes/Layout';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());    
  }, []);


  return (
    <>
    <Provider store={store}>
      <Router>
          <Layout >
             {/* <Route path="/"             component={Home} exact/> */}
             <Route path="/"   component={Login} exact/>
             <Route component={Routes} />
            </Layout>
        </Router>
      </Provider>

    </>
  );
}
export default App;
