import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useDispatch } from 'react-redux'
import { setInfo } from '../store/userReducer'
import { toast } from 'react-toastify'

function SignUpForm({ signup, error }) {
  const [details, setDetails] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    // signup(details);

    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: details.email,
        name: details.name,
        password: details.password,
        phone: details.phone,
        address: details.address,
      }),
    })
      .then((res) => {
        if(res.message) {
          toast.error(res.message);
        } else {
          toast.success("Create account successful!");
          navigate("/SignIn");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="form-wrapper">
      <Modal>
        <form onSubmit={submitHandler}>
          <div className="form-inner">
            <h2>Sign Up</h2>
            {error !== "" ? <div className="error">{error}</div> : ""}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-input"
                type="email"
                name="email"
                id="email"
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                value={details.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                  className="form-input"
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) =>
                      setDetails({ ...details, name: e.target.value })
                  }
                  value={details.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                name="password"
                id="password"
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                value={details.password}
              />
              <div
                className="password-action"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Phone</label>
            <input
                className="form-input"
                type="text"
                name="phone"
                id="phone"
                onChange={(e) =>
                    setDetails({ ...details, phone: e.target.value })
                }
                value={details.phone}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Address</label>
            <input
                className="form-input"
                type="text"
                name="address"
                id="address"
                onChange={(e) =>
                    setDetails({ ...details, address: e.target.value })
                }
                value={details.address}
            />
          </div>
          <input type="submit" value="Create account" className="full-width" />
        </form>
        <div className="form-bottom">
          <div>
            <span>Already have an account?</span>
            <Link to="/SignIn" className="link">
              Sign in
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SignUpForm;
