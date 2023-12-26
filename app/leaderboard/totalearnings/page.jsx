"use client";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LeaderBoardTopCategory from "../TopCategory";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import axios from "axios";
import { useState, useEffect } from "react";
import ModalSummary from "./Modal_Summary";
import { TreeView, TreeItem } from "@mui/x-tree-view";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<> - </>} {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function TotalEarnings() {
  const [expanded, setExpanded] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [board, setBoard] = useState([
    {
      driverName: "",
      custID: 0,
      sumPoints: 0,
      participated: 0,
      sumFastestLaps: 0,
      sumPolePosition: 0,
      sumH1heat: 0,
      sumH2heat: 0,
      zoom: 0,
    },
  ]);

  useEffect(() => {
    axios
      .post("/api/result/result_select_leaderboard")
      .then((res) => {
        if (res.data.length > 1) {
          setBoard(res.data.sort((a, b) => b.sumPoints - a.sumPoints));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [roundsTen, setRoundsTen] = useState([{ rounds: 0 }]);
  const [roundsZero, setRoundsZero] = useState([{ rounds: 0 }]);
  const [chartData, setChartData] = useState([{}]);
  const [driverID, setDriverID] = useState(0);
  const [driverName, setDriverName] = useState("");

  const amxTier = (custID) => {
    var amx10 = "AMX10";
    var amxZero = "AMXZero";
    axios
      .post("/api/result/result_select_totalRoundsList", { amx10, custID })
      .then((res) => {
        if (tier === "AMX10") {
          setRoundsTen(res.data);
        }
        if (tier === "AMXZero") {
          setRoundsZero(res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  const chartResult = (tier, custID, rounds) => {
    console.log(tier);
    console.log(custID);
    console.log(rounds);
    axios
      .post("/api/result/result_select_totalEarningsList", {
        tier,
        custID,
        rounds,
      })
      .then((res) => {
        setChartData(
          res.data.sort((a, b) => new Date(b.inputTime) - new Date(a.inputTime))
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <LeaderBoardTopCategory />
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "900" }}>Pos.</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Driver Name</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>
                  Races Participated
                </TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {board.length > 1 ? (
                <>
                  {board.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setDriverID(row.custID);
                          setDriverName(row.driverName);
                          setOpen(true);
                        }}
                      >
                        {row.driverName}
                      </TableCell>
                      <TableCell>{row.participated}</TableCell>
                      <TableCell>{row.sumPoints + row.zoom}</TableCell>
                    </TableRow>
                  ))}
                </>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "1200px", // Set your width here
            },
          },
        }}
      >
        <ModalSummary driverID={driverID} driverName={driverName} />
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
