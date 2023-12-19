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
      driverName: "",
      custID: 0,
      sumPoints: 0,
      participated: 0,
      sumFastestLaps: 0,
      sumPolePosition: 0,
      sumH1heat: 0,
      sumH2heat: 0,
      zoom: 0,
    },
  ]);

  useEffect(() => {
    axios
      .post("/api/result/result_select_leaderboard")
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
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "900" }}>Pos.</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Driver Name</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>
                  Races Participated
                </TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {board.length > 1 ? (
                <>
                  {board.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.driverName}</TableCell>
                      <TableCell>{row.participated}</TableCell>
                      <TableCell>{row.sumPoints + row.zoom}</TableCell>
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
