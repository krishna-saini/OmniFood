import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReduceFn = (prevState, action) => {
  //dont mutate prevstate

  let updatedItems;
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = prevState.items.findIndex(
      (obj) => obj.id === action.item.id
    );

    const existingCartItem = prevState.items[existingCartItemIndex];

    if (existingCartItem) {
      // updatedItems = [...prevState.items];
      // updatedItems[index].quantity += action.item.quantity;
      // console.log(prevState);
      //do not update prev state

      const updatedItem = {
        //making copy
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      updatedItems = [...prevState.items]; //making copy ot prevstatte
      updatedItems[existingCartItemIndex] = updatedItem;
      console.log(prevState);
    } else {
      updatedItems = prevState.items.concat(action.item);
    }

    const updatedTotalAmount =
      prevState.totalAmount + action.item.price * action.item.quantity;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = prevState.items.findIndex(
      (obj) => obj.id === action.id
    );
    const existingCartItem = prevState.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem.quantity === 1) {
      updatedItems = prevState.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updatedItems = [...prevState.items]; //making copy ot prevstatte
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    const updatedTotalAmount =
      prevState.totalAmount - existingCartItem.price * 1;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

//creating component to handle context management
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReduceFn,
    defaultCartState
  );

  const addItemHandler = (item) => {
    // console.log(item);
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
