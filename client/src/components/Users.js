import { Button, Grid, Pagination, TextField } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function Users() {
	const [text, setText] = useState('');
	const [users, setUsers] = useState([]);
	const [filterUsers, setFilterUsers] = useState([]);
	const [pageIndex, setPageIndex] = useState(1);
	const [open, setOpen] = useState(false);
	const [updateUser, setUpdateUser] = useState();
	const [newPassword, setNewPassword] = useState('');

	useEffect(() => {
		getUsers();
	}, []);

	const search = () => {
		const filterUsers = users.filter(user => user.email.indexOf(text) >= 0);
		setFilterUsers(filterUsers);
	}

	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setUpdateUser(undefined);
		setNewPassword('');
		setOpen(false);
	}

	const getUsers = () => {
		const token = localStorage.getItem('token');

		fetch('http://localhost:3001/users/normal', {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
			.then(res => res.json())
			.then(res => {
				setUsers(res);
				setFilterUsers(res);
			});
	}

	const disableUser = (user) => {
		const token = localStorage.getItem('token');

		fetch('http://localhost:3001/users/' + user._id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			},
			body: JSON.stringify({
				...user,
				disabled: !user.disabled
			})
		})
			.then(res => res.json())
			.then(res => {
				if (res.message) {
					toast.error(res.message);
				} else {
					toast.success((user.disabled ? 'Active' : 'Disabled') + ' user successful!');
					getUsers();
				}
			});
	}

	const confirmUpdatePassword = () => {
		const token = localStorage.getItem('token');

		fetch('http://localhost:3001/users/updatePassword', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			},
			body: JSON.stringify({
				id: updateUser._id,
				password: newPassword
			})
		})
			.then(res => {
				toast.success('Update user password successful!');
				handleClose();
			});
	}

	return (
		<Grid height="100%">
			<Grid>
				<TextField label="Search Email" variant="outlined" size="small" value={text} onChange={event => setText(event.target.value)} />
				<Button variant="contained" sx={{marginLeft: 1}} onClick={search}>Contained</Button>
			</Grid>
			<Grid mt={2} height={"calc(100% - 60px)"}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Amount</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filterUsers.map((user) => (
								<TableRow
									key={user._id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{user._id}
									</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.amount}</TableCell>
									<TableCell>{user.disabled ? 'Disabled': 'Active'}</TableCell>
									<TableCell>
										<Button variant="contained" size="small" onClick={() => {
											setUpdateUser(user);
											handleOpen();
										}}>Update Password</Button>
										<Button variant="contained" size="small" color="error" sx={{marginLeft: 1}} onClick={() => disableUser(user)}>
											{user.disabled ? 'Active' : 'Disable'}
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Grid mt={2} display="flex" justifyContent="flex-end">
					<Pagination count={filterUsers.length} color="primary" page={pageIndex} onChange={(event, page) => setPageIndex(page)} />
				</Grid>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box className="modal-content">
						<Typography variant="h5" component="h1" textAlign="center">
							Update User Password
						</Typography>
						<Box mt={4} mb={4}>
							<TextField id="outlined-basic" label="New Password" variant="outlined" sx={{width: 400}} value={newPassword} onChange={event => setNewPassword(event.target.value)} />
						</Box>
						<Box textAlign="center" mt={2}>
							<Button variant="contained" fullWidth onClick={confirmUpdatePassword}>Confirm</Button>
						</Box>
					</Box>
				</Modal>
			</Grid>
		</Grid>
	)
}

export default Users;
