"use client";

import axios from "axios";

export default function ListItem({ getdata }) {
  const clickTest = (e) => {
    var idx = 1;
    axios
      .post("/api/test", { idx })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {getdata.map((board, i) => (
        <p key={i}>{board.board_content}</p>
      ))}
      <button onClick={(e) => clickTest(e)}>click</button>
    </>
  );
}
