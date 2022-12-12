import React, { useEffect, useState } from "react";
import styles from "../styles/header.module.css";
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, clearInfo, updateShowCart } from "../store/userReducer";
import logo from '../assets/images/logo.png';
import { Box, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  // const [user, setUser] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.info);
  const carts = useSelector((state) => state.user.carts);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const totalQuantity = carts.reduce(
    (total, cart) => (total += cart.quantity),
    0
  );

  const totalPrice = carts.reduce(
    (total, cart) =>
      (total += cart.price * cart.quantity),
    0
  );

  // let location = useLocation();
  //url changes, change the user, monitor the sign in/sign out

  //addded the signout functionality
  const signOut = () => {
    localStorage.removeItem('user');
    dispatch(clearInfo());
    navigate("/SignIn");
    setAnchorEl(null);
  };

  const toInquires = () => {
    navigate('/inquires');
    setAnchorEl(null);
  }

  const toBilling = () => {
    navigate('/billing');
    setAnchorEl(null);
  }

  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Logo" className={styles.logoIcon} />
            <span className={styles.logoFontLarge}>Bookstore</span>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.rightItem}>
            <AiOutlineUser fontSize={22} />
            {
              user ? (
                <Box display="flex" alignItems="center">
                  <span className={styles.userItem} onClick={handleClick}>{user.email}</span>
                </Box>
              ) : (
                <Link to="/SignIn" className={styles.rightItemText}>
                  Sign In
                </Link>
              )
            }
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {
                user && !user.isAdmin && <MenuItem onClick={toInquires}>Inquire Order</MenuItem>
              }
              {
                user && !user.isAdmin && <MenuItem onClick={toBilling}>My Billings</MenuItem>
              }
              <MenuItem onClick={signOut}>Sign Out</MenuItem>
            </Menu>
          </div>
          {
            (user && !user.isAdmin) && (
              <div className={styles.rightItem}>
                <IoCartOutline
                  fontSize={22}
                  className={styles.cart}
                  onClick={() => dispatch(updateShowCart(true))}
                />
                <div className={styles.badge}>{totalQuantity}</div>
                <span className={styles.rightItemPriceText}>${totalPrice.toFixed(2)}</span>
              </div>
            )
          }
        </div>
      </div>
      <div className={styles.headerInner}>
        <div className={styles.searchWrapperMobile}>
          <input className={styles.searchInput} placeholder="Search" />
          <AiOutlineSearch />
        </div>
      </div>
    </div>
  );
}

export default Header;
