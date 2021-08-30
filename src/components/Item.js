import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import dummyImg from "../images/placeholder.jpg";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  item: {
    width: "124px",
    marginBottom: "15px",
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

  itemButton: {
    width: "124px",
    height: "22px",
    backGroundColor: "#1EA4CE",
    borderRadius: "2px",
    color: "#FFF",
  },
});

const Item = ({ name, price }) => {
  const classes = useStyles();

  const addItemHandler = () => {};

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
      <Box className={classes.itemPrice} m={1}>
        {price}
      </Box>
      <Box className={classes.itemName} m={1}>
        {name}
      </Box>
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
