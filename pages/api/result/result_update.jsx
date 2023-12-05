import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  var updateNewElo =
    "UPDATE CsvResult SET newElo=? , points=? WHERE custID=? " +
    "AND game='iRacing' AND tier=? AND rounds=? AND category=? ";
  var updateAmx10Fastest =
    "UPDATE CsvResult SET fastestPoints = 5 Where custID=? " +
    "AND game='iRacing' AND tier=? AND rounds=? AND category=? ";
  try {
    if (req.method === "POST") {
      for (var i = 0; i < req.body.elodata.length; i++) {
        let update = await executeQuery(updateNewElo, [
          req.body.elodata[i].newElo,
          req.body.elodata[i].points,
          req.body.elodata[i].custID,
          req.body.tier,
          req.body.rounds,
          req.body.category,
        ]);
        if (req.body.elodata[i].custID == req.body.fastest) {
          let fastestUpdate = await executeQuery(updateAmx10Fastest, [
            req.body.elodata[i].custID,
            req.body.tier,
            req.body.rounds,
            req.body.category,
          ]);
        }
      }
      return res.status(200).json("SUCCESS");
    }
  } catch (error) {
    console.log(error);
  }
}
