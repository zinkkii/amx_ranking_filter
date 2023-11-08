import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var sql =
      "UPDATE AMX0 SET elo=?, wins=wins+?, finishedRace=finishedRace+1, points=points+? WHERE custID=?";
    var sql2 = "UPDATE AMX0 SET points=points+1 WHERE custID=?";
    var sql3 =
      "UPDATE LogTable SET H2points=?, H2elo=? WHERE rounds=? AND custID=? AND game='AMXZero' ";
    var sql4 =
      "UPDATE LogTable SET H2fastest=1 WHERE custID=? AND rounds=? AND game='AMXZero' ";
    var sql5 =
      "UPDATE LogTable SET zoomBonus=1 WHERE rounds=? AND custID=? AND game='AMXZero' ";
    try {
      for (var i = 0; i < req.body.data.length; i++) {
        // amx_zero table update
        let result = await executeQuery(sql, [
          req.body.data[i].newElo,
          req.body.data[i].winlose,
          req.body.data[i].points,
          req.body.data[i].custID,
        ]);

        // logtable H2
        if (req.body.step === "h2") {
          let result2 = await executeQuery(sql3, [
            req.body.data[i].points,
            req.body.data[i].newElo,
            req.body.rounds,
            req.body.data[i].custID,
          ]);
        }

        //fastest(H1,H2)
        if (
          req.body.fastest != null &&
          req.body.data[i].custID == req.body.fastest
        ) {
          //amxZero points+fastest
          let result3 = await executeQuery(sql2, [req.body.fastest]);

          //logtable h2 fastest
          if (req.body.step === "h2") {
            let result4 = await executeQuery(sql4, [
              req.body.fastest,
              req.body.rounds,
            ]);
          }
        }

        for (var j = 0; j < req.body.arr.length; j++) {
          if (req.body.data[i].custID === req.body.arr[j]) {
            console.log(
              "req.body.data[i].custID:" +
                req.body.data[i].custID +
                ", req.body.arr[j]:" +
                req.body.arr[j]
            );
            //zoom cam user +$1 => amxZero Table upload
            let result5 = executeQuery(sql2, [req.body.arr[j]]);
            console.log("i = " + i + " j = " + j + "zoomBous들어가요!");
            //logtable zoom point upload
            let result6 = executeQuery(sql5, [
              req.body.rounds,
              req.body.arr[j],
            ]);
          }
        }
      }

      return res.redirect(302, "/amx0");
    } catch (error) {
      console.log(error);
    }
  }
}
