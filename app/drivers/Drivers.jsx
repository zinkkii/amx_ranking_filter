"use client";

import Table from "./Table";
import { useState } from "react";

import games from "./games";
import tiers from "./tiers";
import regions from "./regions";
import periods from "./period";
import { Typography } from "@mui/material";
import TopCategory from "./TopCategory";
import RankingTable from "./RankingTable";

export default function Drivers() {
  const [game, setGame] = useState("all");
  const [tier, setTier] = useState("");
  const [region, setRegion] = useState("");
  const [period, setPeriod] = useState("");

  const checkOnlyGame = (checkThis) => {
    const gamesname = document.getElementsByName("game");
    for (let i = 0; i < gamesname.length; i++) {
      if (gamesname[i] !== checkThis) {
        gamesname[i].checked = false;
      } else {
        if (gamesname[i].checked == false) {
          setGame("");
        }
      }
    }
  };

  const checkOnlyTier = (checkThis) => {
    const tiername = document.getElementsByName("tier");
    for (let i = 0; i < tiername.length; i++) {
      if (tiername[i] !== checkThis) {
        tiername[i].checked = false;
      } else {
        if (tiername[i].checked == false) {
          setTier("");
        }
      }
    }
  };

  const checkOnlyRegion = (checkThis) => {
    const regionname = document.getElementsByName("region");
    for (let i = 0; i < regionname.length; i++) {
      if (regionname[i] !== checkThis) {
        regionname[i].checked = false;
      } else {
        if (regionname[i].checked == false) {
          setRegion("");
        }
      }
    }
  };

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

  return (
    <>
      <TopCategory />

      <Typography
        variant="h5"
        sx={{ mb: 3, fontFamily: "Kanit", fontWeight: "900" }}
      >
        Drivers
      </Typography>
      <hr />
      <span className="filter-title">Game</span>
      <label className="box-radio-input">
        <input
          type="checkbox"
          name="game"
          value="all"
          defaultChecked={true}
          onClick={(e) => {
            setGame(e.target.value);
          }}
          onChange={(e) => checkOnlyGame(e.target)}
        />
        <span>All</span>
      </label>
      {games.map((games) => (
        <label className="box-radio-input" key={games.value}>
          <input
            type="checkbox"
            name={games.name}
            value={games.value}
            onClick={(e) => {
              setGame(e.target.value);
            }}
            onChange={(e) => checkOnlyGame(e.target)}
          />
          <span>{games.label}</span>
        </label>
      ))}

      <hr />

      <span className="filter-title">Tier</span>
      {tiers.map((tiers) => (
        <label className="box-radio-input" key={tiers.value}>
          <input
            type="checkbox"
            name={tiers.name}
            value={tiers.value}
            onClick={(e) => {
              setTier(e.target.value);
            }}
            onChange={(e) => checkOnlyTier(e.target)}
          />
          <span>{tiers.label}</span>
        </label>
      ))}

      <hr />

      <span className="filter-title">Region</span>
      {regions.map((regions) => (
        <label className="box-radio-input" key={regions.value}>
          <input
            type="checkbox"
            name={regions.name}
            value={regions.value}
            onClick={(e) => {
              setRegion(e.target.value);
            }}
            onChange={(e) => checkOnlyRegion(e.target)}
          />
          <span>{regions.label}</span>
        </label>
      ))}

      <hr />

      <span className="filter-title">Period</span>
      <label className="box-radio-input">
        <input
          type="checkbox"
          name="period"
          value="all"
          onClick={(e) => {
            setPeriod(e.target.value);
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

      <hr />

      <RankingTable game={game} tier={tier} region={region} />
      {/* <Table game={game} tier={tier} region={region} /> */}
    </>
  );
}
