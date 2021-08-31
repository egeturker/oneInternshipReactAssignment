import { useState, useEffect } from "react";
import { FormGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import { className } from "postcss-selector-parser";
import Scrollbars from "react-custom-scrollbars";
import {
  setCheckedCompanies,
  setCheckedTags,
} from "../features/shop/shopSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  filterBox: {
    background: "#FFF",
    height: "184px",
    boxShadow: "0px 6px 24px rgba(93, 62, 188, 0.04)",
    borderRadius: "2px",
    paddingLeft: "20px",
    paddingTop: "5px",
    color: "#525252",
  },

  checkBox: {
    width: "100%",
  },

  searchBox: {
    width: "90%",
  },
});

const CustomCheckbox = ({ filter, type }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchString, setSearchString] = useState("");

  let numberOfFilters = filter.length;
  const [boxChecked, setBoxChecked] = useState(() => {
    let checkBoxStates = [];
    while (numberOfFilters--) checkBoxStates[numberOfFilters] = false;
    return checkBoxStates;
  });

  useEffect(() => {
    if (type === "company") {
      dispatch(setCheckedCompanies(boxChecked));
    }
    if (type === "tag") dispatch(setCheckedTags(boxChecked));
  }, [boxChecked]);

  return (
    <Box className={classes.filterBox}>
      <TextField
        id="search"
        type="search"
        label="Search"
        onChange={(e) => setSearchString(e.target.value)}
        value={searchString}
        fullWidth
        className={classes.searchBox}
      />
      <Scrollbars style={{ height: 130, width: "92%" }}>
        <FormGroup row>
          {boxChecked.map((checkBox, index) => {
            if (filter[index].search(searchString) >= 0 || searchString === "")
              return (
                <FormControlLabel
                  className={classes.checkBox}
                  control={
                    <Checkbox
                      checked={checkBox}
                      onChange={(event) => {
                        const newBoxChecked = [...boxChecked];
                        newBoxChecked[index] = event.target.checked;
                        setBoxChecked(newBoxChecked);
                      }}
                    ></Checkbox>
                  }
                  label={filter[index]}
                />
              );
            else return <></>;
          })}
        </FormGroup>
      </Scrollbars>
    </Box>
  );
};

export default CustomCheckbox;
