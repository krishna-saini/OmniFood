import { Fragment, useContext, useReducer, useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import CartContext from "../../store/cart-context";

const MealItemForm = (props) => {
  // const [quantity, setQuantity] = useState(1);
  //use ref insteas as we just want to read the value of input
  const quantityInputRef = useRef(1);
  const [amountIsValid, setAmountIsValid] = useState(true);

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (e) => {
    e.preventDefault();
    const enteredQuantity = +quantityInputRef.current.value;

    if (
      // enteredQuantity.trim().length === 0 ||
      enteredQuantity < 1 ||
      enteredQuantity > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    const mealDetails = [{ ...props.meal, quantity: enteredQuantity }];
    cartCtx.addItem(mealDetails[0]);
  };

  return (
    <form type="submit" onSubmit={addToCartHandler} className={classes.form}>
      <Input
        ref={quantityInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <Button type="submit">+ Add</Button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
