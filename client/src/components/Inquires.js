import React, { useState } from "react";
import styles from "../styles/home.module.css";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  TextField
} from '@mui/material';

function Inquires() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState()

  const search = () => {
    fetch('http://localhost:3001/orders/' + orderId)
      .then(res => res.json())
      .then(res => {
        if (res.ID) {
          setOrder(res);
        } else {
          setOrder(undefined);
        }
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>
          <TextField label="Search Order ID" size="small" variant="outlined" value={orderId} onChange={e => setOrderId(e.target.value)} />
          <Button variant="contained" style={{marginLeft: 10}} onClick={search}>Search</Button>
        </div>
        <div className={styles.topRight}>
        </div>
      </div>
      <div className={styles.inquireList}>
        {
          order && (
            <>
              <Box ml={2}>
                <h2>Total Amount: ${order.amount}</h2>
                <div style={{color: '#858585'}}>{new Date(order.datetime).toLocaleString()}</div>
              </Box>
              <Box ml={2} mt={2}>
                <h4>Books:</h4>
                <Box mt={2} mb={2}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ISBN</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.books.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell>{row.ISBN}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
              <Box ml={2} mt={2}>
                <h4>Shipping:</h4>
              </Box>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                  order.shippings.map(shipping => (
                    <>
                      <ListItem>
                        <ListItemText key={shipping.ID} primary={shipping.description} secondary={new Date(shipping.datetime).toLocaleString()} />
                      </ListItem>
                      <Divider />
                    </>
                  ))
                }
              </List>
            </>
          )
        }
      </div>
    </div>
  );
}

export default Inquires;
