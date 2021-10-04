import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GlobalContext from "../../GlobalContext";
import ShiroMusumeItem from "./ShiroMusumeItem";
import ShiroMusumeFilter from "./ShiroMusumeFilter";
import terrains from "../../resources/terrains.json";
import locations from "../../resources/locations.json";
import weapons from "../../resources/weapons.json";

export default function ShiroMusumeList() {
  const classes = useStyles();
  const context = useContext(GlobalContext);

  const [rarityFilter, setRarityFilter] = useState([]);
  const [terrainFilter, setTerrainFilter] = useState([]);
  const [weaponFilter, setWeaponFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);

  const rarities = [];
  for (var r = 1; r <= 7; r++) {
    rarities.push({
      id: r.toString(),
      name: "★ " + r.toString(),
      color: "#e0815e",
    });
  }

  function createSelectionHandler(filter, setter) {
    return function (id) {
      const needsPush = !filter.includes(id);
      const newFilter = filter.filter((f) => f !== id);
      if (needsPush) newFilter.push(id);
      setter(newFilter);
    };
  }

  const weaponIdToTypeMapping = {};
  weapons.forEach((wp) => {
    weaponIdToTypeMapping[wp.id] = wp.type;
  });

  return (
    <div className={classes.container}>
      <div className={classes.filtersContainer}>
        <ShiroMusumeFilter
          filters={terrains}
          selections={terrainFilter}
          onSelect={createSelectionHandler(terrainFilter, setTerrainFilter)}
        />
        <div className={classes.divider} />
        <ShiroMusumeFilter
          filters={weapons}
          selections={weaponFilter}
          imageUriBase="weapon_images"
          onSelect={createSelectionHandler(weaponFilter, setWeaponFilter)}
        />
        <div className={classes.divider} />
        <ShiroMusumeFilter
          filters={rarities}
          selections={rarityFilter}
          onSelect={createSelectionHandler(rarityFilter, setRarityFilter)}
        />
        <div className={classes.divider} />
        <ShiroMusumeFilter
          filters={locations}
          selections={locationFilter}
          onSelect={createSelectionHandler(locationFilter, setLocationFilter)}
        />
      </div>
      <div className={classes.itemsContainer}>
        {context.musumes
          .filter((musume) => {
            if (terrainFilter.length === 0) return true;
            return (
              musume.terrains.filter((t) => terrainFilter.includes(t))
                .length !== 0
            );
          })
          .filter(
            (musume) =>
              weaponFilter.length === 0 || weaponFilter.includes(musume.weapon)
          )
          .filter(
            (musume) =>
              rarityFilter.length === 0 ||
              rarityFilter.includes(musume.rarity.toString())
          )
          .filter(
            (musume) =>
              locationFilter.length === 0 ||
              locationFilter.includes(musume.location)
          )
          .map((musume) => (
            <ShiroMusumeItem
              key={musume.id}
              musume={musume}
              weaponIdToTypeMapping={weaponIdToTypeMapping}
            />
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
    minWidth: "40px",
    height: "100%",
    width: "40px",
    borderRightStyle: "solid",
    borderRightColor: "gray",
    borderRightWidth: "1px",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  divider: {
    marginTop: "3px",
    marginBottom: "3px",
    minHeight: "1px",
    height: "1px",
    backgroundColor: "transparent",
    width: "100%",
  },
  itemsContainer: {
    minHeight: "0px",
    minWidth: "0px",
    height: "100%",
    flex: "1",
    overflowY: "auto",
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888888",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#707070",
    },
    "&::-webkit-scrollbar": {
      width: "8px",
      backgroundColor: "#cdcdcd",
    },
  },
});
