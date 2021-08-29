import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";

const useStyles = makeStyles({
  sortingBox: {
    background: "#FFF",
    height: "184px",
    boxShadow: "0px 6px 24px rgba(93, 62, 188, 0.04)",
    borderRadius: "2px",
    paddingLeft: "20px",
    paddingTop: "5px",
    color: "#525252",
  },
});

const CustomRadio = () => {
  const classes = useStyles();

  const [value, setValue] = useState("lowToHigh");
  return (
    <>
      <Box className={classes.sortingBox}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="price"
            name="price"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          >
            <FormControlLabel
              value="lowToHigh"
              control={<Radio />}
              label="Price low to high"
            />
            <FormControlLabel
              value="highToLow"
              control={<Radio />}
              label="Price high to low"
            />
            <FormControlLabel
              value="newToOld"
              control={<Radio />}
              label="New to old"
            />
            <FormControlLabel
              value="oldToNew"
              control={<Radio />}
              label="Old to new"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};
export default CustomRadio;
