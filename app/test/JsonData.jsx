"use client";

import { useEffect, useState } from "react";

export default function JsonData(props) {
  const [iracingdata, setIracingData] = useState([{}]);

  useEffect(() => {
    console.log(props.data);
    setIracingData(props.data);
  }, [props]);

  return (
    <>
      <h2>Data-List</h2>
      <br />
      <br />
      {iracingdata.map((data, index) => (
        <h3 key={index}>
          {data.position}, {data.name}, {data.points}, {data.clubname},
          {data.countrycode}, {data.avgfinish}, {data.topfive},{data.starts},{" "}
          {data.lapslead}, {data.wins}, {data.incidents},{data.laps},{" "}
          {data.poles}, {data.avgstart}
        </h3>
      ))}
    </>
  );
}
