import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if ((email === "", password === "")) {
      alert("enter all details");
      return;
    }

    try {
      const result = await fetch(`http://localhost:7070/api/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const response = await result.json();
      if (result.status == 200) {
        navigate("/home");
        console.log(response.id);
      }
      if (result.status != 200) {
        alert("enter details");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [activeForm, setActiveForm] = useState("login");

  const toggleForm = (formType) => {
    setActiveForm(formType);
  };
  return (
    <>
      <section className="forms-section">
        <h1 className="section-title">Login & Sign Up Form</h1>
        <div className="forms">
          <div
            className={`form-wrapper ${
              activeForm === "login" ? "is-active" : ""
            }`}
          >
            <button
              type="button"
              className="switcher switcher-login"
              onClick={() => toggleForm("login")}
            >
              Login
              <span className="underline"></span>
            </button>
            <form className="form form-login">
              <fieldset>
                <legend>
                  Please, enter your email and password for login.
                </legend>
                <div className="input-block">
                  <label htmlFor="login-email">E-mail</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="login-email"
                    type="email"
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="login-password">Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="login-password"
                    type="password"
                  />
                </div>
              </fieldset>
              <button type="submit" className="btn-login" onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
          <div
            className={`form-wrapper ${
              activeForm === "signup" ? "is-active" : ""
            }`}
          >
            <button
              type="button"
              className="switcher switcher-signup"
              onClick={() => toggleForm("signup")}
            >
              Sign Up
              <span className="underline"></span>
            </button>
            <form className="form form-signup">
              <fieldset>
                <legend>
                  Please, enter your email, password, and password confirmation
                  for sign up.
                </legend>
                <div className="input-block">
                  <label htmlFor="signup-email">E-mail</label>
                  <input id="signup-email" type="email" required />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password">Password</label>
                  <input id="signup-password" type="password" required />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password-confirm">
                    Confirm password
                  </label>
                  <input
                    id="signup-password-confirm"
                    type="password"
                    required
                  />
                </div>
              </fieldset>
              <button type="submit-signup" className="btn-signup">
                Continue
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
