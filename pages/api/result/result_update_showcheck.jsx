import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var updateSql =
      "UPDATE RoundsInfo SET showCheck = ? " + "WHERE rounds = ? AND tier = ?";
    try {
      let updateShowCheck = await executeQuery(updateSql, [
        req.body.tempnum,
        req.body.rounds,
        req.body.tier,
      ]);
      res.status(200).json(updateShowCheck);
    } catch (error) {
      console.log(error);
      res.status(200).json("FAILED...");
    }
  }
}
