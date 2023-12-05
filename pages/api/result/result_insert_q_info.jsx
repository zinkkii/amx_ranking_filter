import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  //CsvResult_TB 에서 처음참가자/중복참가자 Check
  var selectDuple =
    "SELECT * FROM CsvResult WHERE game='iRacing' " +
    "AND tier= ? AND category= 'Q' AND custID =? ";

  //CsvResult_TB 에서 처음참가자의 startElo=1000
  var startEloSet =
    "UPDATE CsvResult SET startElo=1000 WHERE game='iRacing' " +
    "AND tier=? AND category='Q' AND custID=? AND rounds=?";

  //CsvResult_TB 에서 중복참가자의 이전참가rounds, 그 rounds의 h2의 newElo값 구하기
  var dupleUserRoundsEloSelect =
    "SELECT rounds, newElo, driverName, custID FROM CsvResult " +
    "WHERE game='iRacing' AND tier=? AND custID = ? AND rounds != ? AND newElo != 0 " +
    "ORDER BY rounds DESC, inputTime DESC LIMIT 1";

  //CsvResult_TB 에서 중복참가자의 startElo=(이전 참가 rounds의 newElo)
  var setDupleUserElo =
    "UPDATE CsvResult SET startElo = ? WHERE game='iRacing' " +
    "AND tier=? AND category='Q' AND custID= ? AND rounds=?";

  //CsvResult 읽어온 데이터 INSERT
  var insertCsv =
    "INSERT INTO CsvResult" +
    "(game, tier, rounds, category, finPos, custID, driverName, car," +
    "carClass, carSharp, outCheck, intervalvalue, lapsLed, qualifyTime," +
    "averageLapTime, fastestLapTime, fastLap, lapsComp, inc, club, sessionName) " +
    "VALUES" +
    "('iRacing',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  if (req.method === "POST") {
    try {
      for (var i = 0; i < req.body.parseData.length; i++) {
        let insertQ = await executeQuery(insertCsv, [
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
        let dupleCheck = await executeQuery(selectDuple, [
          req.body.tier,
          req.body.parseData[i].CustID,
        ]);
        if (dupleCheck.length == 1) {
          console.log(
            "처음참가자임 startElo=1000 , DriverName" +
              req.body.parseData[i].Name
          );
          let setFirstUserElo = await executeQuery(startEloSet, [
            req.body.tier,
            req.body.parseData[i].CustID,
            req.body.rounds,
          ]);
        } else {
          console.log("두번이상 참가자임 startElo = 이전 라운드 newElo값");

          //이전경기 어느라운드인지, 해당라운드의 h2의 newElo값 몇인지
          let selectBeforeEloResult = await executeQuery(
            dupleUserRoundsEloSelect,
            [req.body.tier, req.body.parseData[i].CustID, req.body.rounds]
          );
          //H2의 newElo값
          if (selectBeforeEloResult.length > 0) {
            var h2NewElo = selectBeforeEloResult[0].newElo;
            //두번이상 참가자 startElo = 이전 라운드 h2의 newElo값으로 update
            let dupleUserEloSet = await executeQuery(setDupleUserElo, [
              h2NewElo,
              req.body.tier,
              req.body.parseData[i].CustID,
              req.body.rounds,
            ]);
          }
        }
      }
      return res.status(200).json("SUCCESS");
    } catch (error) {
      console.log(error);
      return res.status(200).json("FAILED");
    }
  }
}
