import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.data);
    //var sql = "INSERT INTO Driver(custID, driverName, country) VALUES(?,?,?)";
    var sql = "SELECT driverName FROM users WHERE custID=?";
    var sql2 = "INSERT INTO users(custID, driverName, country) VALUES(?,?,?)";
    var sql3 = "INSERT INTO AMX0(custID, driverName) VALUES(?,?)";
    var sql4 = "SELECT driverName From AMX0 WHERE custID=?";
    try {
      for (var i = 0; i < req.body.data.length; i++) {
        let result = await executeQuery(sql, [req.body.data[i].CustID]);
        if (result.length > 0) {
          console.log("Nested Data----------일단 유저에는 있어요");
          //user O, csv O, amxzero X ->들어가야됨
          let result4 = await executeQuery(sql4, [req.body.data[i].CustID]);
          if (result4.length > 0) {
            console.log("진짜 안들어가요-----AMX0에도 있어요");
          } else {
            console.log("USER에는 있고, AMX0에는 없어서 들어가요!!!!");
            let result3 = executeQuery(sql3, [
              req.body.data[i].CustID,
              req.body.data[i].Name,
            ]);
          }
        } else {
          console.log("Not Nested Data---------INSERT---들어가요~~~~~~~!"); //user X, csv O, amx X
          let result2 = await executeQuery(sql2, [
            req.body.data[i].CustID,
            req.body.data[i].Name,
            req.body.data[i].Club,
          ]);
          let result3 = executeQuery(sql3, [
            req.body.data[i].CustID,
            req.body.data[i].Name,
          ]);
        }
      }
      return res.redirect(302, "/test");
    } catch (error) {
      console.log(error);
    }
  }
}
