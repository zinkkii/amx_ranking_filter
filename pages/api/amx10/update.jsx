import { executeQuery } from "@/app/DB/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    var sql =
      "UPDATE AMX10 SET elo=?, wins=wins+?, finishedRace=finishedRace+1, points=points+? WHERE custID=?";
    var sql2 = "UPDATE AMX10 SET points=points+5 WHERE custID=?";
    try {
      for (var i = 0; i < req.body.data.length; i++) {
        let result = executeQuery(sql, [
          req.body.data[i].newElo,
          req.body.data[i].winlose,
          req.body.data[i].points,
          req.body.data[i].custID,
        ]);
        if (
          req.body.fastest != null &&
          req.body.data[i].custID == req.body.fastest
        ) {
          let result2 = executeQuery(sql2, [req.body.fastest]);
        }
      }
      return res.redirect(302, "/amx10");
    } catch (error) {
      console.log(error);
    }
  }
}
