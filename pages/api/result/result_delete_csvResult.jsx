import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var roundsInfoDelete = "DELETE FROM RoundsInfo WHERE tier=? AND rounds=? ";
    var csvResultDelete = "DELETE FROM CsvResult WHERE tier=? AND rounds=? ";
    try {
      let delete1 = await executeQuery(roundsInfoDelete, [
        req.body.tier,
        req.body.rounds,
      ]);
      let delete2 = await executeQuery(csvResultDelete, [
        req.body.tier,
        req.body.rounds,
      ]);
      res.status(200).json("Deleteed");
    } catch (error) {
      console.log(error);
      res.status(200).json("FAILED...");
    }
  }
}
