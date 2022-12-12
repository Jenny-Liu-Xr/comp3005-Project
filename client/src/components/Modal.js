import { MdOutlineClose } from "react-icons/md";
import styles from "../styles/modal.module.css";

function Modal({ children, handleClose }) {
  return (
    <div className={styles.modal}>
      <MdOutlineClose
        className={styles.modalCloseIcon}
        fontSize={22}
        onClick={handleClose}
      />
      {children}
    </div>
  );
}

export default Modal;
