import styles from "../styles/addProduct.module.css";
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";

function AddProduct() {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    author: "",
    genre: "",
    price: "",
    pages: "",
    publisher: "",
  });
  const [publishers, setPublishers] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams(); //url id

  useEffect(() => {
    if (id) {
      fetch("http://localhost:3001/books/" + id)
        .then((res) => res.json())
        .then((res) => {
          setProduct({
            ...res,
            id: res.ISBN,
            publisher: res.publisher_ID
          });
        });
    }
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:3001/publisher")
      .then((res) => res.json())
      .then((res) => {
        setPublishers(res);
      });
  }, []);

  const formControlChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const addProduct = () => {
    if (id) {
      fetch("http://localhost:3001/books/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => {
          toast.success("Update book successful!");
          navigate(-1); //move back to the former page after editing
        });
    } else {
      fetch("http://localhost:3001/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.massage) {
            toast.error(res.massage);
          } else {
            toast.success("Create book successful!");
            navigate("/admin/products");
          }
        });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>{id ? "Edit" : "Create"} Book</div>
      </div>
      <div className={styles.addForm}>
        <div className="form-group">
          <label htmlFor="name">ISBN</label>
          <input
            className="form-input full-width"
            name="id"
            id="id" //matched with labels
            value={product.id}
            disabled={id}
            onChange={formControlChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Book name</label>
          <input
            className="form-input full-width"
            name="name"
            id="name" //matched with labels
            value={product.name}
            onChange={formControlChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            className="form-input full-width"
            name="author"
            id="author" //matched with labels
            value={product.author}
            onChange={formControlChange}
          />
        </div>
        <div className={styles.formRow}>
          <div className="form-group">
            <label htmlFor="genre">genre</label>
            <select
              className="form-input full-width"
              name="genre"
              id="genre"
              value={product.genre}
              onChange={formControlChange}
            >
              <option value="">-----Please select-----</option>
              <option value="Arts">Arts</option>
              <option value="Biographies">Biographies</option>
              <option value="History">History</option>
              <option value="Health">Health</option>
              <option value="Law">Law</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              className="form-input full-width"
              name="price"
              id="price"
              value={product.price}
              onChange={formControlChange}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="pages">Number of pages</label>
            <input
              className="form-input full-width"
              name="pages"
              id="pages"
              value={product.pages}
              onChange={formControlChange}
            />
          </div>
          <div className="form-group" style={{ flex: 2 }}>
            <label htmlFor="publisher">Publisher</label>

            <select
              className="form-input full-width"
              name="publisher"
              id="publisher"
              value={product.publisher}
              onChange={formControlChange}
            >
              <option value="">-----Please select-----</option>
              {
                publishers.map(publisher => <option key={publisher.ID} value={publisher.ID}>{publisher.name}</option>)
              }
            </select>
          </div>
        </div>
        <div>
          <button onClick={addProduct}>{id ? "Edit" : "Create"} Book</button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
