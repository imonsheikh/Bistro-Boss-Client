import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Shared/Secret/Secret";
import Dashboard from "../Layouts/Dashboard";
import Cart from "../pages/Dashboard/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdataItem from "../pages/Dashboard/UpdateItem/UpdataItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: 'menu',
          element: <Menu></Menu>
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        },
      ]
    }, 
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [ 
        //Normal users routes
       {
        path: 'userHome',
        element: <UserHome></UserHome> 
       },
       {
        path: 'cart',
        element: <Cart></Cart> 
       },
       {
        path: 'payment',
        element: <Payment></Payment> 
       },
       {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory> 
       },

       //Admin only routes 
       {
        path: 'adminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute> 
       },
       {
        path: 'addItems',
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
        // element: <AddItems></AddItems>
       },
       {
        path: 'manageItems',
        element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
       }, 
       {
        path: 'updateItem/:id',
        element: <AdminRoute><UpdataItem></UpdataItem></AdminRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`) //without component we can not call custom hook
       }, 
       {
        path: 'users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute> 
       }, 

      ] 
    }
  ]);