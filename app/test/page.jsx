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
import eloheader from "../assets/eloheader";
import Q_Calcul from "./Q_Calcul";
import H1_Calcul from "./H1_Calcul";
import commonConfig from "../assets/csvHeader";

export default function Page() {
  var arr = []; //elo값 계산해서 넣을공간
  const [resultArr, setResultArr] = useState([{}]); //결과순(상금계산할때 필요한 빈값);
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

  // Parse remote CSV file
  function parseCSVData() {
    Papa.parse(
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R1/S3_AMX10_R1_Q.csv", //R1_Q 첫경기 후 DB업데이트
      "https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R1/S3_AMX10_R1_H1.csv", //R1_H1 후 DB업데이트
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R1/S3_AMX10_R1_H2.csv", //R1_H2 후 DB업데이트
      //AXIOS CHECK//"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R2/S3_AMX10_R2_Q.csv", //R2_Q
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R2/S3_AMX10_R2_H1.csv", //R2_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R2/S3_AMX10_R2_H2.csv", //R2_H2
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R3/S3_AMX10_R3_Q.csv", //R3_Q
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R3/S3_AMX10_R3_H1.csv", //R3_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R3/S3_AMX10_R3_H2.csv", //R3_H2
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R4/S3_AMX10_R4_Q.csv", //R4_Q
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R4/S3_AMX10_R4_H1.csv", //R4_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R4/S3_AMX10_R4_H2.csv", //R4_H2
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R5/S3_AMX10_R5_Q.csv", //R5_Q
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R5/S3_AMX10_R5_H1.csv", //R5_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R5/S3_AMX10_R5_H2.csv", //R5_H2
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R6/S3_AMX10_R6_Q.csv", //R6_Q
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R6/S3_AMX10_R6_H1.csv", //R6_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R6/S3_AMX10_R6_H2.csv", //R6_H2
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R7/S3_AMX10_R7_Q.csv", //R7_Q
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R7/S3_AMX10_R7_H1.csv", //R7_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R7/S3_AMX10_R7_H2.csv", //R7_H2
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R8/S3_AMX10_R8_Q.csv", //R8_Q
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R8/S3_AMX10_R8_H1.csv", //R8_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R8/S3_AMX10_R8_H2.csv", //R8_H2
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R9/S3_AMX10_R9_Q.csv", //R9_Q
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R9/S3_AMX10_R9_H1.csv", //R9_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R9/S3_AMX10_R9_H2.csv", //R9_H2
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R10/S3_AMX10_R10_Q.csv", //R10_Q
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R10/S3_AMX10_R10_H1.csv", //R10_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R10/S3_AMX10_R10_H2.csv", //R10_H2
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R11/S3_AMX10_R11_Q.csv", //R11_Q
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R11/S3_AMX10_R11_H1.csv", //R11_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R11/S3_AMX10_R11_H2.csv", //R11_H2
      {
        ...commonConfig,
        header: true,
        download: true,
        complete: (result) => {
          console.log("CSV파일 DATA");
          console.log(result.data);
          setCsvData(result.data);
        },
      }
    );
  }

  //CsvData의 USER INFO -- DB에 INSERT하기
  const userInsert = (CsvData) => {
    axios
      .post("/api/user/insert", { data: CsvData }) //맨 처음에만(Round1) UserINSERT
      //.post("/api/user/nested_insert", { data: CsvData }) //경기에따른 누적 UserINSERT
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
      .post("/api/user/select") // 모든 유저 꺼내오기(Round1일때만)
      //.post("/api/user/nested_select", { data: CsvData }) // Csv파일과 일치하는 유저만 꺼내오기
      .then((res) => {
        console.log(res.data); //(Round2부터는)중복유저 걸러짐
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
    //console.log("참가자수" + participants);

    //-------------------------------------------------------------
    //Q____데이터계산 (1000 완전 첫경기때(Round1에만!!!!) - 처음만 사용하기)
    // for (var i = 0; i < participants; i++) {
    //   arr.push({
    //     name: CsvData[i].Name,
    //     startElo: 1000,
    //     eloDiff: 0,
    //     odds: 0,
    //     result: CsvData[i].FinPos,
    //     winlose: 0,
    //     newElo: 0,
    //     custID: CsvData[i].CustID,
    //   });
    // }
    // console.log("Round1(첫경기) Elo=1000, Elo계산값 DATA");
    // console.log(arr);
    // setElodata(arr);
    //-------------------------------------------------------------

    //-------------------------------------------------------------
    //Q__H1__H2 누적!!데이터계산 (startElo = 0 으로 잠깐 해놓고) 중복 User있는지 체크 -> DB INSERT
    // for (var i = 0; i < participants; i++) {
    //   arr.push({
    //     name: CsvData[i].Name,
    //     startElo: tempElo,
    //     eloDiff: 0,
    //     odds: 0,
    //     result: CsvData[i].FinPos,
    //     winlose: 0,
    //     newElo: 0,
    //     custID: CsvData[i].CustID,
    //   });
    // }

    // //arr(CSV) 데이터 Result 순서로 정렬
    // const result_Arr = [...arr].sort((a, b) => a.result - b.result);
    // //arr(CSV) 데이터 custID 순서로 정렬
    // const newArr = arr.sort((a, b) => a.custID - b.custID);
    // //DB의 USER데이터 cust ID 순서로 정렬
    // const sort_arr = driverInfo.sort((a, b) => a.custID - b.custID);
    // console.log("아래 데이터 : CSV파일 데이터를 custID 순서로 정렬한다");
    // console.log(newArr);
    // console.log("아래 데이터 : DB의 USER 데이터를 custID순서로 정렬한다");
    // console.log(sort_arr);
    // console.log(
    //   "아래 데이터 : CSV 데이터의 결과순(result) 정렬---여기에서 H1, H2상금계산"
    // );
    // console.log(result_Arr);
    // setResultArr(result_Arr);
    // console.log(setResultArr);
    // //순서대로 CSV파일의 startElo를 DB의 elo 저장값 으로 넣음 => 자동계산
    // //Q 계산할때는 !!! (하기전에 중복 USer먼저 체크!!! INSERT 버튼클릭클릭 하고 주석풀기!!)
    // for (var i = 0; i < driverInfo.length; i++) {
    //   arr[i].startElo = driverInfo[i].elo;
    // }
    // console.log(
    //   "아래 데이터 : 순서대로 CSV파일의 StartElo값을 DB의 elo 값으로 넣어서 계산되게함"
    // );
    // console.log(arr);
    // setElodata(arr);

    //-------------------------------------------------------------

    //Start Elo 총 합
    // for (var i = 0; i < driverInfo.length; i++) {
    //   temp = driverInfo[i].elo + temp;
    // }

    // for (var i = 0; i < participants; i++) {
    //   //eloDiff 값 계산
    //   var diffvalue =
    //     (temp - arr[i].startElo) / (participants - 1) - arr[i].startElo;
    //   arr[i].eloDiff = diffvalue;
    //   //Odds 값 계산
    //   var oddsvalue = (1 / (10 ** (diffvalue / 400) + 1)) * (participants - 1);
    //   arr[i].odds = oddsvalue;
    //   //win & lose계산
    //   arr[i].winlose = participants - arr[i].result;
    //   //new Elo 값 계산
    //   arr[i].newElo = arr[i].startElo + 16 * (arr[i].winlose - oddsvalue);
    // }
  }, [CsvData, driverInfo, setElodata, setResultArr]);

  //elo값 계산 결과 USER INFO -- DB에 UPDATE하기
  const eloUpdate = (elodata) => {
    axios
      .post("/api/user/update", { data: elodata })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Q_Calcul />
      <H1_Calcul />
      {/* <H1_Calcul /> */}
      {/* <h2>csv to json 결과</h2>
      {CsvData.map((data, index) => (
        <p key={index}>
          {data.FinPos}. {data.Name} - {data.Car}
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
      <button
        style={{ marginBottom: "150px", marginTop: "100px" }}
        onClick={() => eloUpdate(elodata)}
      >
        DB의 ELO값을 UPDATE한다!!!
      </button>
      <span>-------위의 계산값 확인하고 DB의 ELO값 UPDATE한다</span> */}
    </>
  );
}
