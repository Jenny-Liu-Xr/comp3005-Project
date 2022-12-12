import * as React from 'react';
import Box from '@mui/material/Box';
import {Button, Grid, Pagination, TextField} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function Shipping() {
  const [shippings, setShippings] = useState([]);

  const { orderId } = useParams();

  useEffect(() => {
    fetch("http://localhost:3001/shippings?orderId=" + orderId)
      .then((res) => res.json())
      .then((res) => {
        setShippings(res);
      });
  }, [orderId]);

  return (
    <Grid height="100%">
      <Grid mt={2} height={"calc(100% - 60px)"}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Datetime</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                shippings.map(shipping => (
                  <TableRow
                    key={shipping.ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{new Date(shipping.datetime).toLocaleString()}</TableCell>
                    <TableCell>{shipping.description}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Grid mt={2} display="flex" justifyContent="flex-end">
          <Pagination count={1} color="primary" page={1} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Shipping;