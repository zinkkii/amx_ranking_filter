import { executeQuery } from "../DB/db";
import ListItem from "./ListItem";

export default async function Test() {
  let testdata = await executeQuery("SELECT * FROM board", []);
  let getdata = JSON.parse(JSON.stringify(testdata));
  return (
    <>
      <h2>TEST</h2>
      <ListItem getdata={getdata} />
    </>
  );
}
