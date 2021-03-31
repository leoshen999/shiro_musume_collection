/**
 * @format
 */

import { makeStyles } from "@material-ui/core/styles";
import Header from "../src/components/Header";
import ShiroMusumeList from "../src/components/ShiroMusumeList";

export default function IndexPage() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <ShiroMusumeList />
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    width: "100%",
    height: "100vh",
  },
}));
