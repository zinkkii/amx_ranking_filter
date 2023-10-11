import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let result = await executeQuery(
      "select * from AMX10 JOIN users on AMX10.custID = users.custID UNION select * from AMX0 JOIN users on AMX0.custID = users.custID Order by elo desc",
      []
    );
    res.status(200).json(result);
  }
}
