import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TagChips from "../TagsChip";

export default function CardTable({ data, onRowClick }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="center">Tags</TableCell>
            <TableCell align="center">Created At</TableCell>
            <TableCell align="center">Review Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              onClick={() => onRowClick(row)}
              hover
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                td: { cursor: "pointer" },
              }}
            >
              <TableCell>{row.title}</TableCell>
              <TableCell align="center">
                <TagChips items={row.tags} />
              </TableCell>
              <TableCell align="center">{row.created_at}</TableCell>
              <TableCell align="center">{row.next_review_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
