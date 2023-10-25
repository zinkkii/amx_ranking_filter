"use client";
import { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import Papa from "papaparse";
import commonConfig from "../../assets/csvHeader";
import Layout from "../../layouts/layout";
import axios from "axios";
import amx10points from "../../assets/amx10points";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import elo from "../../assets/elo";

export default function Qpage() {
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
  function parseCSVData() {
    Papa.parse(
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R1/S3_AMX10_R1_Q.csv", //R1_Q 첫경기 후 DB업데이트
      "https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R2/S3_AMX10_R2_Q.csv", //R2_Q
      {
        ...commonConfig,
        header: true,
        download: true,
        complete: (result) => {
          setCsvData(result.data);
        },
      }
    );
  }
  //-- USER_TABLE, AMX10_TABLE
  const userInsert = (CsvData) => {
    axios
      .post("/api/amx10/user_insert", { data: CsvData })
      .then((res) => {
        console.log(res.data);
        alert("유저 정보가 User,AMX10에 들어감!!ㅇㅇ");
        //window.location.reload("/amx10"); //페이지 강제 새로고침
      })
      .catch((err) => console.log(err));
  };

  const finPosUpdate = (CsvData) => {
    axios
      .post("/api/amx10/finPosUpdate", { data: CsvData })
      .then((res) => {
        console.log(res.data);
        alert("finPos업데이트됨!!");
      })
      .catch((err) => console.log(err));
  };

  const eloList = (dollar) => {
    alert("고고");
    const temparr = [];
    axios
      .post("/api/amx10/select") //WHERE finPos>0 ORDER BY finPos ASC;
      .then((res) => {
        console.log(res.data);
        console.log(dollar);
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
        for (var i = 0; i < dollar.length; i++) {
          temparr[i].points = dollar[i].points;
        }
        //console.log(temparr);
        setAmxInfo(temparr);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    parseCSVData();
    setDollar(amx10points);
  }, []);

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

  const amx10_update = (elodata) => {
    axios
      .post("/api/amx10/update", { data: elodata })
      .then((res) => {
        console.log(res.data);
        alert("업데이트 완료!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <h3>CSV파일 읽어온 값</h3>
      {CsvData.map((data, index) => (
        <Typography key={index}>
          {data.FinPos}. {data.Name}({data.CustID})
        </Typography>
      ))}
      <Button onClick={() => userInsert(CsvData)} variant="outlined">
        USER INSERT
      </Button>

      <br />
      <Button onClick={() => finPosUpdate(CsvData)} variant="outlined">
        FinPos UPDATE
      </Button>

      <h3>계산값 확인하기</h3>

      <Button onClick={() => eloList(dollar)} variant="outlined">
        Elo계산,Point확인
      </Button>

      {amxInfo.length > 1 ? (
        <>
          <h3>등수별 상금</h3>
          {dollar.map((row, index) => (
            <Typography key={index}>
              {index + 1}등 : <b>+${row.points}</b>
            </Typography>
          ))}
          <h3>누적 상금</h3>
          {amxInfo.map((info, index) => (
            <Typography key={index}>
              {index + 1}. {info.driverName} <b>+${info.points}</b>
            </Typography>
          ))}
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
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        <b>${value.points}</b>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Button
            style={{ marginTop: 10 }}
            onClick={() => amx10_update(elodata)}
            variant="outlined"
          >
            UPDATE
          </Button>
        </>
      ) : (
        <>누르면 없어짐</>
      )}
    </Layout>
  );
}
