import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  //CsvResult_TB H1결과 insert
  var insertCsv =
    "INSERT INTO CsvResult" +
    "(game, tier, rounds, category, finPos, custID, driverName, car," +
    "carClass, carSharp, outCheck, intervalvalue, lapsLed, qualifyTime," +
    "averageLapTime, fastestLapTime, fastLap, lapsComp, inc, club, sessionName) " +
    "VALUES" +
    "('iRacing',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  var updateStartElo =
    "UPDATE CsvResult SET startElo = ( SELECT A.newElo FROM (SELECT newElo FROM CsvResult " +
    "WHERE game='iRacing' AND tier=? AND custID=? AND newElo != 0 ORDER BY inputTime DESC LIMIT 1) AS A ) " +
    "WHERE game='iRacing' AND tier=? AND rounds=? AND category='H1' AND custID =?";

  try {
    if (req.method === "POST") {
      for (var i = 0; i < req.body.parseData.length; i++) {
        let insertH1 = await executeQuery(insertCsv, [
          req.body.tier,
          req.body.rounds,
          req.body.category,
          req.body.parseData[i].FinPos,
          req.body.parseData[i].CustID,
          req.body.parseData[i].Name,
          req.body.parseData[i].Car,
          req.body.parseData[i].CarClass,
          req.body.parseData[i].Car_,
          req.body.parseData[i].Out,
          req.body.parseData[i].Interval,
          req.body.parseData[i].LapsLed,
          req.body.parseData[i].QualifyTime,
          req.body.parseData[i].AverageLapTime,
          req.body.parseData[i].FastestLapTime,
          req.body.parseData[i].FastLap_,
          req.body.parseData[i].LapsComp,
          req.body.parseData[i].Inc,
          req.body.parseData[i].Club,
          req.body.parseData[i].SessionName,
        ]);
      }

      for (var i = 0; i < req.body.parseData.length; i++) {
        let setStartElo = await executeQuery(updateStartElo, [
          req.body.tier,
          req.body.parseData[i].CustID,
          req.body.tier,
          req.body.rounds,
          req.body.parseData[i].CustID,
        ]);
      }

      return res.status(200).json("SUCCESS");
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json("FAILED");
  }
}
