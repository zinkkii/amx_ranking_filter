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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import RankingData from "./RankingData";
import axios from "axios";

export default function StickyHeadTable(props) {
  const [user, setUser] = useState([{}]);
  const [defaultUser, setDefaultUser] = useState([{}]);
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
    var rows = [];
    if (
      props.game === "all" ||
      props.game === "iracing" ||
      props.region === "Global"
    ) {
      axios.post("/api/user/select_elo_desc").then((res) => {
        //console.log(res.data);
        setUser(res.data);
        rows = res.data;
        function allFilter(rows) {
          if (
            (props.tier === "" && props.region === "") ||
            (props.tier === rows.tier && props.region === "") ||
            (props.tier === rows.tier && props.region === rows.region) ||
            (props.tier === "" && props.region === rows.region)
          ) {
            return true;
          }
        }
        //console.log(rows.filter(allFilter));
        setUser(rows.filter(allFilter));
      });
    } else {
      axios.post("/api/user/select_elo_desc").then((res) => {
        rows = res.data;
        function otherFilter(rows) {
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
        setUser(rows.filter(otherFilter));
      });
    }
  }, [props, setUser]);

  useEffect(() => {
    setPage(0);
  }, [props, user]);

  const [searchName, setSearchName] = useState("");
  const [countries, setCountries] = useState("");

  const handleChange = (event) => {
    setCountries(event.target.value);
  };

  const goSearch = (user) => {
    var emptyarr = [];

    for (var i = 0; i < user.length; i++) {
      if (searchName !== "" && countries === "") {
        var result = user[i].driverName.indexOf(searchName);
        if (result !== -1) {
          //console.log(user[i].driverName);
          emptyarr.push(user[i]);
        }
      }
      if (searchName === "" && countries !== "") {
        var result = user[i].country.indexOf(countries);
        if (result !== -1) {
          //console.log(user[i].country);
          emptyarr.push(user[i]);
        }
      }
      if (searchName !== "" && countries !== "") {
        var result = user[i].driverName.indexOf(searchName);
        var result2 = user[i].country.indexOf(countries);
        if (result !== -1 && result2 !== -1) {
          //console.log(user[i]);
          emptyarr.push(user[i]);
        }
      }
    }
    setUser(emptyarr);
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
              //console.log(e.target.value);
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
              <MenuItem value="Asia">Asia</MenuItem>
              <MenuItem value="Asia">Australia/NZ</MenuItem>
              <MenuItem value="Benelux">Benelux</MenuItem>
              <MenuItem value="Brazil">Brazil</MenuItem>
              <MenuItem value="California Club">California Club</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="DE-AT-CH">DE-AT-CH</MenuItem>
              <MenuItem value="Florida">Florida</MenuItem>
              <MenuItem value="France">France</MenuItem>
              <MenuItem value="Great Plains">Great Plains</MenuItem>
              <MenuItem value="Hispanoamérica">Hispanoamérica</MenuItem>
              <MenuItem value="Iberia">Iberia</MenuItem>
              <MenuItem value="Italy">Italy</MenuItem>
              <MenuItem value="Mexico">Mexico</MenuItem>
              <MenuItem value="New York">New York</MenuItem>
              <MenuItem value="Scandinavia">Scandinavia</MenuItem>
              <MenuItem value="UK and I">UK and I</MenuItem>
              <MenuItem value="Virginias">Virginias</MenuItem>
              <MenuItem value="West">West</MenuItem>
            </Select>
          </FormControl>

          <Button
            sx={{ width: "15%" }}
            variant="outlined"
            onClick={() => {
              goSearch(user);
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

      <Box>
        <Typography
          variant="h5"
          sx={{ fontFamily: "Kanit", fontWeight: "900", marginTop: "30px" }}
        >
          AMX Season3 RACE_14 Result
        </Typography>
      </Box>

      {/* Paging */}
      <TablePagination
        sx={{ fontFamily: "Kanit" }}
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontFamily: "Kanit",
                    fontWeight: "900",
                    align: "center",
                  }}
                >
                  Pos
                </TableCell>
                <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                  Country
                </TableCell>
                <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                  Game
                </TableCell>
                <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                  Tier
                </TableCell>
                <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                  Region
                </TableCell>
                <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                  Elo
                </TableCell>
                <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                  Points
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {user
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" key={index}>
                    <TableCell sx={{ fontFamily: "Kanit", align: "center" }}>
                      {index + page * rowsPerPage + 1}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit" }}>
                      {row.driverName}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit" }}>
                      {row.country}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit" }}>
                      {row.game}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit" }}>
                      {row.tier}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit" }}>
                      {row.region}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit" }}>
                      {row.elo}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit" }}>
                      ${row.points}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
