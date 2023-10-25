import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var sql0 = "UPDATE AMX0 SET finPos=null";
    var sql =
      "UPDATE AMX0 SET finPos = CASE WHEN custID = ? THEN ? ELSE finPos END";
    try {
      let finPosSetting = await executeQuery(sql0, []);
      for (var i = 0; i < req.body.data.length; i++) {
        let result = executeQuery(sql, [
          req.body.data[i].CustID,
          req.body.data[i].FinPos,
        ]);
      }
      return res.redirect(302, "/amx0/h");
    } catch (error) {
      console.log(error);
    }
  }
}
