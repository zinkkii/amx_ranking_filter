"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import EloCalculation from "./EloCalculation";

export default function CsvToJson() {
  const [CSVData, setCSVData] = useState([{}]);

  var commonConfig = {
    delimiter: ",",
    header: true,
    dynamicTyping: true,
    //헤더 커스터마이징
    transformHeader: function (header) {
      //헤더 공백 제거
      var removeEmpty = header.split(" ").join("");
      //헤더(Key값) 특수문자 제거( # , % , ( , ) )
      var removesharp = removeEmpty.replace("#", "_");
      var removepercent = removesharp.replace("%", "_");
      var removeR = removepercent.replace("(", "_");
      var result = removeR.replace(")", "_");

      return result;
    },
  };
  // Parse remote CSV file
  function parseCSVData() {
    Papa.parse(
      "https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R1/S3_AMX10_R1_Q.csv",

      {
        ...commonConfig,
        header: true,
        download: true,
        complete: (result) => {
          console.log(result.data);
          setCSVData(result.data);
        },
      }
    );
  }
  useEffect(() => {
    parseCSVData();
  }, []);
  return (
    <>
      <h3>-CSV 파일 Json으로 읽어오기</h3>
      {CSVData.map((data, index) => (
        <p key={index}>
          {data.FinPos}, {data.Name} ,{data.Car}
        </p>
      ))}
      <EloCalculation data={CSVData} />
    </>
  );
}
