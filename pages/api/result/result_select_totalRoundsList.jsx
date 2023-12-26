import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  var selectRoundsList =
    "SELECT rounds FROM CsvResult " +
    "WHERE tier=? AND custID=? " +
    "GROUP BY rounds";

  if (req.method === "POST") {
    try {
      var result = [];
      if (req.body.tier === "AMX10") {
        let roundsList = await executeQuery(selectRoundsList, [
          req.body.tier,
          req.body.driverID,
        ]);
        result.push(...roundsList);
      } else if (req.body.tier === "AMXZero") {
        let roundsList = await executeQuery(selectRoundsList, [
          req.body.tier,
          req.body.driverID,
        ]);
        result.push(...roundsList);
      }
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}
