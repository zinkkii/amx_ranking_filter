import { executeQuery } from "@/app/DB/db";

export default function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body.data);
    var sql = "INSERT INTO Driver(custID, driverName, country) VALUES(?,?,?)";
    try {
      for (var i = 0; i < req.body.data.length; i++) {
        let result = executeQuery(sql, [
          req.body.data[i].CustID,
          req.body.data[i].Name,
          req.body.data[i].Club,
        ]);
      }
      return res.redirect(302, "/test");
    } catch (error) {
      console.log(error);
    }
  }
}
