import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      var insertRoundsInfo =
        "INSERT INTO RoundsInfo(game, tier, rounds, topDateInfo, topCarInfo, topTrackInfo) " +
        "VALUES('iRacing',?,?,?,?,?) ";
      let result = executeQuery(insertRoundsInfo, [
        req.body.tier,
        req.body.rounds,
        req.body.datetime,
        req.body.car,
        req.body.track,
      ]);
      return res.status(200).json("SUCCESS");
    } catch (err) {
      console.log(err);
      return res.status(200).json("Failed");
    }
  }
}
