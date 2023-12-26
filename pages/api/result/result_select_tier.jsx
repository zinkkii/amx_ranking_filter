import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  var selectRoundsList =
    "SELECT tier FROM CsvResult " + "WHERE custID=? " + "GROUP BY tier";

  if (req.method === "POST") {
    try {
      var result = [];
      let roundsList = await executeQuery(selectRoundsList, [
        req.body.driverID,
      ]);
      result.push(...roundsList);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }
}
