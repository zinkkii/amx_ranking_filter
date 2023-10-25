import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let result = [];
    let result2 = [];
    for (var i = 0; i < req.body.data.length; i++) {
      result = await executeQuery("SELECT * FROM AMX10 WHERE custID=?", [
        req.body.data[i].CustID,
      ]);
      result2.push(...result);
    }
    res.status(200).json(result2);
  }
}
