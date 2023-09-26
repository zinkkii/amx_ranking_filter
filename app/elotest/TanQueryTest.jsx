import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Papa from "papaparse";
import Typography from "@mui/material/Typography";
import eloheader from "../elo_table_header/eloheader";
import EloUpdate from "./EloUpdate";

const queryClient = new QueryClient();

export default function getJsonFile() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example /> {/* 계산해서 처음 저장된 데이터(R2_Q의 Elo값) 불러오기 */}
      {/* 위에 저장된 데이터(R2_Q Elo)로 다음 데이터(R2_H1) 계산하기 결과(R2_H1의 Elo값) & 저장하기  */}
      {/* <EloUpdate /> >>얘인데 props때문에 Example 하위에 넣어놓음 */}
    </QueryClientProvider>
  );
}

function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        "https://automanix.s3.ap-northeast-2.amazonaws.com/amx/test.json"
      ).then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h2>저장된 elo (R2_Q_elo_Result) 불러오기</h2>
      <Paper sx={{ overflow: "hidden" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {eloheader.map((row, index) => (
                  <TableCell
                    key={index}
                    sx={{ fontFamily: "Kanit", fontWeight: "900" }}
                  >
                    <b>{row.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ fontFamily: "Kanit" }}>{row.name}</TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.startElo}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.eloDiff}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>{row.odds}</TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.result}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Kanit" }}>
                    {row.winlose}
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

      <EloUpdate data={data} />
    </>
  );
}
