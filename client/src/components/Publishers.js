import { useEffect, useState } from 'react';
import { Button, Grid, Pagination, TextField } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Products() {
	const [text, setText] = useState('');
	const [products, setProducts] = useState([]);
	const [filterProducts, setFilterProducts] = useState([]);
	const [pageIndex, setPageIndex] = useState(1);

	const navigate = useNavigate();

	useEffect(() => {
		getProducts();
	}, []);

	const toAddProduct = () => {
		navigate('/admin/addProduct');
	}

	const toEditProduct = (productId) => {
		navigate('/admin/editProduct/' + productId);
	}

	const search = () => {
		const filterProducts = products.filter(product => product.name.indexOf(text) >= 0 || product.intro.indexOf(text) >= 0);
		setFilterProducts(filterProducts);
	}

	const getProducts = () => {
		const token = localStorage.getItem('token');

		fetch('http://localhost:3001/books?keyword='+ text, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
			.then(res => res.json())
			.then(res => {
				setProducts(res);
				setFilterProducts(res);
			});
	}

	const deleteProduct = (productId) => {
		if (window.confirm('Do you want to delete the product?')) {
			const token = localStorage.getItem('token');

			fetch('http://localhost:3001/products/'+ productId, {
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + token
				}
			})
				.then(res => {
					toast.success('Delete product successful!');
					getProducts();
				});
		}
	}

	return (
		<Grid height="100%">
			<Grid display="flex" justifyContent="space-between">
				<Box>
					<TextField label="Search Book" variant="outlined" size="small" value={text} onChange={event => setText(event.target.value)} />
					<Button variant="contained" sx={{marginLeft: 1}} onClick={search}>Search</Button>
				</Box>
				<Box>
					<Button variant="contained" onClick={toAddProduct}>Add Book</Button>
				</Box>
			</Grid>
			<Grid mt={2} height={"calc(100% - 60px)"}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Image</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Author</TableCell>
								<TableCell>Genre</TableCell>
								<TableCell>Price</TableCell>
								<TableCell>Number of pages</TableCell>
								<TableCell>Publisher</TableCell>
								<TableCell sx={{width: 200}}>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filterProducts.slice((pageIndex - 1) * 10, pageIndex * 10).map((product) => (
								<TableRow
									key={product._id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell><img src="https://www.pngkey.com/png/detail/350-3500680_placeholder-open-book-silhouette-vector.png" style={{width: 100, height: 100, objectFit: 'cover'}} /></TableCell>
									<TableCell>{product.name}</TableCell>
									<TableCell>{product.author}</TableCell>
									<TableCell>{product.genre}</TableCell>
									<TableCell>{product.price}</TableCell>
									<TableCell>{product.pages}</TableCell>
									<TableCell>{product.publisher}</TableCell>
									<TableCell>
										<Button variant="contained" size="small" onClick={() => toEditProduct(product._id)}>Edit</Button>
										<Button variant="contained" size="small" color="error" sx={{marginLeft: 1}} onClick={() => deleteProduct(product._id)}>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Grid mt={2} display="flex" justifyContent="flex-end">
					<Pagination count={Math.ceil(filterProducts.length / 10)} color="primary" page={pageIndex} onChange={(event, page) => setPageIndex(page)} />
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Products;
