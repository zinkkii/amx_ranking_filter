"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import periods from "../drivers/period";
import rows from "../drivers/tabledata";
import columns from "../drivers/columns";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";

export default function Countries() {
  const router = useRouter();
  const [data, setData] = useState([{}]);
  const [period, setPeriod] = useState("");

  useEffect(() => {
    setData(rows);
  }, [rows]);

  const checkOnlyPeriod = (checkThis) => {
    const checkname = document.getElementsByName("period");
    for (let i = 0; i < checkname.length; i++) {
      if (checkname[i] !== checkThis) {
        checkname[i].checked = false;
      } else {
        if (checkname[i].checked == false) {
          setPeriod("");
        }
      }
    }
  };

  // Paging
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // -- Paging

  return (
    <>
      <div className={styles.description}>
        <div style={{ cursor: "pointer" }}>
          <Image
            onClick={() => router.push("/")}
            src="/vercel.svg"
            alt="Vercel Logo"
            className={styles.vercelLogo}
            width={100}
            height={24}
            priority
          />
        </div>
      </div>
      <div className={styles.filter}>
        <h2>Period Test</h2>

        <br />
        <hr className="hrColor" />
        <br />

        <span className="filter-title">Period</span>
        <label className="box-radio-input">
          <input
            type="checkbox"
            name="period"
            value="all"
            onClick={(e) => {
              setPeriod(e.target.value);
              console.log(e.target.value);
            }}
            onChange={(e) => checkOnlyPeriod(e.target)}
          />
          <span>All</span>
        </label>
        {periods.map((period) => (
          <label className="box-radio-input" key={period.value}>
            <input
              type="checkbox"
              name={period.name}
              value={period.value}
              onClick={(e) => {
                setPeriod(e.target.value);
                console.log(e.target.value);
              }}
              onChange={(e) => checkOnlyPeriod(e.target)}
            />
            <span>{period.label}</span>
          </label>
        ))}

        <br />
        <br />
        <hr />
        <br />
        <br />

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "100vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
}
