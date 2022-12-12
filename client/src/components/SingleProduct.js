import React, { useState, useEffect } from "react";
import styles from "../styles/singleProduct.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {addCartToDB, deleteCartFromDB, getCartFromDB, updateShowCart} from '../store/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import Cart from './Cart'
import BookImage from "../assets/images/book.png";

function SingleProduct() {
  const [product, setProduct] = useState();

  const { id } = useParams();

  const navigate = useNavigate();
  const carts = useSelector((state) => state.user.carts);
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.user.showCart);

  const user = useSelector((state) => state.user.info);

  useEffect(() => {
    fetch(`http://localhost:3001/books/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>Book Detail</div>
      </div>
      {product && (
        <div className={styles.detail}>
          <div className={styles.detailLeft}>
            <img className={styles.detailImg} src={BookImage} />
          </div>
          <div className={styles.detailRight}>
            <div className={styles.detailCategory}>{product.genre}</div>
            <div className={styles.detailName}>{product.name}</div>
            <div className={styles.detailIntro}>By {product.author}</div>
            <div className={styles.detailPrice}>
              <span>{product.price}</span>
            </div>
            <div className={styles.detailIntro}>Publisher: {product.publisher}</div>
            <div className={styles.detailIntro}>Number of pages: {product.pages}</div>
            {
              user && (
                <div>
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
                      onClick={() => {
                        dispatch(updateShowCart(true));
                        dispatch(addCartToDB({ userId: user.ID, productId: product.ISBN }))
                          .then(() => {
                            dispatch(getCartFromDB(user.ID));
                          });
                      }}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              )
            }
          </div>
        </div>
      )}
      {showCart && <Cart />}
    </div>
  );
}

export default SingleProduct;
