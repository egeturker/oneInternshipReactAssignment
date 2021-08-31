import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ButtonGroup } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
  cartItem: {
    height: "40px",
    background: "#FFF",
    width: "100%",
  },
  buttonGroup: {
    marginLeft: "10px",
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
  },

  itemName: {
    color: "#191919",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "20px",
    fontStyle: "normal",
    fontFamily: "Open Sans",
    height: "30px",
  },
});

const CartItem = ({ removeItem, id, name, price }) => {
  const [count, setCount] = useState(1);

  const classes = useStyles();
  return (
    <Box className={classes.cartItem} p={3} display="flex">
      <Box>
        <Box className={classes.itemName} fullWidth>
          {name}
        </Box>
        <Box className={classes.itemPrice} fullWidth>
          {price}
        </Box>
      </Box>
      <Box>
        <ButtonGroup variant="text" className={classes.buttonGroup}>
          <Button
            className={classes.button}
            onClick={() => {
              if (count === 1) removeItem(id);
              else setCount(count - 1);
            }}
          >
            -
          </Button>
          <Button className={classes.button}>{count}</Button>
          <Button
            className={classes.button}
            onClick={() => {
              setCount(count + 1);
            }}
          >
            +
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default CartItem;
