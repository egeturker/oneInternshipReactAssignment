import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CartItem from "./CartItem";
import { setCart, setCartTotal } from "../features/shop/shopSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  cart: {
    minHeight: "320px",
    width: "285px",
    background: "#FFF",
    border: "6px solid #1EA4CE",
    borderRadius: "2px",
    marginRight: "5px",
    padding: "10px",
  },
  cartTotal: {
    border: "3px solid #1EA4CE",
    borderRadius: "1px",
    padding: "8px",
    backgroundColor: "#fff",
    width: "80px",
    height: "40px",
    marginTop: "10px",
  },
});

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.shop.cart);
  const cartTotal = useSelector((state) => state.shop.cartTotal);

  const removeItem = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    dispatch(setCart(newCart));
  };

  return (
    <>
      <Box className={classes.cart}>
        {cart.map((item) => {
          return (
            <Box>
              <CartItem
                removeItem={removeItem}
                id={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
              />
            </Box>
          );
        })}
      </Box>
      <Box className={classes.cartTotal}>₺ {cartTotal.toFixed(2)}</Box>
    </>
  );
};

export default Cart;
