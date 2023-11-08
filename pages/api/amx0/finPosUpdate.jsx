import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var sql0 = "UPDATE AMX0 SET finPos=null";
    var sql =
      "UPDATE AMX0 SET finPos = CASE WHEN custID = ? THEN ? ELSE finPos END";
    var sql2 =
      "UPDATE LogTable SET Qresult= ? WHERE rounds = ? AND custID = ? AND game='AMXZero' ";
    var sql3 =
      "UPDATE LogTable SET H1result= ? WHERE rounds = ? AND custID = ? AND game='AMXZero'";
    var sql4 =
      "UPDATE LogTable SET H2result= ? WHERE rounds = ? AND custID = ? AND game='AMXZero'";
    try {
      //finPos all null
      let finPosSetting = await executeQuery(sql0, []);
      //finPos update (AMX0)
      for (var i = 0; i < req.body.data.length; i++) {
        let result = await executeQuery(sql, [
          req.body.data[i].CustID,
          req.body.data[i].FinPos,
        ]);
      }
      //finPos -> (logtable) insert
      if (req.body.step === "q") {
        for (var i = 0; i < req.body.data.length; i++) {
          let result = await executeQuery(sql2, [
            req.body.data[i].FinPos,
            req.body.rounds,
            req.body.data[i].CustID,
          ]);
        }
      }
      if (req.body.step === "h1") {
        for (var i = 0; i < req.body.data.length; i++) {
          let result = await executeQuery(sql3, [
            req.body.data[i].FinPos,
            req.body.rounds,
            req.body.data[i].CustID,
          ]);
        }
      }
      if (req.body.step === "h2") {
        for (var i = 0; i < req.body.data.length; i++) {
          let result = await executeQuery(sql4, [
            req.body.data[i].FinPos,
            req.body.rounds,
            req.body.data[i].CustID,
          ]);
        }
      }
      return res.redirect(302, "/amx0");
    } catch (error) {
      console.log(error);
    }
  }
}
