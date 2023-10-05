import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function RankingData(props) {
  const [ranking, setRanking] = useState();

  const getRankingData = (x) => {
    console.log(x);
    //setRanking(x);
  };

  useEffect(() => {
    console.log("props!");
    console.log(props.game);
  }, [props]);

  return (
    <GetJson
      game={props.game}
      tier={props.tier}
      region={props.region}
      getRankingData={getRankingData}
      ranking={ranking}
    />
  );
}

function GetJson({ getRankingData, game, tier, region }) {
  useEffect(() => {
    console.log("GetJson");
    console.log(game);
  }, [game]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["data"],
    queryFn: () =>
      fetch(
        "https://automanix.s3.ap-northeast-2.amazonaws.com/amx/R3/R3_H2_ELO.json" //R2_Q_ELO 읽기
      ).then((res) => res.json()),
  });
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  getRankingData(data); //부모 컴포넌트로 data보내기

  return (
    <>
      <h2>Rankingdata.js</h2>

      <RankingTable data={data} game={game} tier={tier} region={region} />
    </>
  );
}

function RankingTable({ data, game, tier, region }) {
  //paging
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    setPage(0);
  }, []);
  //--paging

  //rankingData
  const [rows, setRows] = useState([{}]);

  useEffect(() => {
    console.log("RankingTable----");
    if (game === "all") {
      setRows(data);
    }
  }, [game, tier, region]);

  return (
    <>
      {/* Paging */}
      <TablePagination
        sx={{ fontFamily: "Kanit" }}
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontFamily: "Kanit",
                    fontWeight: "900",
                    align: "center",
                  }}
                >
                  Pos
                </TableCell>
                <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                  Game
                </TableCell>
                <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                  Tier
                </TableCell>
                <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                  Region
                </TableCell>
                <TableCell sx={{ fontFamily: "Kanit", fontWeight: "900" }}>
                  Elo
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" key={index}>
                    <TableCell sx={{ fontFamily: "Kanit", align: "center" }}>
                      {row.result}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit" }}>
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit" }}>
                      {row.game}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit" }}>
                      {row.tier}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit" }}>
                      {row.region}
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Kanit" }}>
                      {row.newElo}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
