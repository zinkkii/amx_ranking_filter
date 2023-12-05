import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  var selectElo =
    "SELECT * FROM CsvResult WHERE game='iRacing' " +
    "AND tier=? AND category=? AND rounds=?";
  try {
    if (req.method === "POST") {
      let result = await executeQuery(selectElo, [
        req.body.tier,
        req.body.category,
        req.body.rounds,
      ]);
      return res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json("FAILED");
  }
}
