"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import Q_NestedElo_Cal_R3 from "./Q_NestedElo_Cal_R3";

const queryClient = new QueryClient();

export default function Test() {
  const [arr, setArr] = useState([{}]);
  const [arr2, setArr2] = useState([{}]);
  const [arr3, setArr3] = useState([{}]);

  //1,2,3번 중복
  const [nested_123, setNested123] = useState([{}]);
  //2,3번 중복
  const [nested_12, setNested12] = useState([{}]);
  //1,3번 중복
  const [nested_13, setNested13] = useState([{}]);
  //1,3 만 뛴사람
  const [run13, setRun13] = useState([{}]);
  //2,3 만 뛴사람
  const [run23, setRun23] = useState([{}]);

  const getR1Player = (x) => {
    //console.log(x);
    setArr(x);
  };
  const getR2Player = (y) => {
    //console.log(y);
    setArr2(y);
  };
  const getR3Player = (z) => {
    //console.log(z);
    setArr3(z);
  };
  useEffect(() => {
    //console.log(arr);
    //console.log(arr2);
    //console.log(arr3);

    //배열2,3비교, 중복선수 찾기
    const result2 = arr2.filter(
      (y) => arr3.filter((z) => z.Name === y.name).length > 0
    );
    console.log("경기2,3 비교 중복선수"); // R2 O, R3 O
    console.log(result2);
    setNested12(result2);

    //배열1,3비교, 중복선수 찾기
    const result3 = arr.filter(
      (x) => arr3.filter((z) => z.Name === x.name).length > 0
    );
    console.log("경기1,3 비교 중복선수"); //R1 O, R3 O
    console.log(result3);
    setNested13(result3);
    //경기R2,R3 뛴사람, R1,R3 뛴사람 중에서 R1,R2,R3 모두 뛴사람 중복찾기
    const result4 = result2.filter(
      (a) => result3.filter((b) => a.name === b.name).length > 0
    );
    console.log("경기1,2,3 모두 중복//startElo값 업데이트 /우선순위1");
    console.log(result4);
    //2,3중복에서 1,2,3중복 제거=>2,3만 뛴사람
    const run23_ = result2.filter((x) => {
      return !result4.some((y) => y.name === x.name);
    });
    console.log("2,3만 뛴 사람//startElo값 업데이트 ");
    setRun23(run23_);
    //1,3중복에서 1,2,3중복 제거 => 1,3만 뛴사람
    const run13_ = result3.filter((x) => {
      return !result4.some((y) => y.name === x.name);
    });
    console.log("1,3만 뛴 사람//startElo값 업데이트 ");
    setRun13(run13_);

    setNested123(result4);
  }, [arr, arr2, arr3, setRun23, setRun13]);
  return (
    <QueryClientProvider client={queryClient}>
      <R1_Player getR1Player={getR1Player} />
      <R2_Player getR2Player={getR2Player} />
      <R3_Player getR3Player={getR3Player} />
      {/* 중복 선수 리스트 => 이거 props로 보내서 Elo계산할때 적용시키기 */}
      <h3>R1,R2,R3 경기 중복 선수</h3>
      {nested_123.map((row, index) => (
        <p key={index}>
          {row.name}, {row.newElo}
        </p>
      ))}
      <h3>R2,R3 경기 중복 선수</h3>
      {nested_12.map((row, index) => (
        <p key={index}>
          {row.name},{row.newElo}
        </p>
      ))}
      <h3>R1,R3 경기 중복 선수</h3>
      {nested_13.map((row, index) => (
        <p key={index}>
          {row.name}, {row.newElo}
        </p>
      ))}
      {/* 여기가 Q(맨처음경기) 의 Elo값 계산하는곳인데 props로 받아서 중복선수들만 startElo변경  */}
      {/* nested = 중복되는 선수들 데이터, data = csv파일(R2_Q경기 결과지) 읽어온 데이터 */}
      <Q_NestedElo_Cal_R3
        nested={nested_123}
        data={arr3}
        run13={run13}
        run23={run23}
      />
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
  const { isLoading, error, data } = useQuery({
    queryKey: ["getR2_Player"],
    queryFn: () =>
      fetch(
        "https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R2/R2_H2_ELO.json" //R2_H2_ELO 읽기
      ).then((res) => res.json()),
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  getR2Player(data); //부모컴포넌트로 data보내기

  return <></>;
}

function R3_Player({ getR3Player }) {
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
      "https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R3/S3_AMX10_R3_Q.csv", //R3_Q 결과지
      {
        ...commonConfig,
        header: true,
        download: true,
        complete: (result) => {
          //console.log(result.data);
          setCSVData(result.data);
        },
      }
    );
  }
  useEffect(() => {
    parseCSVData();
  }, []);

  getR3Player(CSVData); //부모컴포넌트로 data보내기

  return <></>;
}
