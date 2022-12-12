import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { setInfo } from '../store/userReducer'
import { toast } from 'react-toastify'

function LoginForm() {
  const [details, setDetails] = useState({ email: "", password: "" });

  const [showPassword, setShowPassword] = useState(false);

  //use navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: details.email,
        password: details.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          toast.error(res.message); // messgae => in backend
        } else {
          localStorage.setItem("user", JSON.stringify(res));
          dispatch(setInfo(res));
          if (res.isAdmin) {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
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
            <h2>Sign In</h2>

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
          <input type="submit" value="Sign In" className="full-width" />
        </form>
        <div className="form-bottom">
          <div>
            <span>Don't have an account?</span>
            <Link to="/SignUp" className="link">
              Sign up
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LoginForm;
