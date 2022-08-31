import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  // console.log(cartCtx);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  // console.log(cartCtx.meals[0].quantity);

  const hasItems = cartCtx.items.length > 0;

  const cartAddItemHandler = (item) => {
    const updatedItem = { ...item, quantity: 1 }; //making copy, dont update prev
    cartCtx.addItem(updatedItem);
  };

  const cartRemoveItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {/* {[{ id: "g1", name: "shushi", quantity: 2, amount: 9.99 }] */}
      {cartCtx.items.map((meal) => (
        <CartItem
          key={meal.id}
          name={meal.name}
          price={meal.price}
          quantity={meal.quantity}
          onAdd={cartAddItemHandler.bind(null, meal)}
          onRemove={cartRemoveItemHandler.bind(null, meal.id)}
        />
      ))}
    </ul>
  );

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      props.toHideCart();
    }
  });

  return (
    <Modal onClick={props.toHideCart}>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.toHideCart}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={props.toShowPaymentpage}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
