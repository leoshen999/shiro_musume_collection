import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import GlobalContext from "../../GlobalContext";

function paddingStr(num, size) {
  var s = "000000000" + num.toString();
  return s.substr(s.length - size);
}

interface Props {
  musume: {
    id: number;
    name: string;
    rarity: number;
    terrains: Array<string>;
    location: string;
    weapon: string;
  };
  weaponIdToTypeMapping: { [id: string]: string };
}

export default function ShiroMusumeItem({
  musume,
  weaponIdToTypeMapping,
}: Props) {
  const context = useContext(GlobalContext);
  const classes = useStyles();

  function handleClick() {
    context.onChangeOwn(musume.id, !context.owns.includes(musume.id));
  }

  let type = "other";
  if (musume.weapon in weaponIdToTypeMapping)
    type = weaponIdToTypeMapping[musume.weapon];

  const idStr = paddingStr(musume.id, 4);

  const own = context.owns.includes(musume.id);

  if (process.env.NEXT_PUBLIC_READ_ONLY_MODE === "true") {
    return (
      <a
        className={clsx(classes.container, classes.containerReadOnly)}
        href={"https://scre.swiki.jp/index.php?" + musume.name}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className={clsx(classes.musumeIcon, classes.musumeIconReadOnly)}
          src={"musume_images/" + idStr + ".png"}
          alt={musume.name}
          onClick={handleClick}
        />
        <div
          className={clsx(
            classes.textContainer,
            classes.textContainerReadOnly,
            type === "melee" && classes.textContainerMelee,
            type === "ranged" && classes.textContainerRanged,
            type === "both" && classes.textContainerBoth,
            type === "other" && classes.textContainerOther
          )}
        >
          <div className={classes.musumeId}>{idStr}</div>
          <div className={classes.musumeName}>{musume.name}</div>
        </div>
      </a>
    );
  }

  return (
    <div className={classes.container}>
      <img
        className={clsx(classes.musumeIcon, own && classes.musumeIconOwn)}
        src={"musume_images/" + idStr + ".png"}
        alt={musume.name}
        onClick={handleClick}
      />
      <a
        className={clsx(
          classes.textContainer,
          classes.textContainerWritable,
          own && classes.textContainerOwn,
          type === "melee" && classes.textContainerMelee,
          type === "ranged" && classes.textContainerRanged,
          type === "both" && classes.textContainerBoth,
          type === "other" && classes.textContainerOther
        )}
        href={"https://scre.swiki.jp/index.php?" + musume.name}
        target="_blank"
        rel="noreferrer"
      >
        <div className={classes.musumeId}>{idStr}</div>
        <div className={classes.musumeName}>{musume.name}</div>
      </a>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    width: "72px",
    borderStyle: "solid",
    borderColor: "#888888",
    borderWidth: "1px",
    borderRadius: "4px",
    margin: "3px",
    overflow: "hidden",
    textDecoration: "none",
    color: "#323232",
  },
  containerReadOnly: {
    transition: "box-shadow 0.2s",
    "&:hover": {
      boxShadow: "0px 0px 10px 2px rgba(136, 136, 136, 0.7)",
    },
    "&:hover $textContainer": {
      color: "black",
      textShadow: "0px 0px 1px rgba(50, 50, 50, 0.5)",
    },
  },
  musumeIcon: {
    width: "72px",
    height: "72px",
    cursor: "pointer",
    transition: "filter 0.2s",
    filter: "grayscale(75%) brightness(30%)",
    "&:hover": {
      filter: "grayscale(75%) brightness(40%)",
    },
  },
  musumeIconOwn: {
    filter: "brightness(90%)",
    "&:hover": {
      filter: "none",
    },
  },
  musumeIconReadOnly: {
    filter: "none",
    "&:hover": {
      filter: "none",
    },
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: "2px",
    filter: "grayscale(40%) brightness(70%)",
    transition: "text-shadow 0.2s, color 0.2s",
    textDecoration: "none",
    color: "#323232",
  },
  textContainerReadOnly: {
    filter: "none",
  },
  textContainerWritable: {
    "&:hover": {
      color: "black",
      textShadow: "0px 0px 1px rgba(50, 50, 50, 0.5)",
    },
  },
  textContainerOwn: {
    filter: "none",
  },
  textContainerMelee: {
    backgroundColor: "#f7c9d4",
  },
  textContainerRanged: {
    backgroundColor: "#cbeaf6",
  },
  textContainerBoth: {
    backgroundImage:
      "linear-gradient(to right, #f7c9d4, #f7c9d4, #cbeaf6, #cbeaf6)",
  },
  textContainerOther: {
    backgroundColor: "#f6f6ca",
  },
  musumeId: {
    textAlign: "center",
  },
  musumeName: {
    textAlign: "center",
  },
});
