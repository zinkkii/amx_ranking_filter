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
import amx0points from "@/app/assets/amx0points";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";

export default function AMX0_Q() {
  const router = useRouter();
  const [src, setSrc] = useState("");
  const [rounds, setRounds] = useState(0);
  const [CsvData, setCsvData] = useState([{}]);
  const [dollar, setDollar] = useState([{ points: 0 }]);
  const [amxInfo, setAmxInfo] = useState([
    {
      custID: "",
      driverName: "",
      elo: 1000,
      game: "",
      num: 0,
      points: 0,
      region: "",
      tier: "",
      wins: 0,
      finPos: 0,
    },
  ]);
  const arr = [];
  const [elodata, setElodata] = useState([
    {
      custID: "",
      driverName: "",
      startElo: 0,
      eloDiff: 0,
      odds: 0,
      result: 0,
      winlose: 0,
      newElo: 0,
      points: 0,
    },
  ]);
  var step = "q";

  function parseCSVData() {
    Papa.parse(`${src}`, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (result) => {
        setCsvData(result.data);
      },
    });
  }
  //-- USER_TABLE, AMX0_TABLE
  const userInsert = (CsvData, rounds) => {
    if (!rounds) {
      alert("몇라운드인지 입력하세요!");
      return;
    }
    axios
      .post("/api/amx0/user_insert", { data: CsvData, rounds: rounds })
      .then((res) => {
        //console.log(res.data);
        alert("유저 정보 확인 OK");
      })
      .catch((err) => console.log(err));
  };

  const finPosUpdate = (CsvData, rounds) => {
    if (!rounds) {
      alert("몇라운드인지 입력하세요!");
      return;
    }
    axios
      .post("/api/amx0/finPosUpdate", {
        data: CsvData,
        rounds: rounds,
        step: step,
      })
      .then((res) => {
        //console.log(res.data);
        alert("순위 업데이트 OK");
      })
      .catch((err) => console.log(err));
  };

  const eloList = (dollar) => {
    alert("계산 시작");
    const temparr = [];
    axios
      .post("/api/amx0/select") //WHERE finPos>0 ORDER BY finPos ASC;
      .then((res) => {
        //console.log(res.data);
        //console.log(dollar);
        for (var i = 0; i < res.data.length; i++) {
          temparr.push({
            custID: res.data[i].custID,
            driverName: res.data[i].driverName,
            elo: res.data[i].elo,
            game: res.data[i].game,
            num: res.data[i].num,
            points: 0,
            region: res.data[i].region,
            tier: res.data[i].tier,
            wins: res.data[i].wins,
            finPos: res.data[i].finPos,
          });
        }
        if (res.data.length < dollar.length) {
          //console.log("data.length < dollar.length");
          for (var i = 0; i < res.data.length; i++) {
            temparr[i].points = dollar[i].points;
          }
        } else {
          //console.log("원래 기본");
          for (var i = 0; i < dollar.length; i++) {
            temparr[i].points = dollar[i].points;
          }
        }

        //console.log(temparr);
        setAmxInfo(temparr);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    parseCSVData();
    setDollar(amx0points);
  }, [src]);

  useEffect(() => {
    var temp = 0;
    for (var i = 0; i < amxInfo.length; i++) {
      //elo값 총 합
      temp = amxInfo[i].elo + temp;
    }
    for (var i = 0; i < amxInfo.length; i++) {
      arr.push({
        custID: amxInfo[i].custID,
        driverName: amxInfo[i].driverName,
        startElo: amxInfo[i].elo,
        eloDiff:
          (temp - amxInfo[i].elo) / (amxInfo.length - 1) - amxInfo[i].elo,
        odds:
          (1 /
            (10 **
              (((temp - amxInfo[i].elo) / (amxInfo.length - 1) -
                amxInfo[i].elo) /
                400) +
              1)) *
          (amxInfo.length - 1),
        result: amxInfo[i].finPos,
        winlose: amxInfo.length - (i + 1),
        newElo:
          amxInfo[i].elo +
          16 *
            (amxInfo.length -
              (i + 1) -
              (1 /
                (10 **
                  (((temp - amxInfo[i].elo) / (amxInfo.length - 1) -
                    amxInfo[i].elo) /
                    400) +
                  1)) *
                (amxInfo.length - 1)),
        points: amxInfo[i].points,
      });
    }
    setElodata([...arr].sort((a, b) => a.result - b.result));
  }, [amxInfo]);

  const amx0_update = (elodata, rounds) => {
    if (!rounds) {
      alert("몇라운드인지 입력하세요!");
      return;
    }
    axios
      .post("/api/amx0/update", { data: elodata, rounds: rounds, step: step })
      .then((res) => {
        //console.log(res.data);
        alert("업데이트 OK");
        router.push("/manage");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <b>AMXZero - Q</b>
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
        placeholder="몇 라운드인지 숫자 입력"
        onChange={(e) => setRounds(e.target.value)}
      />
      <br />
      <h3>2. csv파일 선택하기</h3>
      <Input
        color="primary"
        type="file"
        accept="csv"
        onChange={async (e) => {
          let file = e.target.files[0];
          let filename = encodeURIComponent(file.name);
          let res = await fetch("/api/admin/upload?file=" + filename);
          res = await res.json();
          //S3 Upload
          const formData = new FormData();
          Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
          });
          const result = await fetch(res.url, {
            method: "POST",
            body: formData,
          });
          //console.log(result);
          if (result.ok) {
            setSrc(result.url + "/iracing/" + filename);
          } else {
            console.log("ERROR....");
          }
        }}
      />

      {src === "" ? null : (
        <>
          <h3>.csv파일 읽어온 값</h3>
          {CsvData.map((data, index) => (
            <Typography key={index}>
              {data.FinPos}. {data.Name}({data.CustID})
            </Typography>
          ))}

          <h3>3. 유저 정보 넣기</h3>
          <Button
            onClick={() => userInsert(CsvData, rounds)}
            variant="outlined"
          >
            USER INSERT
          </Button>

          <h3>4. 순위 업데이트하기</h3>
          <Button
            onClick={() => finPosUpdate(CsvData, rounds)}
            variant="outlined"
          >
            FinPos UPDATE
          </Button>

          <h3>5. 계산값 확인하기</h3>
          <Button onClick={() => eloList(dollar)} variant="outlined">
            Elo계산,Point확인
          </Button>
        </>
      )}

      {amxInfo.length > 1 ? (
        <>
          <h2>Q _ Elo계산값</h2>
          <Paper sx={{ overflow: "hidden" }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    {elo.map((row, index) => (
                      <TableCell
                        key={index}
                        sx={{ fontFamily: "Kanit", fontWeight: "900" }}
                      >
                        {row.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {elodata.map((value, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {value.result}. {value.driverName}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {value.custID}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {value.startElo}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {value.eloDiff}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {value.odds}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {value.result}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {value.winlose}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        <b>{value.newElo}</b>
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: "Kanit", fontWeight: "900" }}
                      >
                        <b>${value.points}</b>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <h3>6. 확인 후 업데이트 버튼 누르기</h3>
          <Button
            style={{ marginTop: 10 }}
            onClick={() => amx0_update(elodata, rounds)}
            variant="outlined"
          >
            UPDATE
          </Button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
