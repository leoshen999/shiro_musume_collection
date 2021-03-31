/**
 * @format
 */

import { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import GlobalContext from "../../GlobalContext";

function paddingStr(num, size) {
  var s = "000000000" + num.toString();
  return s.substr(s.length - size);
}

export default function ShiroMusumeItem({ musume }) {
  const context = useContext(GlobalContext);
  const classes = useStyles();

  function handleClick() {
    context.onChangeOwn(
      musume.id,
      !context.owns.includes(musume.id)
    );
  }

  let type = "other";
  if (musume.weapon in context.weaponNameToTypeMapping)
    type = context.weaponNameToTypeMapping[musume.weapon];

  const idStr = paddingStr(musume.id, 4);

  const own = context.owns.includes(musume.id);

  return (
    <div
      className={clsx(classes.container, {
      })}
    >
      <img
        className={clsx(classes.musumeIcon, {
          [classes.musumeIconOwn]: own,
        })}
        src={"/musume_images/" + idStr + ".png"}
        alt={musume.name}
        onClick={handleClick}
      />
      <div
        className={clsx(classes.textContainer, {
          [classes.textContainerOwn]: own,
          [classes.textContainerMelee]: type === "melee",
          [classes.textContainerRanged]: type === "ranged",
          [classes.textContainerBoth]: type === "both",
          [classes.textContainerOther]: type === "other",
        })}
      >
        <div className={classes.musumeId}>{idStr}</div>
        <div className={classes.musumeName}>{musume.name}</div>
      </div>
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
    borderColor: "gray",
    borderWidth: "1px",
    borderRadius: "4px",
    margin: "5px",
    overflow: "hidden",
  },
  musumeIcon: {
    width: "72px",
    height: "72px",
    cursor: "pointer",
    filter: "grayscale(75%) brightness(30%)",
  },
  musumeIconOwn: {
    filter: "none",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    filter: "grayscale(40%) brightness(70%)",
  },
  textContainerOwn: {
    filter: "none",
  },
  textContainerMelee: {
    backgroundColor: "rgb(255, 180, 180)",
  },
  textContainerRanged: {
    backgroundColor: "rgb(160, 255, 255)",
  },
  textContainerBoth: {
    backgroundImage: "linear-gradient(to right, rgb(255, 180, 180), rgb(255, 180, 180), rgb(160, 255, 255), rgb(160, 255, 255))",
  },
  textContainerOther: {
    backgroundColor: "rgb(255, 255, 160)",
  },
  musumeId: {
    fontSize: "10px",
  },
  musumeName: {
    fontSize: "10px",
    textAlign: "center",
  },
});
