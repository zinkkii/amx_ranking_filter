import { executeQuery } from "@/app/DB/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    var sql =
      "UPDATE AMX0 SET elo=? , wins = wins + ?, finishedRace= finishedRace + ? WHERE custID=?";
    try {
      for (var i = 0; i < req.body.data.length; i++) {
        let result = executeQuery(sql, [
          req.body.data[i].newElo,
          req.body.data[i].winlose,
          req.body.data.length - 1,
          req.body.data[i].custID,
        ]);
      }
      return res.redirect(302, "/test");
    } catch (error) {
      console.log(error);
    }
  }
}