"use client";

import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import testdata from "./testdata";

export default function EloTable() {
  const [elodata, setElodata] = useState(testdata);
  const [startEloAvg, setStartEloAvg] = useState(0);
  var participants = 0; //참가자수
  var [randomResult, setRandomResult] = useState([]); //Result(등수 결과)
  useEffect(() => {
    if (elodata.length > 0) {
      var temp = 0;

      //참가자수(Result 값 계산)
      participants = elodata.length;

      //Result 결과 등수(고정값이 아니니까...일단 랜덤으로 참가자 수만큼 돌리기)
      while (randomResult.length < participants) {
        const randomNumber = Math.floor(Math.random() * participants);
        const remove0 = randomNumber + 1;
        if (randomResult.indexOf(remove0) < 0) {
          randomResult.push(remove0);
        }
      }
      const result = randomResult.map(Number);
      console.log("랜덤 등수 결과" + result);
      setRandomResult(result);

      for (var i = 0; i < participants; i++) {
        temp = elodata[i].startElo + temp;
      }
      console.log("StartElo총합: " + temp);
      console.log("참가자 수: " + participants);

      console.log("StartElo Avg : " + temp / participants);
      setStartEloAvg(temp / participants);

      for (var i = 0; i < participants; i++) {
        //eloDiff 값 계산
        var diffvalue =
          (temp - elodata[i].startElo) / (participants - 1) -
          elodata[i].startElo;
        testdata[i].eloDiff = diffvalue;
        //Odds 값 계산
        var oddsvalue =
          (1 / (10 ** (diffvalue / 400) + 1)) * (participants - 1);
        elodata[i].Odds = oddsvalue;
        //Win & Lose 값 계산
        elodata[i].winlose = participants - randomResult[i];
        console.log(
          elodata[i].name +
            ": " +
            elodata[i].winlose +
            "번 이김 -- 아래 New Elo값"
        );
        //new Elo 값 계산
        console.log(
          elodata[i].startElo + 16 * (elodata[i].winlose - oddsvalue)
        );
        elodata[i].newElo =
          elodata[i].startElo + 16 * (elodata[i].winlose - oddsvalue);
      }
    }
  }, [setRandomResult]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>DriverName</b>
              </TableCell>
              <TableCell>
                <b>Start Elo</b>
              </TableCell>
              <TableCell>
                <b>Elo Diff</b>
              </TableCell>
              <TableCell>
                <b>Odds</b>
              </TableCell>
              <TableCell>
                <b>Result</b>
              </TableCell>
              <TableCell>
                <b>Win:1 , Lose:0</b>
              </TableCell>
              <TableCell>
                <b>New Elo</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {elodata.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.startElo}</TableCell>
                <TableCell>{row.eloDiff}</TableCell>
                <TableCell>{row.Odds}</TableCell>
                <TableCell>{randomResult[index]}</TableCell>
                <TableCell>{row.winlose}</TableCell>
                <TableCell>{row.newElo}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <b>Average</b>
              </TableCell>
              <TableCell>
                <b>{startEloAvg}</b>
              </TableCell>
              <TableCell>_</TableCell>
              <TableCell>_</TableCell>
              <TableCell>_</TableCell>
              <TableCell>_</TableCell>
              <TableCell>_</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
