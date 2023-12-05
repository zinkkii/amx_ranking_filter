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
} from "@mui/material";
import elo from "../../../assets/elo";
import Papa from "papaparse";
import commonConfig from "@/app/assets/csvHeader";
import amx10points from "@/app/assets/amx10points";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import csvStore from "@/app/store/amx10/csvStore";

export default function AMX10_H2_Upload() {
  const router = useRouter();
  const { fileupload, src, parseCsv, parseData, tableheader } = csvStore();
  const [rounds, setRounds] = useState(0);
  const [csvUrl, setCsvUrl] = useState("");
  const [eloData, setEloData] = useState([{}]);
  const [fastest, setFastest] = useState();
  var category = "H2";
  var tier = "AMX10";

  useEffect(() => {
    parseCsv(src);
  }, [src]);

  const resultInsert = (parseData, rounds) => {
    console.log(parseData);
    if (!rounds) {
      alert("라운드 입력 필수!");
      return;
    }
    axios
      .post("/api/result/result_insert_h2_info", {
        category,
        rounds,
        parseData,
        tier,
      })
      .then((res) => {
        if (res.data === "SUCCESS") {
          console.log("good...");
        } else {
          console.log("Failed....");
        }
      })
      .catch((err) => console.log(err));
  };

  const eloCalculate = (rounds) => {
    console.log("Elo값 계산--시작");
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
          });
        }
        //point계산
        if (res.data.length < amx10points.length) {
          for (var i = 0; i < res.data.length; i++) {
            arr[i].points = amx10points[i].points;
          }
        } else {
          for (var i = 0; i < amx10points.length; i++) {
            arr[i].points = amx10points[i].points;
          }
        }
        setEloData([...arr].sort((a, b) => a.finPos - b.finPos));
      })
      .catch((err) => console.log(err));
  };

  const checkOnlyOne = (checkThis) => {
    const name = document.getElementsByName("fastest");
    for (var i = 0; i < name.length; i++) {
      if (name[i] !== checkThis) {
        name[i].checked = false;
      } else {
        if (name[i].checked == false) {
          setFastest();
        }
      }
    }
  };

  const resultUpdate = (elodata, rounds) => {
    if (!rounds) {
      alert("라운드 입력 필수!");
      return;
    }
    axios
      .post("/api/result/result_update", {
        elodata,
        rounds,
        tier,
        category,
        fastest,
      })
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
        <b>AMX10 - H2</b>
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
        type="number"
        placeholder="숫자만 입력"
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

      <div>
        <h3>3. 결과</h3>
        {parseData.map((row, index) => (
          <Typography key={index}>
            {row.FinPos}, {row.Name}
          </Typography>
        ))}
      </div>

      <div>
        <h3>5. Heat2 결과 넣기</h3>
        <Button
          variant="outlined"
          onClick={() => {
            resultInsert(parseData, rounds);
          }}
        >
          INPUT
        </Button>
      </div>

      <div>
        <h3>6. Heat2 Elo 계산하기</h3>
        <Button
          variant="outlined"
          onClick={() => {
            eloCalculate(rounds);
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
                  <TableCell sx={{ fontWeight: "900" }}>Fastest</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eloData.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{row.finPos}</TableCell>
                    <TableCell>{row.driverName}</TableCell>
                    <TableCell>{row.startElo}</TableCell>
                    <TableCell>{row.eloDiff}</TableCell>
                    <TableCell>{row.odds}</TableCell>
                    <TableCell>{row.finPos}</TableCell>
                    <TableCell>{row.winLose}</TableCell>
                    <TableCell>{row.newElo}</TableCell>
                    <TableCell>{row.points}</TableCell>
                    <TableCell>
                      <input
                        type="checkbox"
                        name="fastest"
                        onClick={(e) => {
                          setFastest(e.target.value);
                        }}
                        onChange={(e) => checkOnlyOne(e.target)}
                        value={row.custID}
                      ></input>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>

      <div>
        <h3>7. 확인 후 업데이트</h3>
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
  );
}
