"use client";
import {
  Stack,
  Button,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
import { useState, useEffect } from "react";
import csvStore from "@/app/store/amx10/csvStore";
import axios from "axios";
import Modal_Chart from "./Modal_Chart";
import Modal_Qualifying from "./Modal_Qualifying";
import Modal_Heat1 from "./Modal_Heat1";
import Modal_Heat2 from "./Modal_Heat2";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function TopResultSearch10() {
  const { topCarInfo, topTrackInfo, topDateInfo, settingInfo } = csvStore();
  const [amx10, setAmx10] = useState("");
  const [rounds, setRounds] = useState(0);
  const [open, setOpen] = useState(false);
  const [roundList, setRoundList] = useState([{}]);
  const [qResult, setQResult] = useState([{}]);
  const [h1Result, setH1Result] = useState([{}]);
  const [h2Result, setH2Result] = useState([{}]);
  const [chartResult, setChartResult] = useState([
    {
      H1: 0,
      H1fastest: 0,
      H2: 0,
      H2fastest: 0,
      Q1: 0,
      custID: 0,
      driverName: "",
      fastestPoint: 0,
      rankingPoints: 0,
      rounds: 0,
      topCarInfo: "",
      topDateInfo: "",
      topTrackInfo: "",
    },
  ]);
  var tier = "AMX10";

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .post("/api/result/result_select_client_roundsList", { tier })
      .then((res) => {
        console.log(res.data);
        setRoundList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const modalData = (rounds) => {
    var q = [];
    var h1 = [];
    var h2 = [];
    setRounds(rounds);
    axios
      .post("/api/result/result_select_searchRounds", { rounds, tier })
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].category === "Q") {
            q.push(res.data[i]);
          } else if (res.data[i].category === "H1") {
            h1.push(res.data[i]);
          } else if (res.data[i].category === "H2") {
            h2.push(res.data[i]);
          }
        }
        setQResult(q.sort((a, b) => a.finPos - b.finPos));
        setH1Result(h1.sort((a, b) => a.finPos - b.finPos));
        setH2Result(h2.sort((a, b) => a.finPos - b.finPos));
        selectChart(
          q.sort((a, b) => a.finPos - b.finPos),
          rounds
        );
      })
      .catch((err) => console.log(err));
  };

  const selectChart = (dataResult, rounds) => {
    axios
      .post("/api/result/result_select_chart", { dataResult, rounds, tier })
      .then((res) => {
        res.data.sort(
          (a, b) =>
            b.fastestPoint +
            b.rankingPoints -
            (a.fastestPoint + a.rankingPoints)
        );
        settingInfo(res.data[0]);
        setChartResult(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onDownloadBtn = () => {
    const pdfDoc = new jsPDF();
    const fontSize = 13;
    pdfDoc.setFontSize(fontSize);
    pdfDoc.text(
      `AMX10_RACE ${rounds}\n${topDateInfo}\n${topTrackInfo} - ${topCarInfo}`,
      15,
      10
    );

    var chartTemp = [];
    chartResult.map((row, index) => {
      chartTemp.push({
        finPos: index + 1,
        driverName: row.driverName,
        points: row.rankingPoints + row.fastestPoint,
        polePosition: row.Q1,
        heatWins: row.H1 + row.H2,
        fastestLaps: row.H1fastest + row.H2fastest,
      });
    });
    const chartData = chartTemp.map((row) => [
      [row.finPos],
      [row.driverName],
      [row.points],
      [row.polePosition],
      [row.heatWins],
      [row.fastestLaps],
    ]);

    const tableChartHeader = [
      "Pos",
      "Driver Name",
      "Points",
      "Pole Position",
      "Heat Wins",
      "Fastest Laps",
    ];

    pdfDoc.autoTable({
      head: [tableChartHeader],
      body: chartData,
      theme: "grid",
      styles: {
        fontSize: 8,
      },
      margin: { top: 25 },
      headStyles: { fillColor: "#0f91d0", textColor: "#ffffff" },
    });

    pdfDoc.addPage();
    pdfDoc.text("Heat2 Result", 15, 10);

    var tableTempDataH2 = [];
    h2Result.map((row) => {
      tableTempDataH2.push({
        finPos: row.finPos,
        car: row.car,
        driverName: row.driverName,
        startPos: row.startPos,
        carSharp: row.carSharp,
        intervalvalue: row.intervalvalue,
        lapsLed: row.lapsLed,
        averageLapTime: row.averageLapTime,
        fastestLapTime: row.fastestLapTime,
        fastLap: row.fastLap,
        lapsComp: row.lapsComp,
        inc: row.inc,
        allPoints: row.points + row.fastestPoints,
      });
    });

    const tableDataH2 = tableTempDataH2.map((row) => [
      [row.finPos],
      [row.car],
      [row.driverName],
      [row.startPos],
      [row.carSharp],
      [row.intervalvalue],
      [row.lapsLed],
      [row.averageLapTime],
      [row.fastestLapTime],
      [row.fastLap],
      [row.lapsComp],
      [row.inc],
      [row.allPoints],
    ]);

    const tableHeadersH2 = [
      "Pos",
      "Car",
      "Driver Name",
      "Start Pos",
      "Car #",
      "Interval",
      "Laps Led",
      "Average Lap Time",
      "Fastest Lap Time",
      "Fast Lap#",
      "Laps Comp",
      "Inc",
      "Points",
      "Penalty",
    ];

    pdfDoc.autoTable({
      head: [tableHeadersH2],
      body: tableDataH2,
      theme: "grid",
      styles: {
        fontSize: 8,
      },
      headStyles: { fillColor: "#0f91d0", textColor: "#ffffff" },
    });

    pdfDoc.addPage();
    pdfDoc.text("Heat1 Result", 15, 10);

    var tableTempDataH1 = [];
    h1Result.map((row) => {
      tableTempDataH1.push({
        finPos: row.finPos,
        car: row.car,
        driverName: row.driverName,
        startPos: row.startPos,
        carSharp: row.carSharp,
        intervalvalue: row.intervalvalue,
        lapsLed: row.lapsLed,
        averageLapTime: row.averageLapTime,
        fastestLapTime: row.fastestLapTime,
        fastLap: row.fastLap,
        lapsComp: row.lapsComp,
        inc: row.inc,
        allPoints: row.points + row.fastestPoints,
      });
    });

    const tableDataH1 = tableTempDataH1.map((row) => [
      [row.finPos],
      [row.car],
      [row.driverName],
      [row.startPos],
      [row.carSharp],
      [row.intervalvalue],
      [row.lapsLed],
      [row.averageLapTime],
      [row.fastestLapTime],
      [row.fastLap],
      [row.lapsComp],
      [row.inc],
      [row.allPoints],
    ]);

    const tableHeadersH1 = [
      "Pos",
      "Car",
      "Driver Name",
      "Start Pos",
      "Car #",
      "Interval",
      "Laps Led",
      "Average Lap Time",
      "Fastest Lap Time",
      "Fast Lap#",
      "Laps Comp",
      "Inc",
      "Points",
      "Penalty",
    ];

    pdfDoc.autoTable({
      head: [tableHeadersH1],
      body: tableDataH1,
      theme: "grid",
      styles: {
        fontSize: 8,
      },
      headStyles: { fillColor: "#0f91d0", textColor: "#ffffff" },
    });

    pdfDoc.addPage();
    pdfDoc.text("Qualifying Result", 15, 10);

    var tableTempDataQ = [];
    qResult.map((row) => {
      tableTempDataQ.push({
        finPos: row.finPos,
        car: row.car,
        driverName: row.driverName,
        startPos: row.startPos,
        carSharp: row.carSharp,
        intervalvalue: row.intervalvalue,
        lapsLed: row.lapsLed,
        averageLapTime: row.averageLapTime,
        fastestLapTime: row.fastestLapTime,
        fastLap: row.fastLap,
        lapsComp: row.lapsComp,
        inc: row.inc,
        allPoints: row.points + row.fastestPoints,
      });
    });

    const tableDataQ = tableTempDataQ.map((row) => [
      [row.finPos],
      [row.car],
      [row.driverName],
      [row.startPos],
      [row.carSharp],
      [row.intervalvalue],
      [row.lapsLed],
      [row.averageLapTime],
      [row.fastestLapTime],
      [row.fastLap],
      [row.lapsComp],
      [row.inc],
      [row.allPoints],
    ]);

    const tableHeadersQ = [
      "Pos",
      "Car",
      "Driver Name",
      "Start Pos",
      "Car #",
      "Interval",
      "Laps Led",
      "Average Lap Time",
      "Fastest Lap Time",
      "Fast Lap#",
      "Laps Comp",
      "Inc",
      "Points",
      "Penalty",
    ];

    pdfDoc.autoTable({
      head: [tableHeadersQ],
      body: tableDataQ,
      theme: "grid",
      styles: {
        fontSize: 8,
      },
      headStyles: { fillColor: "#0f91d0", textColor: "#ffffff" },
    });

    pdfDoc.save(`AMX10_Race${rounds}_Result.pdf`);
  };

  return (
    <>
      <Box
        component="form"
        sx={{ width: "100%", mb: 2 }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={1} direction="row">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">AMX 10</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Countries"
              value={amx10}
              onChange={(e) => {
                console.log(e.target.value);
                setAmx10(e.target.value);
              }}
            >
              {roundList.length > 0 ? (
                roundList.map((row, index) => (
                  <MenuItem
                    key={index}
                    value={row.rounds}
                    onClick={() => {
                      modalData(row.rounds);
                      setOpen(true);
                    }}
                  >
                    Race {row.rounds}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>null</MenuItem>
              )}
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          AMX10 Result - Race {amx10}
        </DialogTitle>

        <DialogContent>
          <Modal_Chart
            topCarInfo={topCarInfo}
            topTrackInfo={topTrackInfo}
            rounds={rounds}
            topDateInfo={topDateInfo}
            chartResult={chartResult}
          />
          <Modal_Heat2 h2Result={h2Result} />
          <Modal_Heat1 h1Result={h1Result} />
          <Modal_Qualifying qResult={qResult} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onDownloadBtn} color="info">
            PDF-Download
          </Button>
          <Button onClick={handleClose} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
