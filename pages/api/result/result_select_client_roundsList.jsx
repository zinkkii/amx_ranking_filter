import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var sql =
      "SELECT * FROM RoundsInfo WHERE game='iRacing' AND tier=? AND showCheck =1 ";
    try {
      let result = await executeQuery(sql, [req.body.tier]);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}
