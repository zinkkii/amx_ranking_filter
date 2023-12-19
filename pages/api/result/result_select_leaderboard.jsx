import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  var selectTierusers =
    "SELECT DISTINCT custID FROM CsvResult " +
    "WHERE game='iRacing' AND tier=? ";
  var selectAllusers = "SELECT custID from Driver";
  var selectDataAmx10 =
    "SELECT driverName, custID, tier, " +
    "sum(points+fastestPoints) AS sumPoints, " +
    "count(DISTINCT rounds) AS participated," +
    "sum(IF(fastestPoints=5,1,0)) AS sumFastestLaps," +
    "sum(IF(category='Q' AND finPos=1,1,0)) AS sumPolePosition," +
    "sum(IF(category='H1' AND finPos=1,1,0)) AS sumH1heat," +
    "sum(IF(category='H2' AND finPos=1,1,0)) AS sumH2heat " +
    "FROM CsvResult WHERE game='iRacing' AND tier=? AND custID=?";
  var selectDataAmx0 =
    "SELECT driverName, custID, tier, " +
    "sum(points+fastestPoints) AS sumPoints, " +
    "count(DISTINCT rounds) AS participated," +
    "sum(IF(fastestPoints=1,1,0)) AS sumFastestLaps," +
    "sum(IF(category='Q' AND finPos=1,1,0)) AS sumPolePosition," +
    "sum(IF(category='H1' AND finPos=1,1,0)) AS sumH1heat," +
    "sum(IF(category='H2' AND finPos=1,1,0)) AS sumH2heat, " +
    "sum(zoomPoints) AS zoom " +
    "FROM CsvResult WHERE game='iRacing' AND tier=? AND custID=?";
  var selectDataTotal =
    "SELECT driverName, custID, tier, " +
    "sum(points+fastestPoints) AS sumPoints  ," +
    "count(DISTINCT rounds, tier) AS participated, " +
    "( sum(IF(tier='AMX10' AND fastestPoints=5,1,0)) + " +
    "sum(IF(tier='AMXZero' AND fastestPoints=1,1,0)) ) AS sumFastestLaps, " +
    "sum(IF(category='Q' AND finPos=1,1,0)) AS sumPolePosition," +
    "sum(IF(category='H1' AND finPos=1,1,0)) AS sumH1heat," +
    "sum(IF(category='H2' AND finPos=1,1,0)) AS sumH2heat," +
    "sum(zoomPoints) AS zoom " +
    "FROM CsvResult WHERE game='iRacing' AND custID= ?";

  var resData = [];
  try {
    if (req.method === "POST") {
      if (req.body.tier == "AMX10") {
        let AMXTierusers = await executeQuery(selectTierusers, [req.body.tier]);
        for (var i = 0; i < AMXTierusers.length; i++) {
          let result = await executeQuery(selectDataAmx10, [
            req.body.tier,
            AMXTierusers[i].custID,
          ]);

          resData.push(...result);
        }
        res.status(200).json(resData);
      } else if (req.body.tier == "AMXZero") {
        let AMXTierusers = await executeQuery(selectTierusers, [req.body.tier]);
        for (var i = 0; i < AMXTierusers.length; i++) {
          let result = await executeQuery(selectDataAmx0, [
            req.body.tier,
            AMXTierusers[i].custID,
          ]);

          resData.push(...result);
        }
        res.status(200).json(resData);
      } else {
        let AMXallUsers = await executeQuery(selectAllusers, []);
        for (var i = 0; i < AMXallUsers.length; i++) {
          let result = await executeQuery(selectDataTotal, [
            AMXallUsers[i].custID,
          ]);

          resData.push(...result);
        }
        res.status(200).json(resData);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
