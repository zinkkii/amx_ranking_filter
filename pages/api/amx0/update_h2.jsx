import { executeQuery } from "@/app/DB/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    var sql =
      "UPDATE AMX0 SET elo=?, wins=wins+?, finishedRace=finishedRace+1, points=points+? WHERE custID=?";
    var sql2 = "UPDATE AMX0 SET points=points+1 WHERE custID=?";
    try {
      for (var i = 0; i < req.body.data.length; i++) {
        let result = executeQuery(sql, [
          req.body.data[i].newElo,
          req.body.data[i].winlose,
          req.body.data[i].points,
          req.body.data[i].custID,
        ]);
        console.log("elo업데이트---i값은 " + i);
        if (
          req.body.fastest != null &&
          req.body.data[i].custID == req.body.fastest
        ) {
          let result2 = executeQuery(sql2, [req.body.fastest]);
          console.log("fastest 들어가요====i값은" + i);
        }

        for (var j = 0; j < req.body.arr.length; j++) {
          if (req.body.data[i].custID === req.body.arr[j]) {
            console.log(
              "req.body.data[i].custID:" +
                req.body.data[i].custID +
                ", req.body.arr[j]:" +
                req.body.arr[j]
            );
            let result3 = executeQuery(sql2, [req.body.arr[j]]);
            console.log("i = " + i + " j = " + j + "zoomBous들어가요!");
          }
        }
      }

      return res.redirect(302, "/amx0");
    } catch (error) {
      console.log(error);
    }
  }
}
