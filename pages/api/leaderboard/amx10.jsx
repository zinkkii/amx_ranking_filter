import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  var sql = "SELECT custID from AMX10";
  var sql2 =
    "SELECT custID, driverName," +
    "sum(Qpoints+H1points+H2points+H1fastest+H2fastest) AS points ," +
    "sum( CASE WHEN rounds=NULL THEN 0 ELSE 1 END ) AS participated, " +
    "sum(CASE WHEN Qresult = 1 THEN 1 ELSE 0 END ) AS polePositions, " +
    "(sum(CASE WHEN H1result=1 THEN 1 ELSE 0 END )+sum(CASE WHEN H2result=1 THEN 1 ELSE 0 END )) AS heatWins," +
    "(sum(CASE WHEN H1fastest = 5 THEN 1 ELSE 0 END )+sum(CASE WHEN H2fastest = 5 THEN 1 ELSE 0 END )) AS fastestLaps " +
    "FROM LogTable WHERE game='AMX10' AND custID= ? ";
  var result3 = [];
  if (req.method === "POST") {
    let result = await executeQuery(sql, []);
    //console.log(result);
    for (var i = 0; i < result.length; i++) {
      //console.log(result[i].custID);
      let result2 = await executeQuery(sql2, [result[i].custID]);
      result3.push(...result2);
    }
    res.status(200).json(result3);
  }
}
