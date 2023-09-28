"use client";
import Layout from "../layouts/layout";
import CsvToJson from "./CsvToJson";
import ReadJson from "./ReadJson";
import ReadJson2 from "./ReadJson2";
import ReadJson3 from "./ReadJson3";
import R1toR2_Q_Elo_Cal_Upload from "./R1toR2_Q_Elo_Cal_Upload";
import R2toR3_Q_Elo_Cal_Upload from "./R2toR3_Q_Elo_Cal_Upload";
export default function Elovalue() {
  return (
    <Layout>
      <h2>EloValue</h2>
      {/* 맨 처음경기(R1 _Q)(초기값 1000) 엘로데이터 계산, 첫번째 JSON 파일로 업로드 */}
      {/* <CsvToJson /> 얘도 업로드 후 주석! */}
      <ReadJson />
      {/* Round2 Q의 Elo계산(R1에서 R2경기로 넘어갈때 중복선수 초기값, Q결과 업데이트 후 json),Json파일로 업로드*/}
      {/* <R1toR2_Q_Elo_Cal_Upload /> 업로드 후 주석! */}
      <ReadJson2 />
      {/* Round3 Q의 Elo계산(R2에서 R3경기로 넘어갈때 중복선수 초기값, Q결과 업데이트 후 json),Json파일로 업로드*/}
      {/* <R2toR3_Q_Elo_Cal_Upload /> 업로드 후 주석! */}
      <ReadJson3 />
    </Layout>
  );
}
