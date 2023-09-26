"use client";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Papa from "papaparse";
import Typography from "@mui/material/Typography";
import tableheader from "../elo_table_header/tableheader";
import AWS from "aws-sdk";
import Elo_R2_Q from "./Elo_R2_Q";

export default function Result() {
  //담을곳
  var arr = [];
  //csv to json 변환데이터 담을곳
  const [CSVData, setCSVData] = useState([{}]);
  //CSV파일 변환 세팅
  var commonConfig = {
    delimiter: ",",
    header: true,
    dynamicTyping: true,
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
  // csv to json 변환
  function parseCSVData() {
    Papa.parse(
      "https://automanix.s3.ap-northeast-2.amazonaws.com/amx/S3_AMX10_R2_Q.csv", //csv파일주소
      {
        ...commonConfig,
        header: true,
        download: true,
        complete: (result) => {
          //console.log(result.data);
          for (var i = 0; i < result.data.length; i++) {
            //console.log(result.data[i]);
            arr.push(result.data[i]);
          }
          setCSVData(arr);
        },
      }
    );
  }
  useEffect(() => {
    parseCSVData();
  }, []);

  return (
    <>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontFamily: "Kanit", fontWeight: "900" }}
      >
        S3_AMX10_R2_Q
      </Typography>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {tableheader.map((data, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontFamily: "Kanit",
                      fontWeight: "900",
                      minWidth: 100,
                    }}
                  >
                    {data.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {CSVData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.FinPos}</TableCell>
                  <TableCell>{data.CarID}</TableCell>
                  <TableCell>{data.Car}</TableCell>
                  <TableCell>{data.CarClass}</TableCell>
                  <TableCell>{data.TeamID}</TableCell>
                  <TableCell>{data.CustID}</TableCell>
                  <TableCell>{data.Name}</TableCell>
                  <TableCell>{data.StartPos}</TableCell>
                  <TableCell>{data.Car_}</TableCell>
                  <TableCell>{data.OutID}</TableCell>
                  <TableCell>{data.Out}</TableCell>
                  <TableCell>{data.Interval}</TableCell>
                  <TableCell>{data.LapsLed}</TableCell>
                  <TableCell>{data.QualifyTime}</TableCell>
                  <TableCell>{data.AverageLapTime}</TableCell>
                  <TableCell>{data.FastestLapTime}</TableCell>
                  <TableCell>{data.FastLap_}</TableCell>
                  <TableCell>{data.LapsComp}</TableCell>
                  <TableCell>{data.Inc}</TableCell>
                  <TableCell>{data.ClubID}</TableCell>
                  <TableCell>{data.Club}</TableCell>
                  <TableCell>{data.MaxFuelFill_}</TableCell>
                  <TableCell>{data.WeightPenalty_KG_}</TableCell>
                  <TableCell>{data.SessionName}</TableCell>
                  <TableCell>{data.AI}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Elo_R2_Q data={CSVData} />
    </>
  );
}
