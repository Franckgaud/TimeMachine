import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogIn = () => {
    setLoggedIn(!loggedIn);
  };
  const createUser = async () => {
    const link = await axios.post("/api/createuser").then(res => res.data);
    if (link) {
      window.open(link);
    }
    return;
  };

  return (
    <div>
      {!loggedIn && (
        <div className="login-wrapper">
          <form>
            <label htmlFor="email_field">Enter your email</label>

            <input
              id="email_field"
              type="text"
              className="nes-input is-dark"
              placeholder="Email"
            />
            <label htmlFor="password_field">Enter your password</label>

            <input
              id="password_field"
              type="text"
              className="nes-input is-dark"
              placeholder="Password"
            />
            <button className="nes-btn is-primary is-dark">Sign Up</button>
            <button className="nes-btn  is-dark" onClick={handleLogIn}>
              Log In
            </button>
          </form>
        </div>
      )}

      {/* PROFILE AREA AND LINK TO STRIPE  */}

      {loggedIn && (
        <div className="profile-header">
          <button className="nes-btn is-primary is-dark" onClick={createUser}>
            Log in to Stripe
          </button>
          <h1>PPROFILE!!</h1>
        </div>
      )}
    </div>
  );
};

export default Login;
