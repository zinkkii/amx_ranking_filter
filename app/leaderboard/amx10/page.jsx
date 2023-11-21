"use client";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import LeaderBoardTopCategory from "../TopCategory";
import axios from "axios";
import { useState, useEffect } from "react";

export default function AMX10() {
  const [board, setBoard] = useState([
    {
      custID: 0,
      driverName: "",
      fastestLaps: 0,
      heatWins: 0,
      participated: 0,
      points: 0,
      polePositions: 0,
    },
  ]);

  useEffect(() => {
    axios
      .post("/api/leaderboard/amx10")
      .then((res) => {
        if (res.data.length > 1) {
          setBoard(res.data.sort((a, b) => b.points - a.points));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <LeaderBoardTopCategory />
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
                      <TableCell>{row.points}</TableCell>
                      <TableCell>{row.participated}</TableCell>
                      <TableCell>{row.polePositions}</TableCell>
                      <TableCell>{row.heatWins}</TableCell>
                      <TableCell>{row.fastestLaps}</TableCell>
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
