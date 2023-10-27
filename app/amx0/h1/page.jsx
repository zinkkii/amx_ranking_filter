"use client";
import { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import Papa from "papaparse";
import commonConfig from "../../assets/csvHeader";
import Layout from "../../layouts/layout";
import axios from "axios";
import amx0points from "../../assets/amx0points";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import elo from "../../assets/elo";

export default function Hpage() {
  const [CsvData, setCsvData] = useState([{}]);
  const [dollar, setDollar] = useState([{ points: 0 }]);
  const [fastest, setFastest] = useState();
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
      //`${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R1/S3_AMXZero_R1_H1.csv`, //Zero H1 - R1_H1
      //`${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R2/S3_AMXZero_R2_H1.csv`, //R2_H1
      //`${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R3/S3_AMXZero_R3_H1.csv`, //R3_H1
      //`${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R4/S3_AMXZero_R4_H1.csv`, //R4_H1
      //`${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R5/S3_AMXZero_R5_H1.csv`, //R5_H1
      //`${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R6/S3_AMXZero_R6_H1.csv`, //R6_H1
      //`${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R7/S3_AMXZero_R7_H1.csv`, //R7_H1
      //`${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R8/S3_AMXZero_R8_H1.csv`, //R8_H1
      //`${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R9/S3_AMXZero_R9_H1.csv`, //R9_H1
      //`${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R10/S3_AMXZero_R10_H1.csv`, //R10_H1
      //`${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R11/S3_AMXZero_R11_H1.csv`, //R11_H1
      //`${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R12/S3_AMXZero_R12_H1.csv`, //R12_H1
      //`${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R13/S3_AMXZero_R13_H1.csv`, //R13_H1
      `${process.env.NEXT_PUBLIC_S3_AMX0_ADDRESS}/R14/S3_AMXZero_R14_H1.csv`, //R14_H1
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

  const finPosUpdate = (CsvData) => {
    axios
      .post("/api/amx0/finPosUpdate", { data: CsvData })
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
      .post("/api/amx0/select") //WHERE finPos>0 ORDER BY finPos ASC;
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
            //points: res.data[i].points,
            points: 0,
            region: res.data[i].region,
            tier: res.data[i].tier,
            wins: res.data[i].wins,
            finPos: res.data[i].finPos,
          });
        }
        for (var i = 0; i < dollar.length; i++) {
          temparr[i].points = dollar[i].points; //1~15
        }
        console.log(temparr);
        setAmxInfo(temparr);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    parseCSVData();
    setDollar(amx0points);
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
    console.log([...arr].sort((a, b) => a.result - b.result));
    setElodata([...arr].sort((a, b) => a.result - b.result));
  }, [amxInfo]);

  const checkOnlyOne = (checkThis) => {
    const name = document.getElementsByName("fastest");
    for (let i = 0; i < name.length; i++) {
      if (name[i] !== checkThis) {
        name[i].checked = false;
      } else {
        if (name[i].checked == false) {
          setFastest();
        }
      }
    }
  };

  const amx0_update = (elodata, fastest, dollar) => {
    if (!fastest) {
      console.log(elodata);
      console.log(dollar);
      alert("Fastest 체크는 필수입니다!");
      return;
    }
    axios
      .post("/api/amx0/update", { data: elodata, fastest })
      .then((res) => {
        console.log(res.data);
        alert("업데이트 완료!");
        window.location.reload("/amx0/h");
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
              {index + 1}. {info.driverName} <b>${info.points}</b>
            </Typography>
          ))}
          <h2>H _ Elo계산값</h2>
          <Paper sx={{ overflow: "hidden" }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontFamily: "Kanit" }}>Pos</TableCell>
                    {elo.map((row, index) => (
                      <TableCell
                        key={index}
                        sx={{ fontFamily: "Kanit", fontWeight: "900" }}
                      >
                        {row.label}
                      </TableCell>
                    ))}
                    <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                      Fastest
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {elodata.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        <b>{row.result}</b>
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {row.driverName}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {row.custID}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {row.startElo}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {row.eloDiff}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {row.odds}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {row.result}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        {row.winlose}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        <b>{row.newElo}</b>
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Kanit" }}>
                        <b>${row.points}</b>
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: "Kanit" }}
                        padding="checkbox"
                      >
                        <input
                          type="checkbox"
                          name="fastest"
                          onClick={(e) => {
                            setFastest(e.target.value);
                            console.log(e.target.value);
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
          <Button
            style={{ marginTop: 10 }}
            onClick={() => amx0_update(elodata, fastest, dollar)}
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
