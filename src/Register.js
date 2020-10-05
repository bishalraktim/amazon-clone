import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // it successfully created a new user with email and password!
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message)); 
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Create account</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ fontWeight: "bolder" }}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            style={{ fontWeight: "bolder" }}
          />
        </form>
        <p>
          By creating Amazon fake clone account, you agree that you have read
          and accepted our Conditions of Use and Privacy Notice.
        </p>
        <Link to="/register">
          <button
            className="login__registerButton"
            onClick={register}
            style={{ backgroundColor: "#f0c14b", cursor: "pointer" }}
          >
            Create your Amazon account
          </button>
        </Link>
        <p style={{ fontSize: "14px" }}>
          Already have an account?{" "}
          <Link style={{ textDecoration: "none", color: "blue" }} to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
