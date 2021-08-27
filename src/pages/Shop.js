import React from "react";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import basketIcon from "../images/basket.png";

const useStyles = makeStyles({
  main: {
    maxWidth: "1440px",
    height: "1500px",
    margin: "auto",
  },
  banner: {
    background: "#1EA4CE",
    height: "77px",
  },
  cart: {
    background: "#147594",
    width: "130px",
    height: "77px",
    float: "right",
    marginRight: "100px",
    backgroundImage: `url(${basketIcon})`,
    backgroundPosition: "30px",
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "81px",
  },
  cartTotal: {
    color: "#FFF",
    marginLeft: "20px",
    fontSize: "14px",
  },
  filterBox: {
    background: "#FFF",
    height: "184px",
    marginTop: "55px",
    boxShadow: "0px 6px 24px rgba(93, 62, 188, 0.04)",
    borderRadius: "2px",
  },
  boxTitle: {
    position: "relative",
    top: "-25px",
    fontSize: "13px",
    color: "#697488",
  },
  productsTitle: {
    position: "relative",
    top: "-30px",
    fontSize: "20px",
    color: "#697488",
  },
  productsArea: {
    marginTop: "55px",
    marginLeft: "15px",
    background: "#FFF",
    height: "1000px",
  },
});

const Shop = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.banner}>
        <Box className={classes.main}>
          <Box className={classes.cart}>
            <span className={classes.cartTotal}>₺ 39,97</span>
          </Box>
        </Box>
      </Box>
      <Grid container className={classes.main}>
        <Grid item xs={1}></Grid>
        <Grid
          item
          container
          display="flex"
          flexDirection="column"
          alignContent="flex-start"
          xs={2}
        >
          <Grid item xs={12}>
            <Box className={classes.filterBox}>
              <span className={classes.boxTitle}>Sorting</span>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.filterBox}>
              <span className={classes.boxTitle}>Brands</span>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.filterBox}>
              <span className={classes.boxTitle}>Tags</span>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Box className={classes.productsArea}>
            <span className={classes.productsTitle}>Products</span>
          </Box>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
};

export default Shop;
