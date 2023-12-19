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

export default function ModalQualifying(props) {
  const { qResult } = props;
  return (
    <>
      <Paper sx={{ marginTop: 2 }}>
        <Typography sx={{ margin: 1, fontWeight: "900" }}>
          Qualifying Result
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "900" }}>Pos</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Car</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Driver Name</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Car #</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Interval</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>
                  Average Lap Time
                </TableCell>
                <TableCell sx={{ fontWeight: "900" }}>
                  Fastest Lap Time
                </TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Fast Lap#</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Lap Comp</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Inc</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Points</TableCell>
                <TableCell sx={{ fontWeight: "900" }}>Penalty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {qResult.map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell>{row.finPos}</TableCell>
                  <TableCell>{row.car}</TableCell>
                  <TableCell>{row.driverName}</TableCell>
                  <TableCell>{row.carSharp}</TableCell>
                  <TableCell>{row.intervalvalue}</TableCell>
                  <TableCell>{row.averageLapTime}</TableCell>
                  <TableCell>{row.fastestLapTime}</TableCell>
                  <TableCell>{row.fastLap}</TableCell>
                  <TableCell>{row.lapsComp}</TableCell>
                  <TableCell>{row.inc}</TableCell>
                  <TableCell>{row.points}</TableCell>
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
