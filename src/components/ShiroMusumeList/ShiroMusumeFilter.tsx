/**
 * @format
 */

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

export default function ShiroMusumeFilter({
  filters,
  selections,
  imageUriBase,
  backgroundColor,
  onSelect,
}) {
  const classes = useStyles();

  return (
    <div>
      {filters.map(f=>(
        <div
          key={f.id}
          className={clsx(classes.rowContainer, {
            [classes.selected]: selections.includes(f.id),
          })}
          style={{backgroundColor: backgroundColor}}
          onClick={() => {onSelect(f.id);}}
        >
          {imageUriBase !== undefined ? (
            <img
              className={classes.img}
              src={imageUriBase + "/" + f.id + ".png"}
            />
          ) : (
            <div className={classes.txt}>
              {f.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const useStyles = makeStyles({
  rowContainer: {
    width: "35px",
    height: "22px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3px",
    marginBottom: "3px",
    overflowX: "hidden",
    borderRadius: "5px",
    filter: "brightness(60%)",
    userSelect: "none",
    cursor: "pointer",
    transitionDuration: "0.3s",
  },
  selected: {
    filter: "none",
  },
  img: {
    height: "auto",
    maxHeight: "100%",
  },
  txt: {
    whiteSpace: "nowrap",
    color: "white",
  }
});
