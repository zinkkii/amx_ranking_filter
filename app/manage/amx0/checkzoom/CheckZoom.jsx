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
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import csvStore from "@/app/store/amx10/csvStore";

export default function CheckZoom() {
  const { topCarInfo, topTrackInfo, topDateInfo, settingInfo } = csvStore();
  const router = useRouter();
  const [roundsList, setRoundsList] = useState([{}]);
  const [rounds, setRounds] = useState(0);
  const [qResult, setQResult] = useState([{}]);
  const [amx0, setAmx0] = useState("");
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
      zoomCheck: 0,
    },
  ]);
  var tier = "AMXZero";

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
    setRounds(rounds);
    console.log(rounds);
    axios
      .post("/api/result/result_select_searchRounds", { rounds, tier })
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].category === "Q") {
            q.push(res.data[i]);
          }
        }
        setQResult(q.sort((a, b) => a.finPos - b.finPos));
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
        console.log(res.data);
        setChartResult(res.data);
      })
      .catch((err) => console.log(err));
  };

  // zoomCheck
  const [isAllChecked, setAllChecked] = useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(chartResult.length).fill(false)
  );

  // zoomCam On users multi Check
  const handleAllCheck = (chartResult) => {
    setAllChecked((prev) => !prev);
    let array = new Array(chartResult.length).fill(!isAllChecked);
    setCheckedState(array);
    const arr = [];
    for (var i = 0; i < chartResult.length; i++) {
      arr.push(chartResult[i].custID);
    }
  };
  const handleMonoCheck = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const checkedLength = updatedCheckedState.reduce((sum, currentState) => {
      if (currentState === true) {
        return sum + 1;
      }
      return sum;
    }, 0);
    setAllChecked(checkedLength === updatedCheckedState.length);
  };

  const zoomCheckSave = (chartResult) => {
    console.log("AAAA~~~~~");
    console.log(chartResult);
    const zoom = document.getElementsByName("zoom");
    var zoomArr = [];
    for (var i = 0; i < chartResult.length; i++) {
      if (zoom[i].checked == true) {
        zoomArr.push(chartResult[i].custID);
      }
    }
    console.log("ARRRRR");
    console.log(zoomArr);

    axios
      .post("/api/result/result_update_zoom", {
        chartResult,
        zoomArr,
        rounds,
        tier,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data == "SUCCESS") {
          alert("zoom 보너스 업데이트 OK");
          router.push("/manage");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <b>AMX Zero - Zoom Check</b>
        <LoadingButton
          color="primary"
          size="large"
          type="submit"
          sx={{ border: "1px solid" }}
          onClick={() => router.push("/manage")}
        >
          DashBoard
        </LoadingButton>
      </Typography>

      <Stack spacing={3} direction="row" sx={{ marginTop: 3 }}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">AMX Zero Rounds</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Race"
            value={amx0}
            onChange={(e) => {
              setAmx0(e.target.value);
            }}
          >
            {roundsList.length > 0 ? (
              roundsList.map((row, index) => (
                <MenuItem
                  key={index}
                  value={row.rounds}
                  onClick={() => {
                    searchRounds(row.rounds);
                    setCheckedState(new Array(chartResult.length).fill(false));
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
      <Box gap={1} sx={{ mb: 3, mt: 3 }}>
        <TableContainer>
          <Paper sx={{ overflow: "hidden" }}>
            <Table sx={{ minWidth: 300 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "900" }}>Pos</TableCell>
                  <TableCell sx={{ fontWeight: "900" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "900" }}>points</TableCell>
                  <TableCell sx={{ fontWeight: "900" }}>
                    Pole Position
                  </TableCell>
                  <TableCell sx={{ fontWeight: "900" }}>Heat Wins</TableCell>
                  <TableCell sx={{ fontWeight: "900" }}>Fastest Laps</TableCell>
                  <TableCell
                    padding="checkbox"
                    sx={{ fontFamily: "Kanit", fontWeight: "900" }}
                  >
                    zoom
                    <input
                      type="checkbox"
                      checked={isAllChecked}
                      onChange={() => handleAllCheck(chartResult)}
                    ></input>
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
                    <TableCell>{row.Q1 == 0 ? null : <>{row.Q1}</>}</TableCell>
                    <TableCell>
                      {row.H1 + row.H2 == 0 ? null : <>{row.H1 + row.H2}</>}
                    </TableCell>
                    <TableCell>
                      {row.H1fastest + row.H2fastest == 0 ? null : (
                        <>{row.H1fastest + row.H2fastest}</>
                      )}
                    </TableCell>
                    <TableCell padding="checkbox">
                      <input
                        type="checkbox"
                        name="zoom"
                        value={row.custID}
                        checked={checkedState[index]}
                        onChange={() => {
                          handleMonoCheck(index);
                          console.log(row.custID);
                        }}
                      ></input>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </TableContainer>

        <Button
          style={{ marginTop: 10 }}
          onClick={() => zoomCheckSave(chartResult)}
          variant="outlined"
        >
          SAVE
        </Button>
      </Box>
    </>
  );
}
