import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  var selectData =
    "SELECT ( SELECT count(*)/3 FROM CsvResult WHERE tier=? AND rounds=? ) AS participated, " +
    "category,finPos,points, fastestPoints,inputTime FROM CsvResult " +
    "WHERE tier=? AND rounds=? AND custID=? ";

  if (req.method === "POST") {
    try {
      var result = [];
      if (req.body.tier === "AMX10") {
        let dataList = await executeQuery(selectData, [
          req.body.tier,
          req.body.rounds,
          req.body.tier,
          req.body.rounds,
          req.body.custID,
        ]);
        result.push(...dataList);
      } else if (req.body.tier === "AMXZero") {
        let dataList = await executeQuery(selectData, [
          req.body.tier,
          req.body.rounds,
          req.body.tier,
          req.body.rounds,
          req.body.custID,
        ]);
        result.push(...dataList);
      }
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}
