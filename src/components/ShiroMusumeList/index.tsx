/**
 * @format
 */

import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GlobalContext from "../../GlobalContext";
import ShiroMusumeItem from "./ShiroMusumeItem";

export default function ShiroMusumeList() {
  const classes = useStyles();
  const context = useContext(GlobalContext);

  return (
    <div className={classes.container}>
      <div className={classes.filtersContainer}>
      </div>
      <div className={classes.itemsContainer}>
        {context.musumes.map((musume) => (
          <ShiroMusumeItem key={musume.id} musume={musume} />
        ))}
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    width: "100vw",
    height: "100vh",
  },
  filtersContainer: {
    minHeight: "0px",
    minWidth: "20px",
    height: "100%",
    width: "20px",
    borderRightStyle: "solid",
    borderRightColor: "gray",
    borderRightWidth: "1px",
    overflowY: "auto",
  },
  itemsContainer: {
    minHeight: "0px",
    minWidth: "0px",
    height: "100%",
    flex: "1",
    overflowY: "auto",
  },
});
