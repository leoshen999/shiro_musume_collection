import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import GlobalContext from "../../GlobalContext";
import ShiroMusumeItem from "./ShiroMusumeItem";
import ShiroMusumeFilter from "./ShiroMusumeFilter";
import terrains from "../../resources/terrains.json";
import locations from "../../resources/locations.json";
import weapons from "../../resources/weapons.json";

export default function ShiroMusumeList() {
  const classes = useStyles();
  const context = useContext(GlobalContext);
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);
  const isMobileLayout = useMediaQuery("(max-width:768px)");

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

  function handleOpenDrawer(e) {
    setIsDrawerOpened(true);
  }

  function handleCloseDrawer(e) {
    setIsDrawerOpened(false);
  }

  const weaponIdToTypeMapping = {};
  weapons.forEach((wp) => {
    weaponIdToTypeMapping[wp.id] = wp.type;
  });

  return (
    <div className={classes.container}>
      {isMobileLayout && (
        <div
          className={clsx(classes.mask, isDrawerOpened && classes.maskShown)}
          onClick={handleCloseDrawer}
        ></div>
      )}
      <div
        className={clsx(
          classes.filtersContainer,
          isMobileLayout && isDrawerOpened && classes.filtersContainerOpened
        )}
      >
        <div className={classes.filtersScrollContainer}>
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
        {isMobileLayout && (
          <div
            className={classes.filterButtonContainer}
            onClick={isDrawerOpened ? handleCloseDrawer : handleOpenDrawer}
          >
            <svg
              viewBox="0 0 512 512"
              className={clsx(
                classes.filterIcon,
                isDrawerOpened && classes.filterIconOpened
              )}
            >
              <g>
                <polygon points="440.189,92.085 256.019,276.255 71.83,92.085 0,163.915 256.019,419.915 512,163.915"></polygon>
              </g>
            </svg>
            <div className={classes.filterButtonText}>絞込</div>
          </div>
        )}
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
    borderColor: "#888888",
    borderRightStyle: "solid",
    borderRightWidth: "1px",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    "@media (max-width: 768px)": {
      transition: "0.2s",
      position: "fixed",
      width: "100%",
      height: "auto",
      maxHeight: "75%",
      backgroundColor: "rgba(230, 230, 230, 0.8)",
      borderRightStyle: "none",
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      left: "0",
      top: "0",
      transform: "translateY(calc(25px - 100%))",
    },
  },
  filtersContainerOpened: {
    transform: "translateY(0)",
    backgroundColor: "#e6e6e6",
  },
  filtersScrollContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    paddingTop: "5px",
    paddingBottom: "5px",
    boxSizing: "border-box",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "@media (max-width: 768px)": {
      alignItems: "flex-start",
      padding: "5px",
      height: "auto",
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
  filterButtonContainer: {
    height: "25px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.2s",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  },
  filterIcon: {
    fill: "#888888",
    display: "block",
    minWidth: "25px",
    minHeight: "25px",
    width: "25px",
    height: "25px",
    marginRight: "10px",
  },
  filterIconOpened: {
    transform: "scaleY(-1)",
  },
  filterButtonText: {
    fontSize: "14px",
    lineHeight: "1",
  },
  itemsContainer: {
    minHeight: "0px",
    minWidth: "0px",
    height: "100%",
    flex: "1",
    overflowY: "auto",
    boxSizing: "border-box",
    padding: "3px",
    textAlign: "center",
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
    "@media (max-width: 768px)": {
      paddingTop: "25px",
    },
  },
  mask: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    transition: "opacity 0.2s",
    visibility: "hidden",
    opacity: "0",
  },
  maskShown: {
    visibility: "visible",
    opacity: "1",
  },
});
