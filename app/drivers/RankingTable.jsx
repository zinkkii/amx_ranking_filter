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
import RankingData from "./RankingData";
import axios from "axios";

export default function StickyHeadTable(props) {
  const [user, setUser] = useState([{}]);
  const [games, setGames] = useState([{}]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const row = [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //DB에서 USER데이터 가져오기
  useEffect(() => {
    // axios
    //   .post("/api/user/select_elo_desc")
    //   .then((res) => {
    //     console.log(res.data);
    //     setUser(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(props.game);
    console.log(props.tier);
    console.log(props.region);

    if (props.game === "all") {
      axios
        .post("/api/user/select_elo_desc") //전체뽑기
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch((err) => console.log(err));
      if (props.tier === "AMX Zero") {
        console.log("ZEZEZEZEZE");
      } else if (props.tier === "AMX 10") {
        console.log("1010101010");
      }
    } else {
      if (props.game === "iracing") {
        axios.post("/api/user/select_iracing").then((res) => {
          console.log(res.data);
          setUser(res.data);
        });
      } else {
        setUser(row); //temp(빈값)
      }
    }
    // if (props.game === "all") {
    //   setGames(rows);
    //   function allfilter(rows) {
    //     if (
    //       (props.tier === "" && props.region === "") ||
    //       (props.tier === rows.tier && props.region === "") ||
    //       (props.tier === rows.tier && props.region === rows.region) ||
    //       (props.tier === "" && props.region === rows.region)
    //     ) {
    //       return true;
    //     }
    //   }
    //   console.log(rows.filter(allfilter));
    //   setGames(rows.filter(allfilter));
    // } else {
    //   function filtergame(rows) {
    //     if (
    //       (props.game === rows.game &&
    //         props.tier === "" &&
    //         props.region === "") ||
    //       (props.game === rows.game &&
    //         props.tier === rows.tier &&
    //         props.region === "") ||
    //       (props.game === rows.game &&
    //         props.tier === rows.tier &&
    //         props.region === rows.region) ||
    //       (props.game === rows.game &&
    //         props.tier === "" &&
    //         props.region === rows.region) ||
    //       (props.game === "" &&
    //         props.tier === rows.tier &&
    //         props.region === "") ||
    //       (props.game === "" &&
    //         props.tier === rows.tier &&
    //         props.region === rows.region) ||
    //       (props.game === "" &&
    //         props.tier === "" &&
    //         props.region === rows.region)
    //     ) {
    //       return true;
    //     }
    //   }
    //   console.log(rows.filter(filtergame));
    //   setGames(rows.filter(filtergame));
    // }
  }, [props, setUser]);

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
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* <RankingData game={props.game} tier={props.tier} region={props.region} /> */}
    </>
  );
}
