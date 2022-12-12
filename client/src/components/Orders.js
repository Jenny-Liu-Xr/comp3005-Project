import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Grid, Pagination, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'

function Orders() {
	const [text, setText] = useState('');
	const [orders, setOrders] = useState([]);
	const [filterOrders, setFilterOrders] = useState([]);
	const [pageIndex, setPageIndex] = useState(1);

	useEffect(() => {
		getOrders();
	}, []);

	const navigate = useNavigate();

	const search = () => {
		const filterOrders = orders.filter(product => product.name.indexOf(text) >= 0 || product.intro.indexOf(text) >= 0);
		setFilterOrders(filterOrders);
	}

	const getOrders = () => {
		const token = localStorage.getItem('token');

		fetch('http://localhost:3001/orders?keyword='+ text, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
			.then(res => res.json())
			.then(res => {
				setOrders(res);
				setFilterOrders(res);
			});
	}

	return (
		<Grid height="100%">
			<Grid display="flex" justifyContent="space-between">
				<Box>
					<TextField label="Search Order" variant="outlined" size="small" value={text} onChange={event => setText(event.target.value)} />
					<Button variant="contained" sx={{marginLeft: 1}} onClick={search}>Search</Button>
				</Box>
			</Grid>
			<Grid mt={2} height={"calc(100% - 60px)"}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>User</TableCell>
								<TableCell>Number Of Books</TableCell>
								<TableCell>Total Amount</TableCell>
								<TableCell>Created At</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filterOrders.slice((pageIndex - 1) * 10, pageIndex * 10).map((order) => (
								<TableRow
									key={order.order_ID}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell>{order.name}</TableCell>
									<TableCell>{order.bookNum}</TableCell>
									<TableCell>${order.amount}</TableCell>
									<TableCell>{new Date(order.datetime).toLocaleString()}</TableCell>
									<TableCell>
										<Button variant="contained" size="small" onClick={() => navigate('/admin/shipping/' + order.order_ID)}>Trace</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Grid mt={2} display="flex" justifyContent="flex-end">
					<Pagination count={Math.ceil(filterOrders.length / 10)} color="primary" page={pageIndex} onChange={(event, page) => setPageIndex(page)} />
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Orders;
