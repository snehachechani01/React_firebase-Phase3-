import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import InputControll from "../InputControll/InputControll";

import {auth} from "../../firebase";
import '../../css/Login.css';

function Login() {

  const navigate = useNavigate(); //navigation
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  const [errorMsg, setErrorMsg] = useState(""); //storing error messages
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);


    signInWithEmailAndPassword(auth, values.email, values.pass)
        .then(async (res) => {
          setSubmitButtonDisabled(false);

          navigate("/Home");
        })
        .catch((err) => {
          setSubmitButtonDisabled(false);
          setErrorMsg(err.message);
        });
  };
  return (
    <>
      <div className={'login-container'}>
        <div className={'innerBox'}>
          <h1 className={'heading'}>Login</h1>

          <InputControll
              label="Email"
              onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
              }
              placeholder="Enter email address"
          />
          <InputControll
              label="Password"
              onChange={(event) =>
                  setValues((prev) => ({ ...prev, pass: event.target.value }))
              }
              placeholder="Enter Password"
          />

          <div className={'footer'}>
            <b className={'footer'}>{errorMsg}</b>
            <button disabled={submitButtonDisabled} onClick={handleSubmission}>
              Login
            </button>
            <p>
              Already have an account?{" "}
              <span>
              <Link to="/">Sign up</Link>
            </span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login