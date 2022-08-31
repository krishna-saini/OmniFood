import React from "react";
import classes from "./Header.module.css";
import HeaderCartButtton from "./HeaderCartButton";

//importing images
import mealsImage from "../../assets/mealsImage.jpg";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Omnifood</h1>
        <HeaderCartButtton toShowCart={props.toShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="table full of tasty food" />
      </div>
    </React.Fragment>
  );
};
export default Header;
