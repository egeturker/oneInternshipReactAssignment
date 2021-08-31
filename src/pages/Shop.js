import React from "react";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import basketIcon from "../images/basket.png";
import CustomRadio from "../components/CustomRadio";
import CustomCheckbox from "../components/CustomCheckbox";
import ItemContainer from "../components/ItemContainer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getItems, getCompanies } from "../features/shop/shopSlice";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

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
  bannerCart: {
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
  bannerCartTotal: {
    color: "#FFF",
    marginLeft: "20px",
    fontSize: "14px",
  },

  filterBox: {
    marginTop: "55px",
  },

  boxTitle: {
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
    height: "1000px",
  },
  cart: {
    height: "320px",
    background: "#FFF",
    marginTop: "55px",
    marginLeft: "15px",
  },
});

const Shop = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.shop.items);
  const companies = useSelector((state) => state.shop.companies);
  const sortType = useSelector((state) => state.shop.sortType);

  const [slug, setSlug] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    dispatch(getItems());
    dispatch(getCompanies());
  }, []);
  useEffect(() => {
    setSlug(companies.map((company) => company.slug));
  }, [companies]);
  useEffect(() => {
    const tempTags = [];
    items.mugs.map((item) => {
      item.tags.map((tag) => {
        if (!tempTags.includes(tag)) tempTags.push(tag);
      });
    });
    setTags(tempTags);
  }, [items]);

  return (
    <>
      <Box className={classes.banner}>
        <Box className={classes.main}>
          <Box className={classes.bannerCart}>
            <span className={classes.bannerCartTotal}>₺ 39,97</span>
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
              <CustomRadio />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.filterBox}>
              <span className={classes.boxTitle}>Brands</span>
              {slug.length > 0 && <CustomCheckbox filter={slug} />}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.filterBox}>
              <span className={classes.boxTitle}>Tags</span>
              {tags.length > 0 && <CustomCheckbox filter={tags} />}
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box className={classes.productsArea}>
            {items.mugs.length > 0 && (
              <ItemContainer items={items} sortType={sortType} />
            )}
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box className={classes.cart}></Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Shop;
