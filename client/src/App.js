import React, { useEffect } from 'react'
import Header from "./components/Header";
import styles from "./styles/app.module.css";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import {getCartFromDB, setCart, setInfo, setProducts} from './store/userReducer'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    let user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      dispatch(setInfo(user));
      dispatch(getCartFromDB(user.ID));
    }
  }, [])

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.main}>
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
