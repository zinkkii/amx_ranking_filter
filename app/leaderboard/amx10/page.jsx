"use client";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import LeaderBoardTopCategory from "../TopCategory";
import axios from "axios";
import { useState, useEffect } from "react";
import TopResultSearch10 from "./TopResultSearch10";

export default function AMX10() {
  const [board, setBoard] = useState([
    {
      driverName: "",
      custID: 0,
      sumPoints: 0,
      participated: 0,
      sumFastestLaps: 0,
      sumPolePosition: 0,
      sumH1heat: 0,
      sumH2heat: 0,
    },
  ]);
  var tier = "AMX10";

  useEffect(() => {
    axios
      .post("/api/result/result_select_leaderboard", { tier })
      .then((res) => {
        if (res.data.length > 1) {
          console.log(res.data);
          setBoard(res.data.sort((a, b) => b.sumPoints - a.sumPoints));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <LeaderBoardTopCategory />
      <TopResultSearch10 />
      <Typography variant="h4">AMX10</Typography>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "900" }}>Pos.</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Driver Name</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Points</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>
                  Races Participated
                </TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Pole Positions</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Heat Wins</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Fastes Laps</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {board.length > 1 ? (
                <>
                  {board.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.driverName}</TableCell>
                      <TableCell>{row.sumPoints}</TableCell>
                      <TableCell>{row.participated}</TableCell>
                      <TableCell>{row.sumPolePosition}</TableCell>
                      <TableCell>{row.sumH1heat + row.sumH2heat}</TableCell>
                      <TableCell>{row.sumFastestLaps}</TableCell>
                    </TableRow>
                  ))}
                </>
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
