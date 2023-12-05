"use client";
import {
  Stack,
  Button,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import csvStore from "@/app/store/amx10/csvStore";
import axios from "axios";

export default function TopResultSearch() {
  const { topCarInfo, topTrackInfo, topDateInfo, settingInfo } = csvStore();
  const [amx10, setAmx10] = useState("");
  const [amx0, setAmx0] = useState("");
  const [rounds, setRounds] = useState(0);
  const [open, setOpen] = useState(false);
  const [roundList, setRoundList] = useState([{}]);
  const [qResult, setQResult] = useState([{}]);
  const [h1Result, setH1Result] = useState([{}]);
  const [h2Result, setH2Result] = useState([{}]);
  const [chartResult, setChartResult] = useState([
    {
      H1: 0,
      H1fastest: 0,
      H2: 0,
      H2fastest: 0,
      Q1: 0,
      custID: 0,
      driverName: "",
      fastestPoint: 0,
      rankingPoints: 0,
      rounds: 0,
      topCarInfo: "",
      topDateInfo: "",
      topTrackInfo: "",
    },
  ]);
  var tier = "AMX10";

  const selectAmx10 = (e) => {
    setAmx10(e.target.value);
  };
  const selectAmx0 = (e) => {
    setAmx0(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .post("/api/result/result_select_roundsList", { tier })
      .then((res) => {
        console.log(res.data);
        setRoundList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const modalData = (rounds) => {
    var q = [];
    var h1 = [];
    var h2 = [];
    setRounds(rounds);
    axios
      .post("/api/result/result_select_searchRounds", { rounds, tier })
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].category === "Q") {
            q.push(res.data[i]);
          } else if (res.data[i].category === "H1") {
            h1.push(res.data[i]);
          } else if (res.data[i].category === "H2") {
            h2.push(res.data[i]);
          }
        }
        setQResult(q.sort((a, b) => a.finPos - b.finPos));
        setH1Result(h1.sort((a, b) => a.finPos - b.finPos));
        setH2Result(h2.sort((a, b) => a.finPos - b.finPos));
        selectChart(
          q.sort((a, b) => a.finPos - b.finPos),
          rounds
        );
      })
      .catch((err) => console.log(err));
  };

  const selectChart = (dataResult, rounds) => {
    axios
      .post("/api/result/result_select_chart", { dataResult, rounds, tier })
      .then((res) => {
        res.data.sort(
          (a, b) =>
            b.fastestPoint +
            b.rankingPoints -
            (a.fastestPoint + a.rankingPoints)
        );
        settingInfo(res.data[0]);
        setChartResult(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(qResult);
  }, [qResult]);

  return (
    <>
      <Box
        component="form"
        sx={{ width: "100%", mb: 2 }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={1} direction="row">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">AMX 10</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Countries"
              value={amx10}
              onChange={(e) => {
                console.log(e.target.value);
                setAmx10(e.target.value);
              }}
            >
              {roundList.length > 0 ? (
                roundList.map((row, index) => (
                  <MenuItem
                    key={index}
                    value={row.rounds}
                    onClick={() => {
                      modalData(row.rounds);
                      setOpen(true);
                    }}
                  >
                    Race {row.rounds}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>null</MenuItem>
              )}
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          AMX10 Result - Race {amx10}
        </DialogTitle>
        <DialogContent>
          <Paper sx={{ overflow: "hidden" }}>
            <Typography sx={{ margin: 1, fontWeight: "900" }}>
              AMX10_Race {rounds} - {topDateInfo}
              <br />
              {topCarInfo}
              <br />
              {topTrackInfo}
            </Typography>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "900" }}>Pos</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>DriverName</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Points</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>
                      Pole Position
                    </TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Heat Wins</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>
                      Fastest Laps
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chartResult.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.driverName}</TableCell>
                      <TableCell>
                        {row.rankingPoints + row.fastestPoint}
                      </TableCell>
                      <TableCell>
                        {row.Q1 == 0 ? null : <>{row.Q1}</>}
                      </TableCell>
                      <TableCell>
                        {row.H1 + row.H2 == 0 ? null : <>{row.H1 + row.H2}</>}
                      </TableCell>
                      <TableCell>
                        {row.H1fastest + row.H2fastest == 0 ? null : (
                          <>{row.H1fastest + row.H2fastest}</>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <DialogTitle>Qualifying</DialogTitle>

          <Paper sx={{ overflow: "hidden" }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "900" }}>Pos</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Car</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>CarClass</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Car #</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Driver</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Out</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Interval</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>
                      Average Lap Time
                    </TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>
                      Fastest Lap Time
                    </TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Fast Lap#</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Lap Comp</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Inc</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Club</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {qResult.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell>{row.finPos}</TableCell>
                      <TableCell>{row.car}</TableCell>
                      <TableCell>{row.carClass}</TableCell>
                      <TableCell>{row.carSharp}</TableCell>
                      <TableCell>{row.driverName}</TableCell>
                      <TableCell>{row.outCheck}</TableCell>
                      <TableCell>{row.intervalvalue}</TableCell>
                      <TableCell>{row.averageLapTime}</TableCell>
                      <TableCell>{row.fastestLapTime}</TableCell>
                      <TableCell>{row.fastLap}</TableCell>
                      <TableCell>{row.lapsComp}</TableCell>
                      <TableCell>{row.inc}</TableCell>
                      <TableCell>{row.club}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <DialogTitle>Heat1</DialogTitle>

          <Paper sx={{ overflow: "hidden" }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "900" }}>Pos</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Car</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>CarClass</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Car #</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Driver</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Out</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Interval</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>
                      Average Lap Time
                    </TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>
                      Fastest Lap Time
                    </TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Fast Lap#</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Lap Comp</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Inc</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Club</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {h1Result.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell>{row.finPos}</TableCell>
                      <TableCell>{row.car}</TableCell>
                      <TableCell>{row.carClass}</TableCell>
                      <TableCell>{row.carSharp}</TableCell>
                      <TableCell>{row.driverName}</TableCell>
                      <TableCell>{row.outCheck}</TableCell>
                      <TableCell>{row.intervalvalue}</TableCell>
                      <TableCell>{row.averageLapTime}</TableCell>
                      <TableCell>{row.fastestLapTime}</TableCell>
                      <TableCell>{row.fastLap}</TableCell>
                      <TableCell>{row.lapsComp}</TableCell>
                      <TableCell>{row.inc}</TableCell>
                      <TableCell>{row.club}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <DialogTitle>Heat2</DialogTitle>

          <Paper sx={{ overflow: "hidden" }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "900" }}>Pos</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Car</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>CarClass</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Car #</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Driver</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Out</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Interval</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>
                      Average Lap Time
                    </TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>
                      Fastest Lap Time
                    </TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Fast Lap#</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Lap Comp</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Inc</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Club</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {h2Result.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell>{row.finPos}</TableCell>
                      <TableCell>{row.car}</TableCell>
                      <TableCell>{row.carClass}</TableCell>
                      <TableCell>{row.carSharp}</TableCell>
                      <TableCell>{row.driverName}</TableCell>
                      <TableCell>{row.outCheck}</TableCell>
                      <TableCell>{row.intervalvalue}</TableCell>
                      <TableCell>{row.averageLapTime}</TableCell>
                      <TableCell>{row.fastestLapTime}</TableCell>
                      <TableCell>{row.fastLap}</TableCell>
                      <TableCell>{row.lapsComp}</TableCell>
                      <TableCell>{row.inc}</TableCell>
                      <TableCell>{row.club}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
