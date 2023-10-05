import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const sql = "SELECT * FROM board WHERE board_id=?";
    var board_id = req.body.idx;
    console.log("----------jjjjjjjj");
    console.log(board_id);
    try {
      let result = await executeQuery(sql, [board_id]);
      console.log(result);
      return res.send(result);
    } catch (err) {
      console.log(err);
    }
  }
}
