import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    //var sql = "select * from AMX10 left join users on AMX10.custID=users.custID union select * from AMX10 right join users on AMX10.custID=users.custID"
    var sql = "SELECT * FROM AMX10 ORDER BY elo desc";
    let result = await executeQuery(sql, []);
    res.status(200).json(result);
  }
}
