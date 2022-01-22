import React ,{useEffect,useState}from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from './PrivateRoute';

import Dashboard from '../containers/Home';
import Login from '../components/Login';
import AllOrders from '../containers/AllOrders';
import OrderDetails from '../containers/OrderDetails';
import ManageProducts from '../containers/ManageProducts';
import AddCategory from '../containers/AddCategory';
import AllUsers from '../containers/AllUsers'


export default function AllRoute() {
    return (
        <div>
           <Switch>
               <PrivateRoute path="/dashboard"   component={Dashboard} />
               <PrivateRoute path="/orders"   component={AllOrders} />
               <PrivateRoute path="/details/:id"   component={OrderDetails} />
               <PrivateRoute path="/products"   component={ManageProducts} />
               <PrivateRoute path="/category"   component={AddCategory} />
               <PrivateRoute path="/users"   component={AllUsers} />
           </Switch>
        </div>
    )
}
