import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import dummyImg from "../images/placeholder.jpg";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { setCart } from "../features/shop/shopSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  item: {
    width: "124px",
    marginBottom: "20px",
  },
  itemBg: {
    background: "#EFEFEF",
    width: "124px",
    height: "124px",
    border: "1.17px solid #F3F0FE",
    borderRadius: "12px",
  },

  itemImg: {
    width: "92px",
    height: "92px",
  },

  itemPrice: {
    color: "#1EA4CE",
    fontWeight: "600",
    fontFamily: "Helvetica",
    fontSize: "14px",
    marginTop: "5px",
    marginLeft: "3px",
  },

  itemName: {
    color: "#191919",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "20px",
    fontStyle: "normal",
    height: "40px",
    marginLeft: "3px",
  },

  itemButton: {
    width: "124px",
    height: "22px",
    backGroundColor: "#1EA4CE",
    borderRadius: "2px",
    color: "#FFF",
    marginTop: "5px",
    textTransform: "none",
  },
});

const Item = ({ name, price }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.shop.cart);

  const addItemHandler = () => {
    const cartItem = {
      id: cart.length + 1,
      name,
      price,
    };

    const newCart = [...cart, cartItem];
    dispatch(setCart(newCart));
  };

  return (
    <Box className={classes.item}>
      <Box
        className={classes.itemBg}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <img src={dummyImg} alt="" className={classes.itemImg} />
      </Box>
      <Box className={classes.itemPrice}>₺{price}</Box>
      <Box className={classes.itemName}>{name}</Box>
      <Button
        variant="contained"
        color="primary"
        className={classes.itemButton}
        onClick={addItemHandler}
      >
        Add
      </Button>
    </Box>
  );
};
export default Item;
