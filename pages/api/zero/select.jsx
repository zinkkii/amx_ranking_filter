import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let result = await executeQuery("SELECT * FROM AMX0", []);
    res.status(200).json(result);
  }
}
