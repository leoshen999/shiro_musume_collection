import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

interface Props {
  filters: Array<{ id: string; name: string; color: string }>;
  selections: Array<string>;
  onSelect: (id: string) => void;
  imageUriBase?: string;
}

export default function ShiroMusumeFilter({
  filters,
  selections,
  imageUriBase,
  onSelect,
}: Props) {
  const classes = useStyles();

  return (
    <div>
      {filters.map((f) => (
        <div
          key={f.id}
          className={clsx(classes.rowContainer, {
            [classes.selected]: selections.includes(f.id),
          })}
          style={{ backgroundColor: f.color }}
          onClick={() => {
            onSelect(f.id);
          }}
        >
          {imageUriBase !== undefined ? (
            <img
              className={classes.img}
              src={imageUriBase + "/" + f.id + ".png"}
              alt=""
            />
          ) : (
            <div className={classes.txt}>{f.name}</div>
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
    filter: "saturate(70%)",
  },
  img: {
    height: "auto",
    maxHeight: "100%",
  },
  txt: {
    whiteSpace: "nowrap",
    color: "white",
  },
});
