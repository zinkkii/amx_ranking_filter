import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  var chart_amx10 =
    "SELECT R.rounds, R.custID, R.driverName, " +
    "sum(if(R.category='Q' AND R.finPos=1, 1, 0)  ) AS Q1," +
    "sum(if(R.category='H1' AND R.finPos=1,1,0) ) AS H1, " +
    "sum(if(R.category='H2' AND R.finPos=1,1,0) ) AS H2, " +
    "sum(if(R.category='H1' AND R.fastestPoints=5, 1, 0) ) AS H1fastest, " +
    "sum(if(R.category='H2' AND R.fastestPoints=5, 1, 0) ) AS H2fastest, " +
    "sum(R.points) AS rankingPoints, " +
    "sum(R.fastestPoints) AS fastestPoint ," +
    "sum(IF(R.category='Q' AND R.tier= ? AND R.zoomPoints=1,1,0)) AS zoomCheck ," +
    "I.topDateInfo , I.topCarInfo , I.topTrackInfo " +
    "FROM CsvResult R " +
    "JOIN RoundsInfo I ON (R.rounds=I.rounds AND R.tier = I.tier AND R.game = I.game) " +
    "WHERE R.game='iRacing' AND R.tier= ? AND " +
    "R.custID= ? AND R.rounds= ?";

  var chart_amx0 =
    "SELECT R.rounds, R.custID, R.driverName, " +
    "sum(if(R.category='Q' AND R.finPos=1, 1, 0)  ) AS Q1," +
    "sum(if(R.category='H1' AND R.finPos=1,1,0) ) AS H1, " +
    "sum(if(R.category='H2' AND R.finPos=1,1,0) ) AS H2, " +
    "sum(if(R.category='H1' AND R.fastestPoints=1, 1, 0) ) AS H1fastest, " +
    "sum(if(R.category='H2' AND R.fastestPoints=1, 1, 0) ) AS H2fastest, " +
    "sum(R.points) AS rankingPoints, " +
    "sum(R.fastestPoints) AS fastestPoint ," +
    "sum(IF(R.category='Q' AND R.tier= ? AND R.zoomPoints=1,1,0)) AS zoomCheck ," +
    "I.topDateInfo , I.topCarInfo , I.topTrackInfo " +
    "FROM CsvResult R " +
    "JOIN RoundsInfo I ON (R.rounds=I.rounds AND R.tier = I.tier AND R.game = I.game) " +
    "WHERE R.game='iRacing' AND R.tier= ? AND " +
    "R.custID= ? AND R.rounds= ?";

  try {
    if (req.method === "POST") {
      var result = [];
      if (req.body.tier == "AMX10") {
        for (var i = 0; i < req.body.dataResult.length; i++) {
          let playerSelectChart = await executeQuery(chart_amx10, [
            req.body.tier,
            req.body.tier,
            req.body.dataResult[i].custID,
            req.body.rounds,
          ]);
          result.push(...playerSelectChart);
        }
      } else if (req.body.tier == "AMXZero") {
        for (var i = 0; i < req.body.dataResult.length; i++) {
          let playerSelectChart = await executeQuery(chart_amx0, [
            req.body.tier,
            req.body.tier,
            req.body.dataResult[i].custID,
            req.body.rounds,
          ]);
          result.push(...playerSelectChart);
        }
      }

      return res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
  }
}
