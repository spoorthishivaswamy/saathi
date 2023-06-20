import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc } from "firebase/firestore";
import deleteDocument from "../../services/firebase/deleteDoc";
import getDoc from "../../services/firebase/retrieveDoc";

export default function BasicTable({ rows, deleteOnClick }) {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "image", headerName: "Image", width: 130 },
    { field: "amount", headerName: "Amount", width: 130 },
    { field: "currency", headerName: "Currency", width: 130 },
    { field: "duration", headerName: "Duration", width: 130 },
    {
      field: "amounttobesaved",
      headerName: "Amount to be saved",
      width: 130,
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>GoalId</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Currency</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Amount to be saved</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            row.isDelete !== true
            ? 
            <TableRow
              key={row.goalId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell padding="checkbox">
                <DeleteIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    deleteDocument(row.id);
                    deleteOnClick();
                  }}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.goalId}
              </TableCell>
              <TableCell align="right">{row.goalName}</TableCell>
              <TableCell align="right">
                <img src={row.goalImgURL} height={60} />
              </TableCell>
              <TableCell align="right">{row.goalAmt}</TableCell>
              <TableCell align="right">{row.goalCurrency}</TableCell>
              <TableCell align="right">{row.goalDuration}</TableCell>
              <TableCell align="right">
                {Math.floor(row.goalAmtToSave)}
              </TableCell>
            </TableRow>
            :<></>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
