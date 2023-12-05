import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var dupleCheck = "SELECT driverName FROM Driver WHERE custID = ?";
    var insertUser =
      "INSERT INTO Driver(custID, driverName, country) VALUES(?,?,?)";
    try {
      for (var i = 0; i < req.body.data.length; i++) {
        //DriverTB user중복체크
        let result = await executeQuery(dupleCheck, [req.body.data[i].CustID]);
        if (result.length == 0) {
          //user중복X
          let insert = await executeQuery(insertUser, [
            req.body.data[i].CustID,
            req.body.data[i].Name,
            req.body.data[i].Club,
          ]);
        } else {
          //user중복O
          console.log(result);
        }
      }
      return res.status(200).json("SUCCESS");
    } catch (error) {
      console.log(error);
    }
  }
}
