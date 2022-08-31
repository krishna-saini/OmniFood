import react, { useState } from "react";

const AuthContext = react.createContext({
  val: false,
  cartDisplayRequested: () => {},
});

//creating component to handle context management
export const AuthContextProvider = (props) => {
  const [cartButtonClicked, setCartButtonClicked] = useState(false);
  const func2 = () => {
    setCartButtonClicked(true);
  };

  const func = () => {};
  return (
    <AuthContext.Provider
      value={{
        val: cartButtonClicked,
        cartDisplayRequested: func2,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
