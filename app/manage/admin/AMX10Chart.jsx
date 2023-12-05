// "use client";

// import {
//   Typography,
//   Button,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableContainer,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   TextField,
//   Stack,
//   Switch,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import { LoadingButton } from "@mui/lab";
// import axios from "axios";

// export default function AMX10Chart(props) {
//   const [datetext, setDateText] = useState("");
//   const [track, setTrack] = useState("");
//   const [car, setCar] = useState("");
//   const [chartRounds, setChartRounds] = useState(0);
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     const rounds = props.rounds;
//     axios
//       .post("/api/leaderboard/chart10select", { rounds })
//       .then((res) => {
//         if (res.data.length == 0) {
//           console.log("NOT DATA");
//           setDateText("");
//           setCar("");
//           setTrack("");
//           setChartRounds(rounds);
//           setChecked(false);
//         } else {
//           console.log(res.data[0]);
//           setDateText(res.data[0].datetext);
//           setCar(res.data[0].car);
//           setTrack(res.data[0].track);
//           setChartRounds(res.data[0].rounds);
//           if (res.data[0].checked === 0) {
//             setChecked(false);
//           } else if (res.data[0].checked === 1) {
//             setChecked(true);
//           }
//         }
//       })
//       .catch((err) => console.log(err));
//   }, [props.rounds]);

//   const switchHandle = (e) => {
//     console.log(e.target.checked);
//     var rounds = props.rounds;
//     var tempnum = 0;
//     if (checked == false) {
//       tempnum = 1;
//       axios
//         .post("/api/leaderboard/chart10update", { rounds, tempnum })
//         .then((res) => {
//           console.log(res.data);
//         })
//         .catch((err) => console.log(err));
//       setChecked(true);
//     } else if (checked == true) {
//       tempnum = 0;
//       axios
//         .post("/api/leaderboard/chart10update", { rounds, tempnum })
//         .then((res) => {
//           console.log(res.data);
//         })
//         .catch((err) => console.log(err));
//       setChecked(false);
//     }
//   };

//   return (
//     <>
//       <Typography sx={{ margin: 1, fontWeight: "900" }}>
//         AMX Global League : Season 3<br />
//         AMX10 - Race {chartRounds}
//       </Typography>
//       <Paper sx={{ overflow: "hidden" }}>
//         <TableContainer>
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography sx={{ fontWeight: "900", margin: 2, color: "#222" }}>
//               {car} <br />
//               {track}
//             </Typography>
//             <Typography sx={{ fontWeight: "900", margin: 2, color: "#222" }}>
//               {datetext}
//             </Typography>
//           </Box>
//           <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: "900" }}>Pos</TableCell>
//                 <TableCell sx={{ fontWeight: "900" }}>Name</TableCell>
//                 <TableCell sx={{ fontWeight: "900" }}>Points</TableCell>
//                 <TableCell sx={{ fontWeight: "900" }} align="center">
//                   Pole Position
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "900" }} align="center">
//                   Heat Wins
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "900" }} align="center">
//                   Fastest Laps
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {props.logdata.map((row, index) => (
//                 <TableRow key={index} hover>
//                   <TableCell>{row.rank}</TableCell>
//                   <TableCell>{row.driverName}</TableCell>
//                   <TableCell>
//                     {row.Qpoints +
//                       row.H1points +
//                       row.H2points +
//                       row.H1fastest +
//                       row.H2fastest}
//                   </TableCell>
//                   <TableCell align="center">
//                     {row.Qresult == 1 ? <>1</> : <></>}
//                   </TableCell>
//                   <TableCell align="center">
//                     {row.H1result === 1 && row.H2result === 1 ? (
//                       <>2</>
//                     ) : (
//                       <>
//                         {row.H1result === 1 ? (
//                           <>1</>
//                         ) : (
//                           <>{row.H2result === 1 ? <>1</> : <></>}</>
//                         )}
//                       </>
//                     )}
//                   </TableCell>
//                   <TableCell align="center">
//                     {row.H1fastest === 5 && row.H2fastest === 5 ? (
//                       <>2</>
//                     ) : (
//                       <>
//                         {row.H1fastest === 5 ? (
//                           <>1</>
//                         ) : (
//                           <>{row.H2fastest === 5 ? <>1</> : <></>}</>
//                         )}
//                       </>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Switch
//           checked={checked}
//           onChange={(e) => {
//             switchHandle(e);
//           }}
//         />
//       </Paper>
//     </>
//   );
// }
