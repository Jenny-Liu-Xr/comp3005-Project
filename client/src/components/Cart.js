import React from 'react'
import styles from '../styles/cart.module.css';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import {addCartToDB, deleteCartFromDB, getCartFromDB, updateShowCart} from '../store/userReducer'
import { toast } from 'react-toastify';
import BookImage from "../assets/images/book.png";
import {useNavigate} from "react-router-dom";

function Cart() {
  const carts = useSelector((state) => state.user.carts);
  const user = useSelector((state) => state.user.info);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = carts.reduce((total, cart) => total += cart.price * cart.quantity, 0);

  const checkout = () => {
    fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user.ID,
        carts,
        amount: totalPrice * 1.1
      }),
    })
      .then(res => {
        if (res.message) {
          toast.error(res.message);
        } else {
          dispatch(getCartFromDB(user.ID));
          dispatch(updateShowCart(false));
          navigate('/checkoutSuccess');
        }
      })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <span className={styles.title}>Cart</span>
            <span>({carts.length})</span>
          </div>
          <div>
            <MdClose onClick={() => dispatch(updateShowCart(false))} className={styles.closeIcon} />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.list}>
            {
              carts.map(product => (
                <div key={product.ISBN} className={styles.item}>
                  <div className={styles.itemLeft}>
                    <img className={styles.itemImg} src={BookImage} />
                    <div className={styles.itemContent}>
                      <div className={styles.itemName}>{product.name}</div>
                      <div className={styles.buttonGroup}>
                        <button onClick={(event) => {
                          event.stopPropagation();
                          dispatch(deleteCartFromDB({ userId: user.ID, productId: product.ISBN, remove: false }))
                            .then(() => {
                              dispatch(getCartFromDB(user.ID));
                            });;
                        }}>
                          -
                        </button>
                        <div>{carts.find(cart => cart.ISBN === product.ISBN).quantity}</div>
                        <button onClick={(event) => {
                          event.stopPropagation();
                          dispatch(addCartToDB({ userId: user.ID, productId: product.ISBN }))
                            .then(() => {
                              dispatch(getCartFromDB(user.ID));
                            });
                        }}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.itemRight}>
                    <div className={styles.price}>{product.price}</div>
                    <div className={styles.remove}
                         onClick={
                           () => dispatch(deleteCartFromDB({ userId: user.ID, productId: product.ISBN, remove: true }))
                             .then(() => {
                               dispatch(getCartFromDB(user.ID));
                             })
                         }>
                      Remove
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className={styles.checkout}>
          <div className={styles.row}>
            <div>Subtotal</div>
            <div>${totalPrice.toFixed(2)}</div>
          </div>
          <div className={styles.row}>
            <div>Tax</div>
            <div>${(totalPrice * 0.1).toFixed(2)}</div>
          </div>
          <div className={styles.row}>
            <div>Estimated total</div>
            <div>${(totalPrice + totalPrice * 0.1).toFixed(2)}</div>
          </div>
          <div className={styles.checkoutBtnWrapper}>
            <button className="full-width" onClick={checkout}>Continue to checkout</button>
          </div>
        </div>
      </div>
      <div className={styles.shadow}></div>
    </>
  )
}

export default Cart;
