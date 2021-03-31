/**
 * @format
 */

import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GlobalContext from "../../GlobalContext";
import ShiroMusumeItem from "../ShiroMusumeItem";

export default function ShiroMusumeList() {
  const classes = useStyles();
  const context = useContext(GlobalContext);

  return (
    <div className={classes.container}>
      {context.musumes.map((musume) => (
        <ShiroMusumeItem key={musume.id} musume={musume} />
      ))}
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    minHeight: "0px",
    height: "100px",
    width: "100%",
    flex: "1",
    overflowY: "auto",
  },
});
