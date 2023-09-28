"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import Q_NestedElo_Cal from "./Q_NestedElo_Cal";

const queryClient = new QueryClient();

export default function Test() {
  const [arr, setArr] = useState([{}]);
  const [arr2, setArr2] = useState([{}]);
  const [nested, setNested] = useState([{}]);

  const getR1Player = (x) => {
    //console.log(x);
    setArr(x);
  };
  const getR2Player = (y) => {
    //console.log(y);
    setArr2(y);
  };
  useEffect(() => {
    // console.log(arr);
    // console.log(arr2);

    //배열1,2비교, 중복선수 찾기
    const result = arr.filter(
      (x) => arr2.filter((y) => y.Name === x.name).length > 0
    );
    // console.log(result);
    setNested(result);
  }, [arr, arr2]);
  return (
    <QueryClientProvider client={queryClient}>
      <h3>
        {" "}
        R1,R2 경기 중복 선수 찾기 / 중복되는 선수의 StartElo 를 가장 최근 경기의
        NewElo값 으로 수정
      </h3>
      <R1_Player getR1Player={getR1Player} />
      <R2_Player getR2Player={getR2Player} />
      {/* 중복 선수 리스트 => 이거 props로 보내서 Elo계산할때 적용시키기 */}
      {nested.map((row, index) => (
        <p key={index}>
          {row.name}, {row.newElo}
        </p>
      ))}
      {/* 여기가 Q(맨처음경기) 의 Elo값 계산하는곳인데 props로 받아서 중복선수들만 startElo변경  */}
      {/* nested = 중복되는 선수들 데이터, data = csv파일(R2_Q경기 결과지) 읽어온 데이터 */}
      <Q_NestedElo_Cal nested={nested} data={arr2} />
    </QueryClientProvider>
  );
}

function R1_Player({ getR1Player }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getR1_Player"],
    queryFn: () =>
      fetch(
        "https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R1/R1_H2_ELO.json" //R1_H2_ELO 읽기
      ).then((res) => res.json()),
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  getR1Player(data); //부모컴포넌트로 data보내기

  return <></>;
}

function R2_Player({ getR2Player }) {
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
  // CSV -> JSON
  function parseCSVData() {
    Papa.parse(
      "https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R2/S3_AMX10_R2_Q.csv",
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

  getR2Player(CSVData); //부모컴포넌트로 data보내기

  return <></>;
}
