import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  var sql = "SELECT * FROM LogTable WHERE rounds = ? AND game='AMX10' ";
  if (req.method === "POST") {
    try {
      let result = await executeQuery(sql, [req.body.rounds]);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}
