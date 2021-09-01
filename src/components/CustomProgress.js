import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  filterBox: {
    background: "#FFF",
    height: "184px",
    boxShadow: "0px 6px 24px rgba(93, 62, 188, 0.04)",
    borderRadius: "2px",
    color: "#525252",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  progress: {},
});

const CustomProgress = () => {
  const classes = useStyles();
  return (
    <Box className={classes.filterBox}>
      <CircularProgress color="secondary" className={classes.progress} />
    </Box>
  );
};

export default CustomProgress;
