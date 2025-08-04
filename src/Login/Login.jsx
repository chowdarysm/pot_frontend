import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const goToSignup = () => {
    navigate("/signup");
  };
  const goToSignin = () => {
    navigate("/signin");
  };
  return (
    <>
      <div class="container">
        <div class="form-container">
          <div class="logo">
            <img src="" alt="Logo" />
          </div>
          <div class="head-text">
            <h1>PROACTIX</h1>
            <h3>Report road hazards and improve road safety</h3>
          </div>
          <div class="login-btn">
            <button class="btn1" onClick={goToSignup}>
              Sign up
            </button>
            <button class="btn2" onClick={goToSignin}>
              Sign In
            </button>
          </div>
          <div class="terms">
            <p>@2025 PhronesisTech, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
