import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CartItem from "./CartItem";
import { setCart, setCartTotal } from "../features/shop/shopSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useStyles = makeStyles({
  cart: {
    minHeight: "320px",
    background: "#FFF",
    border: "6px solid #1EA4CE",
    borderRadius: "2px",
    width: "90%",
  },
});

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.shop.cart);
  const cartTotal = useSelector((state) => state.shop.cartTotal);

  useEffect(() => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    dispatch(setCartTotal(total));
  });

  const removeItem = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    dispatch(setCart(newCart));
  };

  return (
    <Box className={classes.cart}>
      {cart.map((item) => {
        return (
          <CartItem
            removeItem={removeItem}
            id={item.id}
            name={item.name}
            price={item.price}
          />
        );
      })}
    </Box>
  );
};

export default Cart;
