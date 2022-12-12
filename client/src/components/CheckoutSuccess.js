import styles from "../styles/error.module.css";
import { useNavigate } from 'react-router-dom'
import { AiOutlineCheckCircle } from "react-icons/ai";

function CheckoutSuccess() {
	const navigate = useNavigate();

	const goHome = () => {
		navigate("/");
	};

	return (
		<div className={styles.container}>
			<AiOutlineCheckCircle className={styles.icon} />
			<div className={styles.text}>Pay successful! We will deliver to you as soon as possible.</div>
			<button className={styles.btn} onClick={goHome}>
				Go Home
			</button>
		</div>
	);
}

export default CheckoutSuccess;
