"use client";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import rows from "./tabledata";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import columns from "./columns";

export default function StickyHeadTable(props) {
  const [games, setGames] = useState([{}]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (props.game === "all") {
      setGames(rows);
      function allfilter(rows) {
        if (
          (props.tier === "" && props.region === "") ||
          (props.tier === rows.tier && props.region === "") ||
          (props.tier === rows.tier && props.region === rows.region) ||
          (props.tier === "" && props.region === rows.region)
        ) {
          return true;
        }
      }
      console.log(rows.filter(allfilter));
      setGames(rows.filter(allfilter));
    } else {
      function filtergame(rows) {
        if (
          (props.game === rows.game &&
            props.tier === "" &&
            props.region === "") ||
          (props.game === rows.game &&
            props.tier === rows.tier &&
            props.region === "") ||
          (props.game === rows.game &&
            props.tier === rows.tier &&
            props.region === rows.region) ||
          (props.game === rows.game &&
            props.tier === "" &&
            props.region === rows.region) ||
          (props.game === "" &&
            props.tier === rows.tier &&
            props.region === "") ||
          (props.game === "" &&
            props.tier === rows.tier &&
            props.region === rows.region) ||
          (props.game === "" &&
            props.tier === "" &&
            props.region === rows.region)
        ) {
          return true;
        }
      }
      console.log(rows.filter(filtergame));
      setGames(rows.filter(filtergame));
    }
  }, [props, rows]);

  useEffect(() => {
    setPage(0);
  }, [props]);

  const [searchName, setSearchName] = useState("");
  const [countries, setCountries] = useState("");

  const handleChange = (event) => {
    setCountries(event.target.value);
  };

  const goSearch = (games) => {
    console.log("=====");
    console.log(games);
    var emptyarr = [];
    console.log("searchResult");
    console.log(searchName);
    console.log(countries);
    console.log("=====");

    for (var i = 0; i < games.length; i++) {
      if (searchName !== "" && countries === "") {
        var result = games[i].name.indexOf(searchName);
        if (result !== -1) {
          console.log(games[i].name);
          emptyarr.push(games[i]);
        }
      }
      if (searchName === "" && countries !== "") {
        var result = games[i].country.indexOf(countries);
        if (result !== -1) {
          console.log(games[i].country);
          emptyarr.push(games[i]);
        }
      }
      if (searchName !== "" && countries !== "") {
        var result = games[i].name.indexOf(searchName);
        var result2 = games[i].country.indexOf(countries);
        if (result !== -1 && result2 !== -1) {
          console.log(games[i]);
          emptyarr.push(games[i]);
        }
      }
    }
    setGames(emptyarr);
  };

  return (
    <>
      {/* SearchFilter */}
      <Box
        component="form"
        sx={{ width: "100%", mb: 2 }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={1} direction="row">
          <TextField
            sx={{ width: "50%", fontFamily: "Kanit" }}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(e) => {
              console.log(e.target.value);
              setSearchName(e.target.value);
            }}
          />
          <FormControl sx={{ width: "35%" }}>
            <InputLabel id="demo-simple-select-label">Countries</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={countries}
              label="Countries"
              onChange={handleChange}
            >
              <MenuItem value="🏁">🏁</MenuItem>
              <MenuItem value="🎌">🎌</MenuItem>
              <MenuItem value="🏳️‍🌈">🏳️‍🌈</MenuItem>
              <MenuItem value="🏴‍☠️">🏴‍☠️</MenuItem>
            </Select>
          </FormControl>

          <Button
            sx={{ width: "15%" }}
            variant="outlined"
            onClick={() => {
              goSearch(games);
              setSearchName("");
              setCountries("");
              setPage(0);
              var input = document.getElementById("outlined-basic");
              input.value = null;
              var select = document.getElementById("demo-simple-select");
              select.value = null;
            }}
          >
            Search
          </Button>
        </Stack>
      </Box>

      {/* Paging */}
      <TablePagination
        sx={{ fontFamily: "Kanit" }}
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={games.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Table Row */}
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{ fontFamily: "Kanit", fontWeight: "900" }}
                    key={column.id}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {games
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            sx={{ fontFamily: "Kanit" }}
                            key={column.id}
                            align={column.align}
                          >
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
      </Paper>
    </>
  );
}
