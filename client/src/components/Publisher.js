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

function Publisher() {
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/publisher")
      .then((res) => res.json())
      .then((res) => {
        setPublishers(res);
      });
  }, []);

  return (
    <Grid height="100%">
      <Grid mt={2} height={"calc(100% - 60px)"}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Banking Account</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                publishers.map(publisher => (
                  <TableRow
                    key={publisher.ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{publisher.name}</TableCell>
                    <TableCell>{publisher.phone}</TableCell>
                    <TableCell>{publisher.address}</TableCell>
                    <TableCell>{publisher.email}</TableCell>
                    <TableCell>{publisher.banking_account}</TableCell>
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

export default Publisher;