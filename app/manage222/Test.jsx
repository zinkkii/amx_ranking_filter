"use client";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
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
export default function Manage() {
  const styles = StyleSheet.create({
    table: {
      width: "100%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      borderTop: "1px solid #EEE",
      paddingTop: 8,
      paddingBottom: 8,
    },
    header: {
      borderTop: "none",
    },
    bold: {
      fontWeight: "bold",
    },
    // So Declarative and unDRY 👌
    row1: {
      width: "27%",
    },
    row2: {
      width: "15%",
    },
    row3: {
      width: "15%",
    },
    row4: {
      width: "20%",
    },
    row5: {
      width: "27%",
    },
  });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={[styles.row, styles.bold, styles.header]}>
            <Text style={styles.row1}>Name</Text>
            <Text style={styles.row2}>Start Date</Text>
            <Text style={styles.row3}>End Date</Text>
            <Text style={styles.row4}>Days</Text>
            <Text style={styles.row5}>Info</Text>
          </View>

          <View style={styles.row} wrap={false}>
            <Text style={styles.row1}>
              <Text style={styles.bold}>1111</Text>,22222
            </Text>
            <Text style={styles.row2}>12121212</Text>
            <Text style={styles.row3}>1212121212</Text>
            <Text style={styles.row4}>
              <Text style={styles.bold}>ababab</Text> of efefefef
            </Text>
            <Text style={styles.row5}>abbbbbbbb</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
