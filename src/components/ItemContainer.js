import { Box } from "@material-ui/core";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Item from "./Item";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ItemContainer = ({ items, sortType }) => {
  const numberOfItemsInContainer = 16;
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(1);
  const [displayedItems, setDisplayedItems] = useState(items.mugs.slice(0, 16));
  const [numberOfPages, setNumberOfPages] = useState(
    Math.ceil(items.mugs.length / numberOfItemsInContainer)
  );

  const [sorted, setSorted] = useState(items);
  const companies = useSelector((state) => state.shop.companies);
  const tags = useSelector((state) => state.shop.tags);
  const checkedCompanies = useSelector((state) => state.shop.checkedCompanies);
  const checkedTags = useSelector((state) => state.shop.checkedTags);

  const handlePageChange = (event, value) => {
    if (tabValue === 0) {
      setDisplayedItems(
        sorted.mugs.slice(
          (value - 1) * numberOfItemsInContainer,
          value * numberOfItemsInContainer
        )
      );
    } else if (tabValue === 1) {
      setDisplayedItems(
        sorted.shirts.slice(
          (value - 1) * numberOfItemsInContainer,
          value * numberOfItemsInContainer
        )
      );
    }

    setPage(value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      setNumberOfPages(
        Math.ceil(sorted.mugs.length / numberOfItemsInContainer)
      );
      setDisplayedItems(sorted.mugs.slice(0, 16));
    }
    if (newValue === 1) {
      setNumberOfPages(
        Math.ceil(sorted.shirts.length / numberOfItemsInContainer)
      );
      setDisplayedItems(sorted.shirts.slice(0, 16));
    }

    setPage(1);
  };

  useEffect(() => {
    let mugs = items.mugs.slice();
    let shirts = items.shirts.slice();
    let mugsFiltered = [];
    let shirtsFiltered = [];

    checkedCompanies.map((company, index) => {
      if (company) {
        mugsFiltered = mugsFiltered.concat(
          mugs.filter((mug) => mug.manufacturer === companies[index].slug)
        );
      }
    });
    if (mugsFiltered.length === 0) mugsFiltered = mugs;
    let mugsFiltered2 = [];
    checkedTags.map((tag, index) => {
      if (tag) {
        mugsFiltered2 = mugsFiltered2.concat(
          mugsFiltered.filter((mug) => mug.tags.includes(tags[index]))
        );
      }
    });
    if (mugsFiltered2.length === 0) mugsFiltered2 = mugsFiltered;

    checkedCompanies.map((company, index) => {
      if (company) {
        shirtsFiltered = shirtsFiltered.concat(
          shirts.filter((shirt) => shirt.manufacturer === companies[index].slug)
        );
      }
    });
    if (shirtsFiltered.length === 0) shirtsFiltered = shirts;
    let shirtsFiltered2 = [];
    checkedTags.map((tag, index) => {
      if (tag) {
        shirtsFiltered2 = shirtsFiltered2.concat(
          shirtsFiltered.filter((shirt) => shirt.tags.includes(tags[index]))
        );
      }
    });
    if (shirtsFiltered2.length === 0) shirtsFiltered2 = shirtsFiltered;

    if (sortType === "lowToHigh") {
      mugsFiltered2.sort((a, b) => {
        return a.price - b.price;
      });
      shirtsFiltered2.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sortType === "highToLow") {
      mugsFiltered2.sort((a, b) => {
        return b.price - a.price;
      });
      shirtsFiltered2.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (sortType === "newToOld") {
      mugsFiltered2.sort((a, b) => {
        return a.added - b.added;
      });
      shirtsFiltered2.sort((a, b) => {
        return a.added - b.added;
      });
    } else if (sortType === "oldToNew") {
      mugsFiltered2.sort((a, b) => {
        return b.added - a.added;
      });
      shirtsFiltered2.sort((a, b) => {
        return b.added - a.added;
      });
    }

    const sortedItems = { mugs: mugsFiltered2, shirts: shirtsFiltered2 };
    setSorted(sortedItems);

    if (tabValue === 0) setDisplayedItems(sortedItems.mugs.slice(0, 16));
    else if (tabValue === 1) setDisplayedItems(sortedItems.shirts.slice(0, 16));
    setNumberOfPages(
      Math.ceil(sortedItems.mugs.length / numberOfItemsInContainer)
    );
    setPage(1);
  }, [sortType, checkedCompanies, checkedTags]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="shop tabs"
        >
          <Tab label="Mug" {...a11yProps(0)} />
          <Tab label="Shirt" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <Grid container>
          {displayedItems.map((item, index) => {
            return (
              <Grid item xs={3}>
                <Item key={index} name={item.name} price={item.price} />
              </Grid>
            );
          })}
        </Grid>
        <Pagination
          count={numberOfPages}
          page={page}
          onChange={handlePageChange}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container>
          {displayedItems.map((item) => {
            return (
              <Grid item xs={3}>
                <Item name={item.name} price={item.price} />
              </Grid>
            );
          })}
        </Grid>
        <Pagination
          count={numberOfPages}
          page={page}
          onChange={handlePageChange}
        />
      </TabPanel>
    </div>
  );
};
export default ItemContainer;
