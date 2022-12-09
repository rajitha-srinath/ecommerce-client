import React from "react";
import { useState } from "react";
import { auth } from "../../firebase";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("env...", process.env.REACT_APP_REGISTER_REDIRECT_URL);

    const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true
    };

    await auth.sendSignInLinkToEmail(email, config);
    
    toast.success(`Email is sent to ${email}. Click the link to complete your registartion`);

    window.localStorage.setItem('emailForRegistration', email);

    setEmail('');

  };

  return (
    <div>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register</h4>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                autoFocus
              />
              <br />
              
              <button type="submit" className="btn btn-raised">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
