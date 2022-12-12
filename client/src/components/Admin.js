import React, { useEffect, useState } from 'react'
import styles from '../styles/admin.module.css';
import { AiOutlineUser, AiOutlineCodepen } from 'react-icons/ai';
import { MdOutlineFormatListBulleted, MdOutlineDashboard } from 'react-icons/md';
import { GoBook } from 'react-icons/go';
import { HiOutlineUsers } from 'react-icons/hi';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import MenuBookIcon from '@mui/icons-material/MenuBook';

function Admin() {
	const [activeIndex, setActiveIndex] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/admin/dashboard') {
			setActiveIndex(0);
		} else if (location.pathname === '/admin/products') {
			setActiveIndex(1);
		} else if (location.pathname === '/admin/orders') {
			setActiveIndex(2);
		} else if (location.pathname === '/admin/publishers') {
			setActiveIndex(3);
		}
	}, [location]);

	const navigateTo = (url) => {
		if (url === '/admin/users') {
			setActiveIndex(0);
		} else if (url === '/admin/products') {
			setActiveIndex(1);
		} else if (url === '/admin/orders') {
			setActiveIndex(2);
		}
		navigate(url);
	}

	return (
		<div className={styles.container}>
			<div className={styles.sidebar}>
				{/*<div className={[styles.sideItem, activeIndex === 0 ? styles.activeSideItem : null].join(' ')} onClick={() => navigateTo('/admin/users')}>*/}
				{/*	<AiOutlineUser fontSize={25} />*/}
				{/*	<span className={styles.sideItemText}>Users</span>*/}
				{/*</div>*/}
				<div className={[styles.sideItem, activeIndex === 0 ? styles.activeSideItem : null].join(' ')} onClick={() => navigateTo('/admin/dashboard')}>
					<MdOutlineDashboard fontSize={25} />
					<span className={styles.sideItemText}>Dashboard</span>
				</div>
				<div className={[styles.sideItem, activeIndex === 1 ? styles.activeSideItem : null].join(' ')} onClick={() => navigateTo('/admin/products')}>
					<GoBook fontSize={25} />
					<span className={styles.sideItemText}>Books</span>
				</div>
				<div className={[styles.sideItem, activeIndex === 2 ? styles.activeSideItem : null].join(' ')} onClick={() => navigateTo('/admin/orders')}>
					<MdOutlineFormatListBulleted fontSize={25} />
					<span className={styles.sideItemText}>Orders</span>
				</div>
				<div className={[styles.sideItem, activeIndex === 3 ? styles.activeSideItem : null].join(' ')} onClick={() => navigateTo('/admin/publishers')}>
					<HiOutlineUsers fontSize={25} />
					<span className={styles.sideItemText}>Publishers</span>
				</div>
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	)
}

export default Admin
