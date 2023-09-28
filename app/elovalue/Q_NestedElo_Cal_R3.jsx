"use client";

import { useEffect, useState } from "react";
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

export default function Q_NestedElo_Cal_R3(props) {
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

  useEffect(() => {
    //R3_Q의 결과지
    console.log(props.data);
    //R1,R2,R3 다 뛴사람 (Elo값 수정)
    console.log(props.nested);
    //R1, R3만 뛴 사람(Elo값 수정)
    console.log(props.run13);
    //R2, R3만 뛴 사람(Elo값 수정)
    console.log(props.run23);
  });

  var arr = [];
  var updateArr = [];
  const [elodata, setElodata] = useState([{}]);
  const [startEloAvg, setStartEloAvg] = useState(0);

  var temp = 0;
  //참가자 수
  var participants = 0;
  //StartElo
  var firstStartElo = 1000;
  useEffect(() => {
    //참가자 수 계산
    participants = props.data.length - 1;

    for (var i = 0; i < participants; i++) {
      arr.push({
        name: props.data[i].Name,
        startElo: firstStartElo,
        eloDiff: 0,
        odds: 0,
        result: props.data[i].FinPos,
        winlose: 0,
        newElo: 0,
        game: "iracing",
        tier: "AMX 10",
        region: "Global",
      });
    }
    //중복 선수(R1,R2,R2 중복인애들) 추가(startElo 값 가지고 있음)
    for (var i = 0; i < props.nested.length; i++) {
      arr.push(props.nested[i]);
    }
    console.log(arr);
    //중복 선수(R1, R3 만 중복인애들) 추가
    for (var i = 0; i < props.run13.length; i++) {
      arr.push(props.run13[i]);
    }
    console.log(arr);
    //중복 선수(R2, R3 만 중복인 애들) 추가
    for (var i = 0; i < props.run23.length; i++) {
      arr.push(props.run23[i]);
    }
    console.log(arr);

    //중복 선수 추가된 애들 -> 원위치?암튼 result 값 맞추려고 위쪽에다 맞춤
    arr.map((item) => {
      if (
        updateArr.find((object) => {
          if (object.name === item.name) {
            //item->변경값
            console.log(object.name + object.startElo + "," + object.result);
            console.log(item.name + item.startElo + "," + item.result);
            object.startElo = item.newElo;
          }
        })
      ) {
      } else {
        updateArr.push(item);
      }
    });
    console.log(updateArr);
    //추가했던 중복선수들(맨 아래추가된애들) 다시 삭제
    updateArr.splice(
      updateArr.length -
        props.nested.length -
        props.run13.length -
        props.run23.length
    );
    console.log(updateArr);
    setElodata(updateArr);
  }, [props]);

  useEffect(() => {
    for (var i = 0; i < participants; i++) {
      temp = updateArr[i].startElo + temp;
    }
    //Start Elo 총 합
    console.log("StartElo 총 합 : " + temp);
    console.log("참가자 수 : " + participants);
    console.log("StartElo Avg : " + temp / participants);
    setStartEloAvg(temp / participants);

    for (var i = 0; i < participants; i++) {
      //eloDiff 값 계산
      var diffvalue =
        (temp - updateArr[i].startElo) / (participants - 1) -
        updateArr[i].startElo;
      updateArr[i].eloDiff = diffvalue;
      //Odds 값 계산
      var oddsvalue = (1 / (10 ** (diffvalue / 400) + 1)) * (participants - 1);
      updateArr[i].odds = oddsvalue;
      //win & lose계산
      updateArr[i].winlose = participants - updateArr[i].result;
      //new Elo 값 계산
      updateArr[i].newElo =
        updateArr[i].startElo + 16 * (updateArr[i].winlose - oddsvalue);
    }
  }, [props, elodata, setElodata]);

  const s3upload = (data) => {
    console.log(data);
    const stringObject = JSON.stringify(data);
    const params = {
      ACL: "public-read",
      Body: stringObject,
      Bucket: S3_BUCKET,
      Key: "amx/R3/R3_Q_ELO.json",
      CacheControl: "no-cache",
    };
    myBucket.putObject(params).send((err) => {
      if (err) console.log(err);
    });
  };

  return (
    <>
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
              {elodata.map((row, index) => (
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
      {/* <Button //R3_Q_Elo업로드
        onClick={() => {
          s3upload(elodata);
        }}
      >
        upload
      </Button> */}
    </>
  );
}
