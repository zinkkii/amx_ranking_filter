"use client";

import {
  Typography,
  Box,
  Stack,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Switch,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import AMX10Chart from "./AMX10Chart";

export default function AMX10() {
  const router = useRouter();
  const [rounds, setRounds] = useState(0);
  const [logdata, setLogData] = useState([{}]);

  const searchRounds = (rounds) => {
    var arr = [];
    var rank = 0;
    axios
      .post("/api/amx10/round_search", { rounds: rounds })
      .then((res) => {
        //console.log(res.data);
        arr = [...res.data].sort(
          (a, b) =>
            a.Qpoints +
            a.H1points +
            a.H1fastest +
            a.H2points +
            a.H2fastest -
            (b.Qpoints + b.H1points + b.H1fastest + b.H2points + b.H2fastest)
        );
        arr.reverse();

        for (var i = 0; i < arr.length; i++) {
          if (i < arr.length - 1) {
            if (
              arr[i].Qpoints +
                arr[i].H1points +
                arr[i].H2points +
                arr[i].H1fastest +
                arr[i].H2fastest ===
              arr[i + 1].Qpoints +
                arr[i + 1].H1points +
                arr[i + 1].H2points +
                arr[i + 1].H1fastest +
                arr[i + 1].H2fastest
            ) {
              //console.log(i + "=i :똑가타여!!!!!!!! / rank : " + rank);
              arr[i].rank = rank + 1;
            } else {
              rank = rank + 1;
              arr[i].rank = rank;
              //console.log(i + "=i :안똑같아영 / rank : " + rank);
            }
          } else if (i === arr.length - 1) {
            //console.log("i: " + i + " / ggggg");
            if (
              arr[i].Qpoints +
                arr[i].H1points +
                arr[i].H2points +
                arr[i].H1fastest +
                arr[i].H2fastest <
              arr[i - 1].Qpoints +
                arr[i - 1].H1points +
                arr[i - 1].H2points +
                arr[i - 1].H1fastest +
                arr[i - 1].H2fastest
            ) {
              arr[i].rank = rank + 1;
            } else if (
              arr[i].Qpoints +
                arr[i].H1points +
                arr[i].H2points +
                arr[i].H1fastest +
                arr[i].H2fastest ===
              arr[i - 1].Qpoints +
                arr[i - 1].H1points +
                arr[i - 1].H2points +
                arr[i - 1].H1fastest +
                arr[i - 1].H2fastest
            ) {
              arr[i].rank = rank + 1;
            } else {
              arr[i].rank = rank + 1;
            }

            //console.log("i : " + i + " rank : " + rank);
          }
        }
        //console.log(arr);
        setLogData(arr);
      })
      .catch((err) => console.log(err));
  };
  const [open, setOpen] = useState(false);
  const [datetime, setDatetime] = useState("");
  const [car, setCar] = useState("");
  const [track, setTrack] = useState("");
  const [showChart, setShowChart] = useState(true);

  const clickOpen = () => {
    setOpen(true);
  };
  const clickClose = () => {
    setOpen(false);
  };
  const exportData = (datetime, car, track, rounds) => {
    console.log(datetime);
    console.log(car);
    console.log(track);
    if (datetime === "" || car === "" || track === "") {
      alert("빈칸확인!");
      return;
    }
    axios
      .post("/api/leaderboard/chart10insert", { datetime, car, track, rounds })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    //setShowChart(true);
    clickClose();
  };

  return (
    <>
      <Box
        gap={1}
        display="grid"
        sx={{ mb: 3 }}
        gridTemplateColumns={{
          xs: "repeat(3, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(3, 1fr)",
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: 2,
            cursor: "pointer",
          }}
        >
          <Button
            sx={{ width: "100%", height: "75px" }}
            variant="outlined"
            onClick={() => {
              router.push("/manage/amx10/q");
            }}
          >
            Q update
          </Button>
        </Stack>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: 2,
            cursor: "pointer",
          }}
        >
          <Button
            sx={{ width: "100%", height: "75px" }}
            variant="outlined"
            onClick={() => {
              router.push("/manage/amx10/h1");
            }}
          >
            H1 update
          </Button>
        </Stack>

        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: 2,
            cursor: "pointer",
          }}
        >
          <Button
            sx={{ width: "100%", height: "75px" }}
            variant="outlined"
            onClick={() => {
              router.push("/manage/amx10/h2");
            }}
          >
            H2 update
          </Button>
        </Stack>
      </Box>
      <Typography>AMX10 Round Search</Typography>
      <Stack
        sx={{ display: "flex", justifyContent: "space-between", width: "15%" }}
      >
        <Input
          type="number"
          onChange={(e) => setRounds(e.target.value)}
        ></Input>
        <LoadingButton
          onClick={() => searchRounds(rounds)}
          sx={{ border: "1px solid", marginTop: 2, marginBottom: 2 }}
        >
          SEARCH
        </LoadingButton>
      </Stack>
      {rounds > 0 && logdata.length > 1 ? (
        <>
          {/* <Typography variant="h5" sx={{ margin: 2 }}>
            AMX10_Round {rounds} Result{" "}
          </Typography> */}
          <Paper sx={{ overflow: "hidden" }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      Num
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      driverName
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      Q-result
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      Q-points
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      Q-elo
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      H1-result
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      H1-points
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      H1-fastest
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      H1-elo
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      H2-result
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      H2-points
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      H2-fastest
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      H2-elo
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      Total Points
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logdata.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.driverName}</TableCell>
                      <TableCell>{row.Qresult}</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>
                        $ {row.Qpoints}
                      </TableCell>
                      <TableCell>{row.Qelo}</TableCell>
                      <TableCell>{row.H1result}</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>
                        $ {row.H1points}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>
                        {row.H1fastest != 0 ? <>$ {row.H1fastest}</> : null}
                      </TableCell>
                      <TableCell>{row.H1elo}</TableCell>
                      <TableCell>{row.H2result}</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>
                        $ {row.H2points}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>
                        {row.H2fastest != 0 ? <>$ {row.H2fastest}</> : null}
                      </TableCell>
                      <TableCell>{row.H2elo}</TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>
                        ${" "}
                        {row.Qpoints +
                          row.H1points +
                          row.H2points +
                          row.H1fastest +
                          row.H2fastest}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* <Button
            sx={{ marginTop: 5, marginBottom: 2 }}
            variant="outlined"
            onClick={clickOpen}
          >
            Input Chart Data
          </Button> */}
          <Dialog open={open} onClose={clickClose}>
            <DialogTitle>AMX10 {rounds} Round *Required*</DialogTitle>
            <DialogContent>
              <DialogContentText>해당하는 정보를 입력하세요.</DialogContentText>
              <TextField
                margin="dense"
                id="datetime"
                label="DateTime(ex. 2024.01.01 12:20 AM GMT )"
                type="text"
                fullWidth
                variant="standard"
                required
                onChange={(e) => setDatetime(e.target.value)}
              />
              <TextField
                margin="dense"
                id="car"
                label="Car or CarClass"
                type="text"
                fullWidth
                variant="standard"
                required
                onChange={(e) => setCar(e.target.value)}
              />
              <TextField
                margin="dense"
                id="track"
                label="Track Name"
                type="text"
                fullWidth
                variant="standard"
                required
                onChange={(e) => setTrack(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button color="error" onClick={clickClose}>
                Cancel
              </Button>
              <Button onClick={() => exportData(datetime, car, track, rounds)}>
                Export
              </Button>
            </DialogActions>
          </Dialog>

          <AMX10Chart rounds={rounds} logdata={logdata} />
        </>
      ) : (
        <Typography variant="h5">-No Data-</Typography>
      )}
    </>
  );
}
