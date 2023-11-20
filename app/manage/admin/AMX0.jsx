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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AMX0() {
  const router = useRouter();
  const [rounds, setRounds] = useState(0);
  const [logdata, setLogData] = useState([{}]);

  const searchRounds = (rounds) => {
    var arr = [];
    var rank = 0;
    axios
      .post("/api/amx0/round_search", { rounds: rounds })
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
              router.push("/manage/amx0/q");
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
              router.push("/manage/amx0/h1");
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
              router.push("/manage/amx0/h2");
            }}
          >
            H2 + Zoom Update
          </Button>
        </Stack>
      </Box>
      <Typography>AMXZero Round Search</Typography>
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
          <Typography variant="h5" sx={{ margin: 2 }}>
            AMXZero_Round {rounds} Result{" "}
          </Typography>
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
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      camBonus
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      TotalPoints + CamBonus
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
                        {(
                          row.Qpoints +
                          row.H1points +
                          row.H2points +
                          row.H1fastest +
                          row.H2fastest
                        ).toFixed(1)}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>
                        {row.zoomBonus != 0 ? <>$ {row.zoomBonus}</> : null}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "900" }}>
                        ${" "}
                        {(
                          row.Qpoints +
                          row.H1points +
                          row.H2points +
                          row.H1fastest +
                          row.H2fastest +
                          row.zoomBonus
                        ).toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Typography variant="h5" sx={{ margin: 2 }}>
            AMXZero_Round {rounds} Chart{" "}
          </Typography>
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
                    <TableCell sx={{ fontWeight: "900" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "900" }}>Points</TableCell>
                    <TableCell sx={{ fontWeight: "900" }} align="center">
                      Pole Position
                    </TableCell>
                    <TableCell sx={{ fontWeight: "900" }} align="center">
                      Heat Wins
                    </TableCell>
                    <TableCell sx={{ fontWeight: "900" }} align="center">
                      Fastest Laps
                    </TableCell>
                    <TableCell sx={{ fontWeight: "900" }} align="center">
                      Driver Cam Bonus
                    </TableCell>
                    <TableCell sx={{ fontWeight: "900" }} align="center">
                      Total Earnings from Race
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logdata.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{row.rank}</TableCell>
                      <TableCell>{row.driverName}</TableCell>
                      <TableCell>
                        {(
                          row.Qpoints +
                          row.H1points +
                          row.H2points +
                          row.H1fastest +
                          row.H2fastest
                        ).toFixed(1)}
                      </TableCell>
                      <TableCell align="center">
                        {row.Qresult == 1 ? <>1</> : <></>}
                      </TableCell>
                      <TableCell align="center">
                        {row.H1result === 1 && row.H2result === 1 ? (
                          <>2</>
                        ) : (
                          <>
                            {row.H1result === 1 ? (
                              <>1</>
                            ) : (
                              <>{row.H2result === 1 ? <>1</> : <></>}</>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.H1fastest === 1 && row.H2fastest === 1 ? (
                          <>2</>
                        ) : (
                          <>
                            {row.H1fastest === 1 ? (
                              <>1</>
                            ) : (
                              <>{row.H2fastest === 1 ? <>1</> : <></>}</>
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.zoomBonus === 1 ? <>1</> : null}
                      </TableCell>
                      <TableCell align="center">
                        {(
                          row.Qpoints +
                          row.H1points +
                          row.H2points +
                          row.H1fastest +
                          row.H2fastest +
                          row.zoomBonus
                        ).toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      ) : (
        <Typography variant="h5">-No Data-</Typography>
      )}
    </>
  );
}
