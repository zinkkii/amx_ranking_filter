import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let result = await executeQuery(
      "SELECT * FROM AMX10 UNION SELECT * FROM AMX0 Order by elo desc",
      []
    );
    res.status(200).json(result);
  }
}
