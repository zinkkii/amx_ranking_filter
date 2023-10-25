"use client";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import commonConfig from "../assets/csvHeader";
import { Typography } from "@mui/material";
import H1_EloTable from "./H1_EloTable";

export default function H1data() {
  const [CsvData, setCsvData] = useState([{}]);
  const [elodata, setElodata] = useState([{}]); //arr넣을거임 Q
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
  //elo계산
  var participants = 0;
  var arr = []; //elo값 계산해서 넣을공간
  var temp = 0;
  var tempElo = 0;

  // Parse remote CSV file
  function parseCSVData() {
    Papa.parse(
      "https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R1/S3_AMX10_R1_H1.csv", //R1_H1 Round1첫경기 H1
      //AXIOS CHECK//"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R2/S3_AMX10_R2_H1.csv", //R2_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R3/S3_AMX10_R3_H1.csv", //R3_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R4/S3_AMX10_R4_H1.csv", //R4_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R5/S3_AMX10_R5_H1.csv", //R5_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R6/S3_AMX10_R6_H1.csv", //R6_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R7/S3_AMX10_R7_H1.csv", //R7_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R8/S3_AMX10_R8_H1.csv", //R8_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R9/S3_AMX10_R9_H1.csv", //R9_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R10/S3_AMX10_R10_H1.csv", //R10_H1
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/AMX10/R11/S3_AMX10_R11_H1.csv", //R11_H1
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
  //CSV파일 읽기
  useEffect(() => {
    parseCSVData();
  }, []);
  //DB에서 Driver정보 꺼내오기
  useEffect(() => {
    axios
      .post("/api/user/select") // 모든 유저 꺼내오기(Round1일때만)
      //.post("/api/user/nested_select", { data: CsvData }) // Csv파일과 일치하는 유저만 꺼내오기
      .then((res) => {
        setDriverInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, [CsvData]);

  useEffect(() => {
    //참가자수
    participants = CsvData.length;
    //Q__H1__H2 누적!!데이터계산 (startElo = 0 으로 잠깐 해놓고) 중복 User있는지 체크 -> DB INSERT
    for (var i = 0; i < participants; i++) {
      arr.push({
        name: CsvData[i].Name,
        startElo: tempElo,
        eloDiff: 0,
        odds: 0,
        result: CsvData[i].FinPos,
        winlose: 0,
        newElo: 0,
        custID: CsvData[i].CustID,
      });
    }
    for (var i = 0; i < driverInfo.length; i++) {
      arr[i].startElo = driverInfo[i].elo;
    }
    console.log(
      "아래 데이터 : 순서대로 CSV파일의 StartElo값을 DB의 elo 값으로 넣어서 계산되게함"
    );
    console.log(arr);
    setElodata(arr);

    //Start Elo 총 합
    for (var i = 0; i < driverInfo.length; i++) {
      temp = driverInfo[i].elo + temp;
    }

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
  }, [CsvData, driverInfo, setElodata]);

  return (
    <>
      <h2>(AMX Round1)H1_csv to json result</h2>
      {CsvData.map((data, index) => (
        <Typography key={index}>
          {data.FinPos}. {data.Name}
        </Typography>
      ))}

      <H1_EloTable elodata={elodata} />
    </>
  );
}
