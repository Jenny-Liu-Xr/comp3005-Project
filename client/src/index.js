import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginForm from "./components/SignIn";
import SignUpForm from "./components/SignUp";
import HomePage from "./components/Homepage";
import SingleProduct from "./components/SingleProduct";
import AddProduct from "./components/AddProduct";
import { Provider } from "react-redux";
import store from "./store/store";
import Admin from './components/Admin'
import Users from './components/Users'
import Products from './components/Products'
import CheckoutSuccess from './components/CheckoutSuccess'
import Orders from './components/Orders'
import Shipping from "./components/Shipping";
import Publisher from "./components/Publisher";
import Dashboard from "./components/Dashboard";
import Inquires from "./components/Inquires";
import Billing from "./components/Billing";

//added routers
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/SignIn",
        element: <LoginForm />,
      },
      {
        path: "/SignUp",
        element: <SignUpForm />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/checkoutSuccess",
        element: <CheckoutSuccess />,
      },
      {
        path: "/inquires",
        element: <Inquires />,
      },
      {
        path: "/billing",
        element: <Billing />,
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'products', element: <Products /> },
          { path: 'addProduct', element: <AddProduct /> },
          { path: 'editProduct/:id', element: <AddProduct /> },
          { path: 'orders', element: <Orders /> },
          { path: 'shipping/:orderId', element: <Shipping /> },
          { path: 'publishers', element: <Publisher /> },
        ]
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* RouterProvider => router  / whats's the difference between Provider => redux */}
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//? can we delete?
