import { executeQuery } from "@/app/DB/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.data);
    var sql = "INSERT INTO users(custID, driverName, country) VALUES(?,?,?)";
    var sql2 = "INSERT INTO AMX10(custID, driverName) VALUES(?,?)";
    try {
      //user 테이블에 유저정보 --INSERT
      for (var i = 0; i < req.body.data.length; i++) {
        let result = executeQuery(sql, [
          req.body.data[i].CustID,
          req.body.data[i].Name,
          req.body.data[i].Club,
        ]);
      }
      for (var i = 0; i < req.body.data.length; i++) {
        let result = executeQuery(sql2, [
          req.body.data[i].CustID,
          req.body.data[i].Name,
        ]);
      }
      return res.redirect(302, "/test");
    } catch (error) {
      console.log(error);
    }
  }
}
