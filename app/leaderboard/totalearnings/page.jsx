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

export default function TotalEarnings() {
  const [board, setBoard] = useState([
    {
      custID: 0,
      driverName: "",
      participated: 0,
      points: 0,
    },
  ]);

  useEffect(() => {
    axios
      .post("/api/leaderboard/total")
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
