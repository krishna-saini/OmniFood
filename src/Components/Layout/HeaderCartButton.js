import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

import cartContext from "../../store/cart-context";

const HeaderCartButtton = (props) => {
  const cartCtx = useContext(cartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((currNumber, item) => {
    return currNumber + item.quantity;
  }, 0);

  const [isCartUpdated, setIsCartUpdated] = useState(false);
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    const timer = setIsCartUpdated(true);
    setTimeout(() => {
      setIsCartUpdated(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [numberOfCartItems, items.length ]);
  const btnClasses = `${classes.button} ${isCartUpdated ? classes.bump : ""}`;

  return (
    <>
      <button className={btnClasses} onClick={props.toShowCart}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </>
  );
};
export default HeaderCartButtton;
