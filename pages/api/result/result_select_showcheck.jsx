import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var sql = "SELECT showCheck FROM RoundsInfo WHERE rounds= ? AND tier = ?";
    try {
      let result = await executeQuery(sql, [req.body.rounds, req.body.tier]);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(200).json("FAILED...");
    }
  }
}
