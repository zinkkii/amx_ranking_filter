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

export default function ModalChart(props) {
  const { rounds, topCarInfo, topTrackInfo, topDateInfo, chartResult } = props;
  return (
    <Paper>
      <Typography sx={{ margin: 1, fontWeight: "900" }}>
        AMX Zero_Race {rounds} - {topDateInfo}
        <br />
        {topCarInfo}
        <br />
        {topTrackInfo}
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "900" }}>Pos</TableCell>
              <TableCell sx={{ fontWeight: "900" }}>DriverName</TableCell>
              <TableCell sx={{ fontWeight: "900" }}>Points</TableCell>
              <TableCell sx={{ fontWeight: "900" }}>Pole Position</TableCell>
              <TableCell sx={{ fontWeight: "900" }}>Heat Wins</TableCell>
              <TableCell sx={{ fontWeight: "900" }}>Fastest Laps</TableCell>
              <TableCell sx={{ fontWeight: "900" }}>Zoom</TableCell>
              <TableCell sx={{ fontWeight: "900" }}>Total Earnings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chartResult.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.driverName}</TableCell>
                <TableCell>{row.rankingPoints + row.fastestPoint}</TableCell>
                <TableCell>{row.Q1 == 0 ? null : <>{row.Q1}</>}</TableCell>
                <TableCell>
                  {row.H1 + row.H2 == 0 ? null : <>{row.H1 + row.H2}</>}
                </TableCell>
                <TableCell>
                  {row.H1fastest + row.H2fastest == 0 ? null : (
                    <>{row.H1fastest + row.H2fastest}</>
                  )}
                </TableCell>
                <TableCell>{row.zoomCheck}</TableCell>
                <TableCell>
                  {row.rankingPoints + row.fastestPoint + row.zoomCheck}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
