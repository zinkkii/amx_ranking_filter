"use client";

import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import eloheader from "../elo_table_header/eloheader";

export default function Elo_R2_H1(props) {
  var arr = [];
  const [elodata, setElodata] = useState([{}]);
  const [startEloAvg, setStartEloAvg] = useState(0);

  var temp = 0;
  //참가자 수
  var participants = 0;
  //StartElo
  var firstStartElo = 1000;
  useEffect(() => {
    //참가자 수 계산
    participants = props.data.length - 1;

    for (var i = 0; i < participants; i++) {
      arr.push({
        name: props.data[i].Name,
        startElo: firstStartElo,
        eloDiff: 0,
        odds: 0,
        result: props.data[i].FinPos,
        winlose: 0,
        newElo: 0,
      });
    }
    setElodata(arr);
  }, [props]);

  useEffect(() => {
    console.log("!!!!");
    for (var i = 0; i < participants; i++) {
      temp = arr[i].startElo + temp;
    }
    //Start Elo 총 합
    console.log("StartElo 총 합 : " + temp);
    console.log("참가자 수 : " + participants);
    console.log("StartElo Avg : " + temp / participants);
    setStartEloAvg(temp / participants);

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
  }, [elodata, setElodata, props]);

  return (
    <>
      <h2>S3 AMX10 R2_H1 Elo _ Result</h2>

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
                  <TableCell sx={{ fontFamily: "Kanit" }}>1000</TableCell>
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
    </>
  );
}
