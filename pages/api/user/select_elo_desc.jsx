import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let result = await executeQuery(
      "SELECT U.driverName, U.country, A.game, A.tier, A.region, A.elo, A.wins, A.finishedRace " +
        "FROM users as U RIGHT JOIN AMX10 as A ON U.custID = A.custID ORDER BY A.elo desc",
      []
    );
    res.status(200).json(result);
  }
}
