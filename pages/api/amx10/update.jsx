import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var sql =
      "UPDATE AMX10 SET elo=?, wins=wins+?, finishedRace=finishedRace+1, points=points+? WHERE custID=?";
    var sql2 = "UPDATE AMX10 SET points=points+5 WHERE custID=?";
    var sql3 =
      "UPDATE LogTable SET Qpoints=?, Qelo=? WHERE rounds=? AND custID=? AND game='AMX10' ";
    var sql4 =
      "UPDATE LogTable SET H1points=?, H1elo=? WHERE rounds=? AND custID=? AND game='AMX10' ";
    var sql5 =
      "UPDATE LogTable SET H2points=?, H2elo=? WHERE rounds=? AND custID=? AND game='AMX10' ";
    var sql6 =
      "UPDATE LogTable SET H1fastest=5 WHERE custID=? AND rounds=? AND game='AMX10' ";
    var sql7 =
      "UPDATE LogTable SET H2fastest=5 WHERE custID=? AND rounds=? AND game='AMX10' ";
    try {
      for (var i = 0; i < req.body.data.length; i++) {
        // amx10
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
        // logtable H2
        if (req.body.step === "h2") {
          let result2 = await executeQuery(sql5, [
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
          //amx10 point+fastestpoint
          let result2 = await executeQuery(sql2, [req.body.fastest]);

          //logtable h1 fastest
          if (req.body.step === "h1") {
            let result3 = await executeQuery(sql6, [
              req.body.fastest,
              req.body.rounds,
            ]);
          }
          //logtable h2 fastest
          if (req.body.step === "h2") {
            let result3 = await executeQuery(sql7, [
              req.body.fastest,
              req.body.rounds,
            ]);
          }
        }
      }
      return res.redirect(302, "/amx10");
    } catch (error) {
      console.log(error);
    }
  }
}
