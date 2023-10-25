import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let result = await executeQuery(
      "SELECT * FROM AMX0  WHERE finPos>0 ORDER BY finPos ASC;",
      []
    );
    res.status(200).json(result);
  }
}
