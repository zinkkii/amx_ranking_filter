import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  var sql = "SELECT custID FROM users";
  var sql2 =
    "SELECT custID, driverName, " +
    "sum(Qpoints+H1points+H2points+H1fastest+H2fastest+zoomBonus) AS points ," +
    "sum( CASE WHEN rounds=NULL THEN 0 ELSE 1 END ) AS participated " +
    "FROM LogTable WHERE custID = ? ";
  var result3 = [];

  if (req.method === "POST") {
    let result = await executeQuery(sql, []);

    for (var i = 0; i < result.length; i++) {
      let result2 = await executeQuery(sql2, [result[i].custID]);
      result3.push(...result2);
    }
    res.status(200).json(result3);
  }
}
