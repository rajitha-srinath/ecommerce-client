import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email and Password is required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be atleast 6 character long');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        // Remove user email form local storage
        window.localStorage.removeItem('emailForRegistration');

        // Get user id token
        let user = auth.currentUser;
        const idTokenResult = await user.getIdTokenResult();

        await user.updatePassword(password);
        console.log("User: ", user, "idTokenResult: ", idTokenResult);

        history.push('/');
      }
      
      console.log(result);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  return (
    <div>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register Complete</h4>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
              />
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
              />
              <br />
              <button type="submit" className="btn btn-raised">
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
