import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ButtonGroup } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { Divider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { setCart, setCartTotal } from "../features/shop/shopSlice";

const useStyles = makeStyles({
  cartItem: {
    height: "65px",
    background: "#FFF",
    width: "100%",
    borderBottom: "1px solid #F4F4F4",
  },
  buttonGroup: {
    marginLeft: "5px",
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    width: "50px",
  },
  button: {
    width: "40px",
    height: "40px",
    outline: "none",
    float: "right",
  },

  itemPrice: {
    color: "#1EA4CE",
    fontWeight: "700",
    fontFamily: "Helvetica",
    fontSize: "14px",
    marginTop: "7px",
  },

  itemName: {
    color: "#191919",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "20px",
    fontStyle: "normal",
    fontFamily: "Open Sans",
    height: "30px",
    width: "140px",
  },
});

const CartItem = ({ removeItem, id, name, price, amount }) => {
  const cartTotal = useSelector((state) => state.shop.cartTotal);

  const increment = () => {
    let newCart = [...cart];
    let existingItemIndex;
    let existingItem;

    cart.map((item, index) => {
      if (item.name === name) {
        existingItem = { ...item };
        existingItemIndex = index;
      }
    });
    existingItem.amount++;
    newCart.splice(existingItemIndex, 1);
    newCart.splice(existingItemIndex, 0, existingItem);
    dispatch(setCart(newCart));
    const newTotal = cartTotal + price;
    dispatch(setCartTotal(newTotal));
  };

  const decrement = () => {
    if (amount === 1) {
      const newTotal = cartTotal - price;
      dispatch(setCartTotal(newTotal));
      removeItem(id);
    } else {
      let newCart = [...cart];
      let existingItemIndex;
      let existingItem;

      cart.map((item, index) => {
        if (item.name === name) {
          existingItem = { ...item };
          existingItemIndex = index;
        }
      });
      existingItem.amount--;
      newCart.splice(existingItemIndex, 1);
      newCart.splice(existingItemIndex, 0, existingItem);
      dispatch(setCart(newCart));
      const newTotal = cartTotal - price;
      dispatch(setCartTotal(newTotal));
    }
  };

  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shop.cart);

  return (
    <Box className={classes.cartItem} display="flex">
      <Box>
        <Box className={classes.itemName}>{name}</Box>
        <Box className={classes.itemPrice}>₺ {price}</Box>
      </Box>
      <Box>
        <ButtonGroup variant="text" className={classes.buttonGroup}>
          <Button className={classes.button} onClick={decrement}>
            -
          </Button>
          <Button className={classes.button}>{amount}</Button>
          <Button className={classes.button} onClick={increment}>
            +
          </Button>
        </ButtonGroup>
      </Box>
      <Divider />
    </Box>
  );
};

export default CartItem;
