import React, {useEffect, useState} from "react";
import styles from "../styles/home.module.css";
import {
  Paper,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
} from '@mui/material';
import {useSelector} from "react-redux";

function Billing() {
  const [billings, setBillings] = useState([]);

  const user = useSelector((state) => state.user.info);

  useEffect(() => {
    if (user && user.ID) {
      fetch("http://localhost:3001/billings?userId=" + user.ID)
        .then((res) => res.json())
        .then((res) => {
          setBillings(res);
        });
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.inquireList}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Datetime</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billings.map((billing) => (
                <TableRow
                  key={billing.ID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{billing.title}</TableCell>
                  <TableCell>{billing.price}</TableCell>
                  <TableCell>{new Date(billing.datetime).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Billing;
