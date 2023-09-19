"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Teams() {
  const router = useRouter();
  const [searchName, setSearchName] = useState("");
  const [countries, setCountries] = useState("");

  const handleChange = (event) => {
    setCountries(event.target.value);
  };

  const rows = [
    { name: "nameAA", country: "🏁" },
    { name: "nameBB", country: "🎌" },
    { name: "nameCC", country: "🏳️‍🌈" },
    { name: "nameDD", country: "🏴‍☠️" },
    { name: "nameEE", country: "🏁" },
    { name: "nameFF", country: "🎌" },
    { name: "nameGG", country: "🏳️‍🌈" },
    { name: "nameHH", country: "🏴‍☠️" },
    { name: "Annnnn", country: "🏴‍☠️" },
    { name: "Bnnnnn", country: "🏁" },
    { name: "Cnnnnn", country: "🏳️‍🌈" },
    { name: "Dnnnnn", country: "🎌" },
  ];
  const [data, setData] = useState([
    {
      name: "",
      country: "",
    },
  ]);

  const goSearch = () => {
    var arr = [];
    console.log("searchResult");
    console.log(searchName);
    console.log(countries);

    for (var i = 0; i < rows.length; i++) {
      if (searchName !== "" && countries === "") {
        var result = rows[i].name.indexOf(searchName);
        if (result !== -1) {
          console.log(rows[i].name);
          arr.push(rows[i]);
        }
      }
      if (searchName === "" && countries !== "") {
        var result = rows[i].country.indexOf(countries);
        if (result !== -1) {
          console.log(rows[i].country);
          arr.push(rows[i]);
        }
      }
      if (searchName !== "" && countries !== "") {
        var result = rows[i].name.indexOf(searchName);
        var result2 = rows[i].country.indexOf(countries);
        if (result !== -1 && result2 !== -1) {
          console.log(rows[i]);
          arr.push(rows[i]);
        }
      }
    }
    setData(...[arr]);
  };

  useEffect(() => {}, []);

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
        <h2>Teams</h2>
        <br />
        <br />
        <Box
          component="form"
          sx={{ width: "100%" }}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={1} direction="row">
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              onChange={(e) => {
                console.log(e.target.value);
                setSearchName(e.target.value);
              }}
              sx={{ width: "50%" }}
            />
            <FormControl sx={{ width: "35%" }}>
              <InputLabel id="demo-simple-select-label">
                All Countries
              </InputLabel>
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

            <Button sx={{ width: "15%" }} variant="outlined" onClick={goSearch}>
              Search
            </Button>
          </Stack>
        </Box>
        <Box
          component="form"
          sx={{ width: "100%" }}
          noValidate
          autoComplete="off"
        >
          <br />
          <br />
          {rows.map((row, index) => (
            <p key={index}>
              {row.name} &nbsp;&nbsp;{row.country}
            </p>
          ))}
          <p>------------</p>
          <h2>Test Result</h2>
          {data.length > 0 && data.name !== "" ? (
            data.map((data) => (
              <p key={data.name}>
                {data.name} &nbsp;&nbsp;{data.country}
              </p>
            ))
          ) : (
            <p>검색결과없음</p>
          )}
        </Box>
      </div>
      <div className={styles.grid}></div>
    </>
  );
}
