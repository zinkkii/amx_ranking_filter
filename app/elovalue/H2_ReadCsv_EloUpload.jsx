"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import eloheader from "../elo_table_header/eloheader";
import { Button } from "@mui/material";
import AWS from "aws-sdk";

export default function H2_ReadCsv_EloUpload(props) {
  //S3
  const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_KEY;
  const REGION = process.env.NEXT_PUBLIC_AWS_REGION;
  const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });
  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  //csv to json 변환 데이터 담을곳
  var arr = [];
  //새로운 elo값 계산 위해 필요한 데이터 뽑은거 담을곳(result(등수),Name,누적된 StartElo)
  const [newArr, setNewArr] = useState([{}]);
  const [CSVData, setCSVData] = useState([{}]);
  //최종 elo data 담을곳
  const [elodataResult, setElodataResult] = useState([{}]);
  var eloResult = [];
  //CSV파일 변환 세팅
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
  // csv to json 변환
  function parseCSVData() {
    Papa.parse(
      "https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R1/S3_AMX10_R1_H2.csv", //R1_H2
      //"https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R2/S3_AMX10_R2_H2.csv", //R2_H2
      {
        ...commonConfig,
        header: true,
        download: true,
        complete: (result) => {
          for (var i = 0; i < result.data.length - 1; i++) {
            arr.push(result.data[i]);
            //console.log(arr[i].Name);
          }
          setCSVData(arr);
          //경기 결과지_참가자 이름순정렬
          const result1 = arr.sort((a, b) =>
            a.Name.toLowerCase() < b.Name.toLowerCase() ? -1 : 1
          );
          console.log(result1);
          //전 경기 Elo값 결과지 _ 참가자 이름순 정렬
          const result2 = props.data.sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
          );
          console.log(result2);

          //배열생성(이름, 등수, 해당선수 Elo값)
          const tempArr = [];
          for (var i = 0; i < result2.length; i++) {
            tempArr.push({
              name: result1[i].Name,
              resultvalue: result1[i].FinPos,
              startElo: result2[i].newElo,
            });
          }
          //최종 뽑은데이터(이름,Result(등수),누적된 StartElo 값)
          const arrr = tempArr.sort((a, b) => a.resultvalue - b.resultvalue);
          setNewArr(arrr);
        },
      }
    );
  }

  //참가자 수
  var participants = 0;

  useEffect(() => {
    parseCSVData(); //csv to json변환함수
  }, []);

  useEffect(() => {
    //console.log(newArr);

    //참가자수
    participants = newArr.length;
    var temp = 0;
    for (var i = 0; i < participants; i++) {
      temp = newArr[i].startElo + temp;
    }

    for (var i = 0; i < participants; i++) {
      //eloDiff 값 계산
      var diffvalue =
        (temp - newArr[i].startElo) / (participants - 1) - newArr[i].startElo;
      //console.log(diffvalue);
      //Odds 값 계산
      var oddsvalue = (1 / (10 ** (diffvalue / 400) + 1)) * (participants - 1);
      //console.log(oddsvalue);
      //win & lose 계산
      var winlose = participants - newArr[i].resultvalue;
      //new Elo 값 계산
      var newElo = newArr[i].startElo + 16 * (winlose - oddsvalue);

      //eloResult(최종계산)
      eloResult.push({
        name: newArr[i].name,
        startElo: newArr[i].startElo,
        eloDiff: diffvalue,
        odds: oddsvalue,
        result: newArr[i].resultvalue,
        winlose: winlose,
        newElo: newElo,
        game: "iracing",
        tier: "AMX 10",
        region: "Global",
      });
    }

    //console.log(eloResult);
    setElodataResult(eloResult);
  }, [CSVData]);

  const s3upload = (data) => {
    //console.log(data);
    const stringObject = JSON.stringify(data);
    const params = {
      ACL: "public-read",
      Body: stringObject,
      Bucket: S3_BUCKET,
      Key: "amx/R1/R1_H2_ELO.json", //R1_H2
      //Key: "amx/R2/R2_H2_ELO.json", //R2_H2
      CacheControl: "no-cache",
    };
    myBucket.putObject(params).send((err) => {
      if (err) console.log(err);
    });
  };

  return (
    <>
      <h2>R1_H2_Elo</h2>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {eloheader.map((row, index) => (
                  <TableCell
                    key={index}
                    sx={{ fontFamily: "Kanit", fontWeight: "900" }}
                  >
                    <b>{row.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {elodataResult.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ fontFamily: "Kanit" }}>{row.name}</TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.startElo}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.eloDiff}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>{row.odds}</TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.result}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.winlose}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.newElo}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* <Button
        onClick={() => {
          s3upload(elodataResult);
        }}
      >
        upload
      </Button> */}
    </>
  );
}
