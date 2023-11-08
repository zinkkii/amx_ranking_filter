import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var sql =
      "UPDATE AMX0 SET elo=?, wins=wins+?, finishedRace=finishedRace+1, points=points+? WHERE custID=?";
    var sql2 = "UPDATE AMX0 SET points=points+1 WHERE custID=?";
    var sql3 =
      "UPDATE LogTable SET Qpoints=?, Qelo=? WHERE rounds=? AND custID=? AND game='AMXZero' ";
    var sql4 =
      "UPDATE LogTable SET H1points=?, H1elo=? WHERE rounds=? AND custID=? AND game='AMXZero' ";
    var sql6 =
      "UPDATE LogTable SET H1fastest=1 WHERE custID=? AND rounds=? AND game='AMXZero' ";

    try {
      for (var i = 0; i < req.body.data.length; i++) {
        // amx_zero
        let result = await executeQuery(sql, [
          req.body.data[i].newElo,
          req.body.data[i].winlose,
          req.body.data[i].points,
          req.body.data[i].custID,
        ]);
        // logtable Q
        if (req.body.step === "q") {
          let result2 = await executeQuery(sql3, [
            req.body.data[i].points,
            req.body.data[i].newElo,
            req.body.rounds,
            req.body.data[i].custID,
          ]);
        }
        // logtable H1
        if (req.body.step === "h1") {
          let result2 = await executeQuery(sql4, [
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
          let result2 = await executeQuery(sql2, [req.body.fastest]);

          //logtable h1 fastest
          if (req.body.step === "h1") {
            let result3 = await executeQuery(sql6, [
              req.body.fastest,
              req.body.rounds,
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
