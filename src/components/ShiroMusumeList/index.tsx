import { Fragment, useContext, useState } from "react";
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
  const [sorter, setSorter] = useState<string>("id_asc");

  const rarities = [];
  for (var r = 1; r <= 7; r++) {
    rarities.push({
      id: r.toString(),
      name: "★ " + r.toString(),
      color: "#e0815e",
    });
  }

  const sorters = [
    [
      { id: "id_asc", name: "No.▲", color: "#274a78" },
      { id: "id_desc", name: "No.▼", color: "#274a78" },
    ],
    [
      { id: "terrain_asc", name: "属性▲", color: "#007b43" },
      { id: "terrain_desc", name: "属性▼", color: "#007b43" },
    ],
    [
      { id: "weapon_asc", name: "武器▲", color: "#eb6238" },
      { id: "weapon_desc", name: "武器▼", color: "#eb6238" },
    ],
    [
      { id: "rarity_asc", name: "★▲", color: "#e6b422" },
      { id: "rarity_desc", name: "★▼", color: "#e6b422" },
    ],
    [
      { id: "breast_asc", name: "胸▲", color: "#824880" },
      { id: "breast_desc", name: "胸▼", color: "#824880" },
    ],
    [
      { id: "age_asc", name: "年齢▲", color: "#2792c3" },
      { id: "age_desc", name: "年齢▼", color: "#2792c3" },
    ],
  ];

  function createFilterSelectionHandler(filter, setter) {
    return function (id) {
      const needsPush = !filter.includes(id);
      const newFilter = filter.filter((f) => f !== id);
      if (needsPush) newFilter.push(id);
      setter(newFilter);
    };
  }

  function handleSelectSorter(s) {
    if (s === "breast_asc") {
      alert("ちっぱい検索機能あるわけがないだろ！");
      return;
    } else if (s === "breast_desc") {
      alert("もしかして巨乳すき変態殿？");
      return;
    } else if (s === "age_asc") {
      alert("ロリコンか！おまわりさんこっちです");
      return;
    } else if (s === "age_desc") {
      alert("失礼な！女性の年齢は内緒だよ！");
      return;
    }
    setSorter(s);
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

  const weaponIdToIndex = {};
  weapons.forEach((wp, idx) => {
    weaponIdToIndex[wp.id] = idx;
  });
  const terrainIdToIndex = {};
  terrains.forEach((tr, idx) => {
    terrainIdToIndex[tr.id] = idx;
  });
  const idxMult = sorter.endsWith("_desc") ? -1 : 1;

  let getIdx: (any) => number = function () {
    return -1;
  };
  if (sorter.startsWith("rarity_")) {
    getIdx = function (m) {
      return m.rarity;
    };
  } else if (sorter.startsWith("weapon_")) {
    getIdx = function (m) {
      return weaponIdToIndex[m.weapon];
    };
  } else if (sorter.startsWith("terrain_")) {
    getIdx = function (m) {
      return m.terrains.length > 0
        ? terrainIdToIndex[m.terrains[0]]
        : 999999999;
    };
  } else if (sorter.startsWith("id_")) {
    getIdx = function (m) {
      return m.id;
    };
  }
  const compareFunc = function (m1, m2) {
    const i1 = getIdx(m1);
    const i2 = getIdx(m2);
    return i1 !== i2 ? idxMult * (i1 - i2) : m1.id - m2.id;
  };

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
            onSelect={createFilterSelectionHandler(
              terrainFilter,
              setTerrainFilter
            )}
          />
          <div className={classes.divider} />
          <ShiroMusumeFilter
            filters={weapons}
            selections={weaponFilter}
            imageUriBase="weapon_images"
            onSelect={createFilterSelectionHandler(
              weaponFilter,
              setWeaponFilter
            )}
          />
          <div className={classes.divider} />
          <ShiroMusumeFilter
            filters={rarities}
            selections={rarityFilter}
            onSelect={createFilterSelectionHandler(
              rarityFilter,
              setRarityFilter
            )}
          />
          <div className={classes.divider} />
          <ShiroMusumeFilter
            filters={locations}
            selections={locationFilter}
            onSelect={createFilterSelectionHandler(
              locationFilter,
              setLocationFilter
            )}
          />
          {isMobileLayout && (
            <>
              <div className={classes.divider} />
              <ShiroMusumeFilter
                filters={sorters.flat()}
                selections={[sorter]}
                onSelect={handleSelectSorter}
              />
            </>
          )}
        </div>
        {isMobileLayout && (
          <div
            className={classes.filterButtonContainer}
            onClick={isDrawerOpened ? handleCloseDrawer : handleOpenDrawer}
          >
            <div className={classes.filterButtonText}>絞込</div>
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
            <div className={classes.filterButtonText}>表示順</div>
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
          .sort(compareFunc)
          .map((musume) => (
            <ShiroMusumeItem
              key={musume.id}
              musume={musume}
              weaponIdToTypeMapping={weaponIdToTypeMapping}
            />
          ))}
      </div>
      {!isMobileLayout && (
        <div
          className={clsx(
            classes.filtersContainer,
            classes.filtersContainerOnRight
          )}
        >
          <div className={classes.filtersScrollContainer}>
            {sorters.map((st, key) => (
              <Fragment key={key}>
                {key !== 0 && <div className={classes.divider} />}
                <ShiroMusumeFilter
                  filters={st}
                  selections={[sorter]}
                  onSelect={handleSelectSorter}
                />
              </Fragment>
            ))}
          </div>
        </div>
      )}
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
  filtersContainerOnRight: {
    borderRightStyle: "none",
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
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
    marginLeft: "10px",
    marginRight: "10px",
  },
  filterIconOpened: {
    transform: "scaleY(-1)",
  },
  filterButtonText: {
    fontSize: "14px",
    lineHeight: "1",
    flex: 1,
    textAlign: "center",
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
