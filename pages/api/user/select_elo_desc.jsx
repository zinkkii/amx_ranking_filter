import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var sql =
      "select * from users JOIN AMX10 on AMX10.custID = users.custID UNION " +
      "select * from users JOIN AMX0 on AMX0.custID = users.custID Order by elo DESC";
    let result = await executeQuery(sql, []);
    res.status(200).json(result);
  }
}
