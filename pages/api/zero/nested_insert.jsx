import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.data);
    //var sql = "INSERT INTO Driver(custID, driverName, country) VALUES(?,?,?)";
    var sql = "SELECT driverName FROM users WHERE custID=?";
    var sql2 = "INSERT INTO users(custID, driverName, country) VALUES(?,?,?)";
    var sql3 = "INSERT INTO AMX0(custID, driverName) VALUES(?,?)";
    try {
      for (var i = 0; i < req.body.data.length; i++) {
        let result = await executeQuery(sql, [req.body.data[i].CustID]);
        if (result.length > 0) {
          console.log("Nested Data----------NO INSERT---안들어가요~~~~~");
        } else {
          console.log("Not Nested Data---------INSERT---들어가요~~~~~~~!");
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
