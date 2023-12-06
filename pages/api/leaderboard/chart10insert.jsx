import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var sql =
      "INSERT INTO ClientChart(game, rounds, datetext, car, track) VALUES('AMX10', ?, ?, ?, ?)";
    var sql2 = "SELECT * FROM ClientChart WHERE rounds=? AND game='AMX10' ";
    var sql3 = "DELETE FROM ClientChart WHERE rounds =? AND game ='AMX10' ";
    try {
      let dupleCheck = await executeQuery(sql2, [req.body.rounds]);

      if (dupleCheck.length > 0) {
        // rounds중복시 delete
        await executeQuery(sql3, [req.body.rounds]);
      }

      // insert
      let result = await executeQuery(sql, [
        req.body.rounds,
        req.body.datetime,
        req.body.car,
        req.body.track,
      ]);

      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}
