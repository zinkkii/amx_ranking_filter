"use client";
import { Typography } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Manage() {
  const [data, setData] = useState([
    {
      name: "",
      email: "",
    },
  ]);
  let { isLoading, error, result } = useQuery({
    queryKey: ["result"],
    queryFn: async () => {
      return await axios
        .get("https://codingapple1.github.io/userdata.json")
        .then((res) => {
          setData(res.data);
          return res.data;
        });
    },
  });

  if (isLoading) return "Loading...";
  if (error) return "An Error has occurred!! + " + error.message;

  return (
    <>
      <h2>
        {data.name} + {data.email}
      </h2>
      <Typography variant="body">hello</Typography>
    </>
  );
}
