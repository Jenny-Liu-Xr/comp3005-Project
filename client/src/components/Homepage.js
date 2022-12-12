import React, { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import {addCartToDB, deleteCartFromDB, getCartFromDB, setProducts, updateShowCart} from "../store/userReducer";
import {Button, Grid, Pagination, TextField} from '@mui/material'
import Box from '@mui/material/Box';
import BookImage from "../assets/images/book.png";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [keyword, setKeyword] = useState('');

  const user = useSelector((state) => state.user.info);
  const carts = useSelector((state) => state.user.carts);
  const showCart = useSelector((state) => state.user.showCart);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    getAllPsers();
  }, []);

  const getAllPsers = () => {
    fetch("http://localhost:3001/books?keyword=" + keyword)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
      });
  };

  const toDetail = (id) => {
    navigate(`/product/${id}`);
  };

  const addToCart = (event, product) => {
    event.stopPropagation(); //don't touch the container of singal product
    dispatch(updateShowCart(true));
    dispatch(addCartToDB({ userId: user.ID, productId: product.ISBN }))
      .then(() => {
        dispatch(getCartFromDB(user.ID));
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>
          <TextField label="Search" size="small" variant="outlined" value={keyword} onChange={e => setKeyword(e.target.value)} />
          <Button variant="contained" style={{marginLeft: 10}} onClick={() => getAllPsers(keyword)}>Search</Button>
        </div>
        <div className={styles.topRight}>
        </div>
      </div>
      <div className={styles.list}>
        {products.slice(pageIndex * 10, (pageIndex + 1) * 10).map((product) => (
          <div
            key={product.ISBN}
            className={styles.item}
            onClick={() => toDetail(product.ISBN)}
          >
            <img
              className={styles.itemImg}
              src={BookImage}
              alt="Book Image"
            />
            <div className={styles.itemInfo}>
              <div className={styles.productName}>{product.name}</div>
              <Grid display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                <div style={{fontSize: 14}}>By {product.author}</div>
                <div className={styles.productPrice}>{product.price}</div>
              </Grid>
            </div>
            {
              user && (
                <div className={styles.bottom}>
                  {carts.find((cart) => cart.ISBN === product.ISBN) ? (
                    <div className={styles.buttonGroup}>
                      <button
                        className={styles.addCartBtn}
                        onClick={(event) => {
                          event.stopPropagation();
                          dispatch(deleteCartFromDB({ userId: user.ID, productId: product.ISBN, remove: false }))
                            .then(() => {
                              dispatch(getCartFromDB(user.ID));
                            });
                        }}
                      >
                        -
                      </button>
                      <div>
                        {carts.find((cart) => cart.ISBN === product.ISBN).quantity}
                      </div>
                      <button
                        className={styles.addCartBtn}
                        onClick={(event) => {
                          event.stopPropagation();
                          dispatch(addCartToDB({ userId: user.ID, productId: product.ISBN }))
                            .then(() => {
                              dispatch(getCartFromDB(user.ID));
                            });
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className={styles.addCartBtn}
                      onClick={(event) =>
                        addToCart(event, product)}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              )
            }
          </div>
        ))}
      </div>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Pagination
          count={Math.ceil(products.length / 10)}
          shape="rounded"
          variant="outlined"
          page={pageIndex + 1}
          color="primary"
          onChange={(event, page) => setPageIndex(page - 1)} />
      </Box>
      {showCart && <Cart />}
    </div>
  );
}

export default HomePage;
