// import { executeQuery } from "@/app/DB/db";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     var sql = "SELECT * FROM ClientChart WHERE rounds = ? AND game ='AMX10' ";
//     try {
//       let result = await executeQuery(sql, [req.body.rounds]);
//       res.status(200).json(result);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }
