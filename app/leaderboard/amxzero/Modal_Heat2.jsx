"use client";

import {
  DialogTitle,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

export default function ModalHeat2(props) {
  const { h2Result } = props;
  return (
    <>
      <Paper sx={{ overflow: "hidden", marginTop: 2 }}>
        <Typography sx={{ margin: 1, fontWeight: "900" }}>
          Heat2 Result
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "900" }}>Pos</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Car</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Driver Name</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Start Pos</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Car #</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Interval</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Laps Led</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>
                  Average Lap Time
                </TableCell>
                <TableCell sx={{ fontWeight: "900" }}>
                  Fastest Lap Time
                </TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Fast Lap#</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Laps Comp</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Inc</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Points</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Penalty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {h2Result.map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell>{row.finPos}</TableCell>
                  <TableCell>{row.car}</TableCell>
                  <TableCell>{row.driverName}</TableCell>
                  <TableCell>{row.startPos}</TableCell>
                  <TableCell>{row.carSharp}</TableCell>
                  <TableCell>{row.intervalvalue}</TableCell>
                  <TableCell>{row.lapsLed}</TableCell>
                  <TableCell>{row.averageLapTime}</TableCell>
                  {row.fastestPoints != 0 ? (
                    <TableCell sx={{ color: "#ff0000" }}>
                      <b>{row.fastestLapTime}</b>
                    </TableCell>
                  ) : (
                    <TableCell>{row.fastestLapTime}</TableCell>
                  )}
                  <TableCell>{row.fastLap}</TableCell>
                  <TableCell>{row.lapsComp}</TableCell>
                  <TableCell>{row.inc}</TableCell>
                  <TableCell>{row.points + row.fastestPoints}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
