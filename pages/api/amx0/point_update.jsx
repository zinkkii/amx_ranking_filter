import { executeQuery } from "@/app/DB/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    var sql = "UPDATE AMX0 SET points = points + ? WHERE custID =?";
    try {
      for (var i = 0; i < req.body.dollar.length; i++) {
        let result = executeQuery(sql, [
          req.body.dollar[i].points,
          req.body.data[i].CustID,
        ]);
      }
      return res.redirect(302, "/test");
    } catch (error) {
      console.log(error);
    }
  }
}
