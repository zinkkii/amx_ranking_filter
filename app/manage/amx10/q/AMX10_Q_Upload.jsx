"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Input,
  Alert,
  Stack,
  TextField,
} from "@mui/material";
import amx10points from "@/app/assets/amx10points";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import csvStore from "@/app/store/amx10/csvStore";

export default function AMX10_Q_Upload() {
  const { fileupload, src, parseCsv, parseData, tableheader } = csvStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [rounds, setRounds] = useState(0);
  const [csvUrl, setCsvUrl] = useState("");
  const [eloData, setEloData] = useState([{}]);
  const [datetime, setDatetime] = useState("");
  const [car, setCar] = useState("");
  const [track, setTrack] = useState("");
  var category = "Q";
  var tier = "AMX10";
  const handleClose = () => {
    setOpen(false);
    setErrorOpen(false);
  };

  useEffect(() => {
    setTimeout(handleClose, 5000);
  }, [open, errorOpen]);

  useEffect(() => {
    parseCsv(src);
  }, [src]);

  const insertRoundsTop = () => {
    axios
      .post("/api/result/result_insert_roundsInfo", {
        tier,
        rounds,
        datetime,
        car,
        track,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "SUCCESS") {
          alert("SUCCESS");
        }
      })
      .catch((err) => console.log(err));
  };

  const eloCalculate = (tier, category, rounds) => {
    console.log("ELO값 계산--시작");
    if (!rounds) {
      alert("라운드 입력 필수");
      return;
    }
    var arr = [];
    var sumElo = 0;
    axios
      .post("/api/result/result_select_info", { tier, category, rounds })
      .then((res) => {
        res.data.sort((a, b) => a.finPos - b.finPos);
        console.log(res.data);
        //elo값 총 합
        for (var i = 0; i < res.data.length; i++) {
          sumElo = res.data[i].startElo + sumElo;
        }
        //elo계산
        for (var i = 0; i < res.data.length; i++) {
          arr.push({
            custID: res.data[i].custID,
            driverName: res.data[i].driverName,
            finPos: res.data[i].finPos,
            startElo: res.data[i].startElo,
            eloDiff:
              (sumElo - res.data[i].startElo) / (res.data.length - 1) -
              res.data[i].startElo,
            odds:
              (1 /
                (10 **
                  (((sumElo - res.data[i].startElo) / (res.data.length - 1) -
                    res.data[i].startElo) /
                    400) +
                  1)) *
              (res.data.length - 1),
            winLose: res.data.length - (i + 1),
            newElo:
              res.data[i].startElo +
              16 *
                (res.data.length -
                  (i + 1) -
                  (1 /
                    (10 **
                      (((sumElo - res.data[i].startElo) /
                        (res.data.length - 1) -
                        res.data[i].startElo) /
                        400) +
                      1)) *
                    (res.data.length - 1)),
            points: 0,
            lapsComp: res.data[i].lapsComp,
          });
        }
        //point계산
        if (res.data.length <= amx10points.length) {
          // 참가자 15명 이하
          var firstLapsComp = arr[0].lapsComp;
          var limitLapsComp = firstLapsComp * 0.8;

          for (var i = 0; i < res.data.length; i++) {
            console.log("15명 이하!!!");
            console.log("lapsComp : " + arr[i].lapsComp);
            console.log("limitLapsComp : " + limitLapsComp);
            if (arr[i].lapsComp <= limitLapsComp) {
              //포인트 못받음(참가자 15명 이하 && 1등의 LapsComp 80% 이하)
              console.log("얘 못받음");
              arr[i].points = 0;
            } else {
              //포인트 받음(참가자 15명 이하 && 1등의 LapsComp 80% 초과)
              console.log("얜 받음");
              arr[i].points = amx10points[i].points;
            }
          }
        } else {
          // 참가자 15명 초과
          for (var i = 0; i < amx10points.length; i++) {
            console.log("15명 초과임!!!");
            arr[i].points = amx10points[i].points;
          }
        }
        setEloData([...arr].sort((a, b) => a.finPos - b.finPos));
      })
      .catch((err) => console.log(err));
  };

  const resultInsertUser = (parseData) => {
    axios
      .post("/api/result/result_insert_user", { data: parseData })
      .then((res) => {
        console.log(res.data);
        if (res.data === "SUCCESS") {
          setOpen(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const resultInsert = (parseData, rounds) => {
    console.log(parseData);

    if (!rounds) {
      alert("라운드 입력 필수!");
      return;
    }
    axios
      .post("/api/result/result_insert_q_info", {
        category,
        rounds,
        parseData,
        tier,
      })
      .then((res) => {
        if (res.data === "SUCCESS") {
          console.log("good...");
          alert("SUCCESS");
        } else {
          console.log("Failed....");
          setErrorOpen(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const resultUpdate = (elodata, rounds) => {
    if (!rounds) {
      alert("라운드 입력 필수!");
      return;
    }
    console.log("!!!!!!!");
    console.log(elodata);

    axios
      .post("/api/result/result_update", { elodata, rounds, tier, category })
      .then((res) => {
        console.log(res.data);
        if (res.data === "SUCCESS") {
          alert("업데이트 완료");
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
        <b>AMX10 - Q</b>
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

      <h3>1. 해당 라운드 입력하기</h3>
      <Input
        sx={{ width: "40%" }}
        type="number"
        placeholder="몇 라운드인지 숫자만 입력"
        onChange={(e) => setRounds(e.target.value)}
      ></Input>
      <br />

      <h3>2. csv파일 선택하기</h3>
      <Input
        color="primary"
        type="file"
        accept="csv"
        onChange={(e) => {
          let file = e.target.files[0];
          let filename = encodeURIComponent(file.name);
          fileupload(filename, file);
          setCsvUrl(src);
        }}
      />
      {src === "" ? null : (
        <>
          <div>
            <h3>3. 결과</h3>
            {parseData.map((row, index) => (
              <Typography key={index}>
                {row.FinPos}, {row.Name}
              </Typography>
            ))}
          </div>

          <div>
            <h3>4. 사용자 정보 넣기</h3>
            <Button
              variant="outlined"
              onClick={() => {
                resultInsertUser(parseData);
              }}
            >
              INPUT
            </Button>
          </div>

          <Stack sx={{ width: "100%", marginTop: 2 }} spacing={2}>
            {open && (
              <Alert variant="outlined" severity="info" onClose={handleClose}>
                SUCCESS !
              </Alert>
            )}
          </Stack>

          <div>
            <h3>5. Qualifying 결과 넣기</h3>
            <Button
              variant="outlined"
              onClick={() => {
                resultInsert(parseData, rounds);
              }}
            >
              INPUT
            </Button>
          </div>

          <Stack sx={{ width: "100%", marginTop: 2 }} spacing={2}>
            {errorOpen && (
              <Alert variant="outlined" severity="error" onClose={handleClose}>
                ERROR! The file already exists!
              </Alert>
            )}
          </Stack>

          <div>
            <h3>6. 해당라운드 정보 입력</h3>
            <TextField
              sx={{ width: "50%" }}
              margin="dense"
              id="datetime"
              label="시간 입력(ex. 2024.01.01 12:20 AM GMT )"
              type="text"
              variant="standard"
              required
              onChange={(e) => setDatetime(e.target.value)}
            />
            <br />
            <TextField
              sx={{ width: "50%" }}
              margin="dense"
              id="datetime"
              label="Car 또는 CarClass 입력"
              type="text"
              variant="standard"
              required
              onChange={(e) => setCar(e.target.value)}
            />
            <br />
            <TextField
              sx={{ width: "50%" }}
              margin="dense"
              id="datetime"
              label="Track 정보 입력"
              type="text"
              variant="standard"
              required
              onChange={(e) => setTrack(e.target.value)}
            />
            <br />
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => {
                insertRoundsTop();
              }}
            >
              INPUT
            </Button>
            <br />
          </div>

          <div>
            <h3>7. Qualifying Elo 계산하기</h3>
            <Button
              variant="outlined"
              onClick={() => {
                eloCalculate(tier, category, rounds);
              }}
            >
              Calculating
            </Button>

            <Paper sx={{ overflow: "hidden", marginTop: 3 }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} size="small">
                  <TableHead>
                    <TableRow>
                      {tableheader.map((row, index) => (
                        <TableCell sx={{ fontWeight: "900" }} key={index}>
                          {row}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {eloData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.finPos}</TableCell>
                        <TableCell>{row.driverName}</TableCell>
                        <TableCell>{row.startElo}</TableCell>
                        <TableCell>{row.eloDiff}</TableCell>
                        <TableCell>{row.odds}</TableCell>
                        <TableCell>{row.finPos}</TableCell>
                        <TableCell>{row.winLose}</TableCell>
                        <TableCell>{row.newElo}</TableCell>
                        <TableCell>{row.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>

          <div>
            <h3>8. 확인 후 업데이트</h3>
            <Button
              variant="outlined"
              onClick={() => {
                resultUpdate(eloData, rounds);
              }}
            >
              INPUT
            </Button>
          </div>
        </>
      )}
    </>
  );
}
