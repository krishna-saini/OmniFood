import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <>
      <button type="submit" className={classes.button} onClick={props.onClick}>
        {props.children}
      </button>
    </>
  );
};

export default Button;
