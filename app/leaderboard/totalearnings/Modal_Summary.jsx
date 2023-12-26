import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { createTheme } from "@mui/material";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<> {`>`} </>} {...props} />
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

export default function ModalSummary(props) {
  const [expanded, setExpanded] = useState("");
  const { driverID, driverName } = props;
  const [tier, setTier] = useState([{}]);
  const [roundsTen, setRoundsTen] = useState([{ rounds: 0 }]);
  const [roundsZero, setRoundsZero] = useState([{ rounds: 0 }]);
  const [chartData, setChartData] = useState([
    {
      finPos: 0,
    },
  ]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    axios
      .post("/api/result/result_select_tier", { driverID })
      .then((res) => {
        console.log(res.data);
        setTier(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const selectTotalList = (tier, driverID) => {
    console.log(tier);
    axios
      .post("/api/result/result_select_totalRoundsList", { tier, driverID })
      .then((res) => {
        if (tier === "AMX10") {
          console.log(res.data);
          setRoundsTen(res.data);
        }
        if (tier === "AMXZero") {
          console.log(res.data);
          setRoundsZero(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const selectDriverChart = (tier, rounds, driverID) => {
    axios
      .post("/api/result/result_select_totalEarningsList", {
        tier: tier,
        custID: driverID,
        rounds: rounds,
      })
      .then((res) => {
        setChartData(
          res.data.sort((a, b) => new Date(a.inputTime) - new Date(b.inputTime))
        );
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "900" }}>
        {driverName}
      </DialogTitle>
      <DialogContent>
        <TreeView
          sx={{
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          {tier.map((row, i) => (
            <TreeItem
              key={i}
              nodeId={i + 1}
              label={row.tier}
              onClick={() => {
                selectTotalList(row.tier, driverID);
              }}
            >
              {row.tier == "AMX10" ? (
                <>
                  {roundsTen.map((data, index) => (
                    <Accordion
                      key={index}
                      expanded={
                        expanded === `${row.tier}+${roundsTen.rounds}+${index}`
                      }
                      onChange={handleChange(
                        `${row.tier}+${roundsTen.rounds}+${index}`
                      )}
                    >
                      <AccordionSummary
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                        onClick={() =>
                          selectDriverChart(row.tier, data.rounds, driverID)
                        }
                      >
                        <Typography>Race #{data.rounds}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: "900" }}>
                                  _
                                </TableCell>
                                <TableCell sx={{ fontWeight: "900" }}>
                                  Result
                                </TableCell>
                                <TableCell sx={{ fontWeight: "900" }}>
                                  Fastest Points
                                </TableCell>
                                <TableCell sx={{ fontWeight: "900" }}>
                                  Points
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {chartData.map((chart, chartI) => (
                                <TableRow key={chartI}>
                                  <TableCell sx={{ fontWeight: "900" }}>
                                    {chart.category}
                                  </TableCell>
                                  <TableCell>
                                    {chart.finPos}/{chart.participated}
                                  </TableCell>
                                  <TableCell>${chart.fastestPoints}</TableCell>
                                  <TableCell>${chart.points}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </>
              ) : (
                <>
                  {roundsZero.map((data, index) => (
                    <Accordion
                      key={index}
                      expanded={
                        expanded === `${row.tier}+${roundsZero.rounds}+${index}`
                      }
                      onChange={handleChange(
                        `${row.tier}+${roundsZero.rounds}+${index}`
                      )}
                    >
                      <AccordionSummary
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                        onClick={() =>
                          selectDriverChart(row.tier, data.rounds, driverID)
                        }
                      >
                        <Typography>Race #{data.rounds}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: "900" }}>
                                  _
                                </TableCell>
                                <TableCell sx={{ fontWeight: "900" }}>
                                  Result
                                </TableCell>
                                <TableCell sx={{ fontWeight: "900" }}>
                                  Fastest Points
                                </TableCell>
                                <TableCell sx={{ fontWeight: "900" }}>
                                  Points
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {chartData.map((chart, chartI) => (
                                <TableRow key={chartI}>
                                  <TableCell sx={{ fontWeight: "900" }}>
                                    {chart.category}
                                  </TableCell>
                                  <TableCell>
                                    {chart.finPos}/{chart.participated}
                                  </TableCell>
                                  <TableCell>${chart.fastestPoints}</TableCell>
                                  <TableCell>${chart.points}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </>
              )}
            </TreeItem>
          ))}
        </TreeView>
      </DialogContent>
    </>
  );
}
