import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var sql = "SELECT * FROM AdminLogin WHERE id=? AND pw=?";
    try {
      let result = await executeQuery(sql, [
        req.body.data.id,
        req.body.data.pw,
      ]);
      if (result.length > 0) {
        console.log("LOGIN SUCCESS----");
        return res.send(true);
      } else {
        console.log("LOGIN ERROR------");
        return res.send(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
