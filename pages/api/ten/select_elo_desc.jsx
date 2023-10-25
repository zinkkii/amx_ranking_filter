import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let result = await executeQuery(
      "select * from AMX10 left join AMX0 on AMX10.custID=AMX0.custID union select * from AMX10 right join AMX0 on AMX10.custID=AMX0.custID",
      []
    );
    res.status(200).json(result);
  }
}
