"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import Test from "./Test";
import Test2 from "./Test2";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Manage() {
  const generatePDF = () => {
    // Create a new jsPDF instance
    const pdfDoc = new jsPDF();

    // Add content to the PDF
    pdfDoc.text("Sample Table in PDF", 10, 10);

    // Table data
    const tableData = [
      ["Name", "Age", "Country"],
      ["John Doe", 30, "USA"],
      ["Jane Doe", 25, "Canada"],
    ];

    // Define column headers
    const tableHeaders = ["Name", "Age", "Country"];

    // Add autoTable plugin to jsPDF instance
    pdfDoc.autoTable({
      head: [tableHeaders],
      body: tableData,
    });

    // Save the PDF
    pdfDoc.save("result.pdf");
  };

  return (
    <>
      <PDFDownloadLink document={<Test />} fileName="test.pdf">
        DownloadPDF
      </PDFDownloadLink>
      <br />
      <PDFViewer>
        <Test />
      </PDFViewer>
      <div>
        <h1>PDF Generator</h1>
        <button onClick={generatePDF}>Generate PDF</button>
      </div>
      {/* <Test2 /> */}
    </>
  );
}
