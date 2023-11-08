import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.data);
    var sql = "SELECT driverName FROM users WHERE custID=?";
    var sql2 = "INSERT INTO users(custID, driverName, country) VALUES(?,?,?)";
    var sql3 = "INSERT INTO AMX0(custID, driverName, finPos) VALUES(?,?,?)";
    var sql4 = "SELECT driverName From AMX0 WHERE custID=?";
    var sql5 =
      "INSERT INTO LogTable(custID, driverName, game, rounds) VALUES(?,?,'AMXZero',?)";
    var sql6 = "SELECT * FROM LogTable WHERE game='AMXZero' AND rounds=?";
    var sql7 = "DELETE FROM LogTable WHERE game='AMXZero' AND rounds=?";
    try {
      //users, amx0 table
      for (var i = 0; i < req.body.data.length; i++) {
        let result = await executeQuery(sql, [req.body.data[i].CustID]);
        if (result.length > 0) {
          console.log("USER에 이미 있음------------------안들어가요");
          //user O, csv O, amx0 X ->들어가야됨
          let result4 = await executeQuery(sql4, [req.body.data[i].CustID]);
          if (result4.length > 0) {
            console.log(
              "USER에 있고,AMX0에도 있어요----------------안들어가요"
            );
          } else {
            console.log(
              "USER에는 있는데, AMX0에는 없어서------------!!!!!!OOOOOO들어가요OOOOOO!!!!"
            );
            let result3 = await executeQuery(sql3, [
              req.body.data[i].CustID,
              req.body.data[i].Name,
              req.body.data[i].FinPos,
            ]);
          }
        } else {
          console.log(
            "USER에 없고,AMX0에도 없음!!!-----!!!!!!OOOOOO들어가요OOOOOO!!!!"
          ); //user X, csv O, amx X
          let result2 = await executeQuery(sql2, [
            req.body.data[i].CustID,
            req.body.data[i].Name,
            req.body.data[i].Club,
          ]);
          let result3 = await executeQuery(sql3, [
            req.body.data[i].CustID,
            req.body.data[i].Name,
            req.body.data[i].FinPos,
          ]);
        }
      }

      //logtable 에서 중복되는 round 확인
      let result = await executeQuery(sql6, [req.body.rounds]);
      //logtable 에서 중복 rounds => 기존 rounds 없애고 새로 넣기
      if (result.length > 0) {
        console.log("테이블 지운다 : rounds = " + req.body.rounds);
        let droptable = await executeQuery(sql7, [req.body.rounds]);
      }
      //log table
      for (var i = 0; i < req.body.data.length; i++) {
        let result = await executeQuery(sql5, [
          req.body.data[i].CustID,
          req.body.data[i].Name,
          req.body.rounds,
        ]);
      }

      return res.redirect(302, "/amx0/q");
    } catch (error) {
      console.log(error);
    }
  }
}
