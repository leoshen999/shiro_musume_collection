/**
 * @format
 */

import { makeStyles } from "@material-ui/core/styles";

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    minHeight: "100px",
    height: "100px",
    width: "100%",
    borderBottomStyle: "solid",
    borderBottomColor: "gray",
    borderBottomWidth: "1px",
  },
});
