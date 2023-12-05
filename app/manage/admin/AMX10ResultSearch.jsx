"use client";
import {
  Typography,
  Stack,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useState, useEffect } from "react";
import csvStore from "@/app/store/amx10/csvStore";

export default function AMX10ResultSearch() {
  const { topCarInfo, topTrackInfo, topDateInfo, settingInfo } = csvStore();
  const [rounds, setRounds] = useState(0);
  const [result, setResult] = useState([{}]);
  const [qResult, setQResult] = useState([{}]);
  const [h1Result, setH1Result] = useState([{}]);
  const [h2Result, setH2Result] = useState([{}]);
  const [amx10, setAmx10] = useState("");
  const [roundsList, setRoundsList] = useState([{}]);
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

  useEffect(() => {
    axios
      .post("/api/result/result_select_roundsList", { tier })
      .then((res) => {
        console.log(res.data);
        setRoundsList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const searchRounds = (rounds) => {
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
        setResult(res.data);
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
    console.log("AAA!");
    console.log(topCarInfo);
    console.log(topTrackInfo);
    console.log(topDateInfo);
  }, [chartResult]);

  return (
    <>
      <Stack spacing={3} direction="row" sx={{ marginTop: 3 }}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">AMX 10</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Race"
            value={amx10}
            onChange={(e) => {
              setAmx10(e.target.value);
            }}
          >
            {roundsList.length > 0 ? (
              roundsList.map((row, index) => (
                <MenuItem
                  key={index}
                  value={row.rounds}
                  onClick={() => searchRounds(row.rounds)}
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

      {result.length > 1 ? (
        <>
          <Box
            gap={1}
            display="grid"
            sx={{ mt: 3 }}
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
          >
            <TableContainer>
              <Typography variant="h5">Q</Typography>
              <Paper sx={{ overflow: "hidden" }}>
                <Table sx={{ minWidth: 300 }} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "900" }}>Pos</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {qResult.map((row, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{row.finPos}</TableCell>
                        <TableCell>{row.driverName}</TableCell>
                        <TableCell>{row.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </TableContainer>

            <TableContainer>
              <Typography variant="h5">H1</Typography>
              <Paper sx={{ overflow: "hidden" }}>
                <Table sx={{ minWidth: 300 }} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "900" }}>Pos</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>points</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>fastest</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {h1Result.map((row, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{row.finPos}</TableCell>
                        <TableCell>{row.driverName}</TableCell>
                        <TableCell>{row.points}</TableCell>
                        <TableCell>{row.fastestPoints}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </TableContainer>

            <TableContainer>
              <Typography variant="h5">H2</Typography>
              <Paper sx={{ overflow: "hidden" }}>
                <Table sx={{ minWidth: 300 }} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "900" }}>Pos</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>point</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>fastest</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {h2Result.map((row, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{row.finPos}</TableCell>
                        <TableCell>{row.driverName}</TableCell>
                        <TableCell>{row.points}</TableCell>
                        <TableCell>{row.fastestPoints}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </TableContainer>
          </Box>

          <Box gap={1} sx={{ mb: 3, mt: 3 }}>
            <TableContainer>
              <Paper sx={{ overflow: "hidden" }}>
                <Typography sx={{ margin: 1, fontWeight: "900" }}>
                  AMX10_Race {rounds} - {topDateInfo}
                  <br />
                  {topCarInfo}
                  <br />
                  {topTrackInfo}
                </Typography>
                <Table sx={{ minWidth: 300 }} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "900" }}>Pos</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>points</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>
                        Pole Position
                      </TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>
                        Heat Wins
                      </TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>
                        Fastest Laps
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {chartResult.map((row, index) => (
                      <TableRow key={index} hover>
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
              </Paper>
            </TableContainer>
          </Box>
        </>
      ) : (
        <>-no data</>
      )}
    </>
  );
}
