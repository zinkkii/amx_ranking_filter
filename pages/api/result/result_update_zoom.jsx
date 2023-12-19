import { executeQuery } from "@/app/DB/db";

export default async function handler(req, res) {
  var updateZoom1 =
    "UPDATE CsvResult SET zoomPoints = 1 " +
    "WHERE rounds = ? AND tier = ? AND category = 'Q' AND custID = ? ";
  var updateZoom0 =
    "UPDATE CsvResult SET zoomPoints = 0 " +
    "WHERE rounds = ? AND tier = ? AND category = 'Q' AND custID = ? ";
  if (req.method === "POST") {
    try {
      console.log("AAAAAAAAAAAAAAAA!!!");
      console.log(req.body.chartResult);
      console.log(req.body.zoomArr);
      console.log(req.body.rounds);
      console.log(req.body.tier);

      for (var i = 0; i < req.body.chartResult.length; i++) {
        //모든 zoomPoints = 0 ;
        let zoomCheckUpdate0 = await executeQuery(updateZoom0, [
          req.body.rounds,
          req.body.tier,
          req.body.chartResult[i].custID,
        ]);

        //체크한것만 zoomPoints = 1
        for (var j = 0; j < req.body.zoomArr.length; j++) {
          if (req.body.chartResult[i].custID === req.body.zoomArr[j]) {
            console.log("체크되었다!!!!" + req.body.chartResult[i].driverName);
            let zoomCheckUpdate1 = await executeQuery(updateZoom1, [
              req.body.rounds,
              req.body.tier,
              req.body.chartResult[i].custID,
            ]);
          }
        }
      }
      res.status(200).json("SUCCESS");
    } catch (error) {
      console.log(error);
      return res.status(200).json("ERROR!");
    }
  }
}
