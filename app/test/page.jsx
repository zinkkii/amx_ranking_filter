"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import eloheader from "../elo_table_header/eloheader";

export default function Page() {
  var arr = []; //elo값 계산해서 넣을공간
  const [elodata, setElodata] = useState([{}]); //arr넣을거임 Q
  const [CsvData, setCsvData] = useState([{}]);
  const [driverInfo, setDriverInfo] = useState([
    {
      custID: 0,
      driverName: "",
      country: "",
      elo: 0,
      wins: 0,
      finishedRace: 0,
    },
  ]);
  var commonConfig = {
    delimiter: ",",
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    //헤더 커스터마이징
    transformHeader: function (header) {
      //헤더 공백 제거
      var removeEmpty = header.split(" ").join("");
      //헤더(Key값) 특수문자 제거( # , % , ( , ) )
      var removesharp = removeEmpty.replace("#", "_");
      var removepercent = removesharp.replace("%", "_");
      var removeR = removepercent.replace("(", "_");
      var result = removeR.replace(")", "_");

      return result;
    },
  };
  // Parse remote CSV file
  function parseCSVData() {
    Papa.parse(
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R1/S3_AMX10_R1_Q.csv", //R1_Q 첫경기 후 DB업데이트
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R1/S3_AMX10_R1_H1.csv", //R1_H1 후 DB업데이트
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R1/S3_AMX10_R1_H2.csv", //R1_H2 후 DB업데이트
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R2/S3_AMX10_R2_Q.csv", //R2_Q
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R2/S3_AMX10_R2_H1.csv", //R2_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R2/S3_AMX10_R2_H2.csv", //R2_H2
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R3/S3_AMX10_R3_Q.csv", //R3_Q
      "https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R3/S3_AMX10_R3_H1.csv", //R3_H1
      {
        ...commonConfig,
        header: true,
        download: true,
        complete: (result) => {
          console.log(result.data);
          setCsvData(result.data);
        },
      }
    );
  }

  //CsvData의 USER INFO -- DB에 INSERT하기
  const userInsert = (CsvData) => {
    axios
      //.post("/api/user/insert", { data: CsvData }) //맨 처음에만 UserINSERT
      .post("/api/user/nested_insert", { data: CsvData }) //경기에따른 누적 UserINSERT
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  //참가자수
  var participants = 0;

  useEffect(() => {
    parseCSVData();
  }, []);

  useEffect(() => {
    //DB에서 Driver정보 꺼내오기
    axios
      //.post("/api/user/select") // 모든 유저 꺼내오기
      .post("/api/user/nested_select", { data: CsvData }) // Csv파일과 일치하는 유저만 꺼내오기
      .then((res) => {
        console.log(res.data);
        setDriverInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, [CsvData]);

  var temp = 0;
  var tempElo = 0;
  //elo값 계산하기
  useEffect(() => {
    //참가자수
    participants = CsvData.length;
    console.log("참가자수" + participants);

    //-------------------------------------------------------------
    //Q____데이터계산 (startElo = 1000 완전 첫경기때)
    // for (var i = 0; i < participants; i++) {
    //   arr.push({
    //     name: CsvData[i].Name,
    //     startElo: 1000,
    //     eloDiff: 0,
    //     odds: 0,
    //     result: CsvData[i].FinPos,
    //     winlose: 0,
    //     newElo: 0,
    //     game: "iracing",
    //     tier: "AMX 10",
    //     region: "Global",
    //     custID: CsvData[i].CustID,
    //   });
    // }
    // console.log(arr);
    // setElodata(arr);
    //-------------------------------------------------------------

    //-------------------------------------------------------------
    //Q____데이터계산 (startElo = 0 으로 잠깐 해놓고)
    for (var i = 0; i < participants; i++) {
      arr.push({
        name: CsvData[i].Name,
        startElo: tempElo,
        eloDiff: 0,
        odds: 0,
        result: CsvData[i].FinPos,
        winlose: 0,
        newElo: 0,
        game: "iracing",
        tier: "AMX 10",
        region: "Global",
        custID: CsvData[i].CustID,
      });
    }
    // startElo 값을 DB의 USER의 elo값과 맞게 설정
    for (var i = 0; i < driverInfo.length; i++) {
      arr[i].startElo = driverInfo[i].elo;
    }
    console.log(arr);
    setElodata(arr);
    //-------------------------------------------------------------

    //-------------------------------------------------------------
    //H1____데이터계산
    // for (var i = 0; i < participants; i++) {
    //   arr.push({
    //     name: CsvData[i].Name,
    //     startElo: tempElo,
    //     eloDiff: 0,
    //     odds: 0,
    //     result: CsvData[i].FinPos,
    //     winlose: 0,
    //     newElo: 0,
    //     game: "iracing",
    //     tier: "AMX 10",
    //     region: "Global",
    //     custID: CsvData[i].CustID,
    //   });
    // }
    //arr(CSV) 데이터 custID 순서로 정렬
    // const newArr = arr.sort((a, b) => a.custID - b.custID);
    //DB의 USER데이터 cust ID 순서로 정렬
    // const sort_arr = driverInfo.sort((a, b) => a.custID - b.custID);
    // console.log(newArr);
    // console.log(sort_arr);

    //순서대로 CSV파일의 startElo를 DB의 elo 저장값 으로 넣음 => 자동계산
    // for (var i = 0; i < driverInfo.length; i++) {
    //   arr[i].startElo = driverInfo[i].elo;
    // }
    // console.log(arr);
    // setElodata(arr);
    //-------------------------------------------------------------

    //Start Elo 총 합
    for (var i = 0; i < driverInfo.length; i++) {
      temp = driverInfo[i].elo + temp;
    }
    console.log("Start Elo 총 합 : " + temp);

    for (var i = 0; i < participants; i++) {
      //eloDiff 값 계산
      var diffvalue =
        (temp - arr[i].startElo) / (participants - 1) - arr[i].startElo;
      arr[i].eloDiff = diffvalue;
      //Odds 값 계산
      var oddsvalue = (1 / (10 ** (diffvalue / 400) + 1)) * (participants - 1);
      arr[i].odds = oddsvalue;
      //win & lose계산
      arr[i].winlose = participants - arr[i].result;
      //new Elo 값 계산
      arr[i].newElo = arr[i].startElo + 16 * (arr[i].winlose - oddsvalue);
    }
  }, [CsvData, driverInfo, setElodata, setDriverInfo]);

  //elo값 계산 결과 USER INFO -- DB에 UPDATE하기
  const eloUpdate = (elodata) => {
    axios
      .post("/api/user/update", { data: elodata })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>csv to json 결과</h2>
      {CsvData.map((data, index) => (
        <p key={index}>
          {data.FinPos}. {data.Name} - {data.Car}
        </p>
      ))}
      <button onClick={() => userInsert(CsvData)}>Insert User Data</button>
      <h2>DB에서 꺼내온 Driver정보</h2>
      {driverInfo.map((data, index) => (
        <p key={index}>
          {data.custID}, {data.elo}
        </p>
      ))}
      <h2>Elo계산값</h2>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {eloheader.map((row, index) => (
                  <TableCell
                    key={index}
                    sx={{ fontFamily: "Kanit", fontWeight: "900" }}
                  >
                    <b>{row.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {elodata.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ fontFamily: "Kanit" }}>{row.name}</TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.custID}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.startElo}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.eloDiff}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>{row.odds}</TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.result}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.winlose}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.newElo}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <button onClick={() => eloUpdate(elodata)}>Update</button>
    </>
  );
}
