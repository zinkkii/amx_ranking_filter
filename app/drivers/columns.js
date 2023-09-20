import moment from "moment";

const columns = [
  { id: "player", label: "Name", minWidth: 100 },
  { id: "racing", label: "Racing", minWidth: 100 },
  {
    id: "finishedraces",
    label: "Finished Races",
    minWidth: 100,
    align: "left",
  },
  {
    id: "wins",
    label: "Wins",
    minWidth: 100,
    align: "left",
  },
  {
    id: "poles",
    label: "Polse",
    minWidth: 100,
    align: "left",
  },
  { id: "game", label: "Game", minWidth: 150, align: "left" },
  { id: "tier", label: "Tier", minWidth: 100, align: "left" },
  { id: "region", label: "Region", minWidth: 100, align: "left" },
  {
    id: "period",
    label: "Date",
    minWidth: 100,
    align: "left",
    format: (value) => {
      moment(value, "YYYY-MM-DD");
    },
  },
];

export default columns;
