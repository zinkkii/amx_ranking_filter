import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  var sql = "SELECT * FROM LogTable WHERE rounds = ? AND game='AMXZero' ";
  if (req.method === "POST") {
    let result = await executeQuery(sql, [req.body.rounds]);
    res.status(200).json(result);
  }
}
