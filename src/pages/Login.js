import React, { useContext } from "react";
import css from "../UI/Layout.module.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GeneralContext from "../Contexts/General-context";

function Login() {
  const style = { marginTop: 50 };
  const GeneralCtx = useContext(GeneralContext);
  const [employeeId, setEmployeeId] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const navigate = useNavigate();
  const url = `https://localhost:44318/api/employee/`;
  const decryptedToken = GeneralCtx.decrypt(GeneralCtx.encryptedToken);
  const decryptedKey = GeneralCtx.decrypt(GeneralCtx.encryptedKey);

  function signIn(e) {
    e.preventDefault();

    let password = "";

    axios
      .get(url + `${employeeId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          ApiKey: decryptedKey,
          Authorization: "basic " + decryptedToken,
        },
      })
      .then((response) => {
        const alldata = response.data;

        password = alldata.Password;
        console.log("all data", alldata);

        if (employeePassword !== password) {
          alert("Password is incorrect");
          console.log("all data", password);
          return false;
        } else {
          localStorage.setItem("loginState", JSON.stringify(true));
          localStorage.setItem("UserId", JSON.stringify(employeeId));
          if (alldata.Department === "Human Resources") {
            localStorage.setItem("Role", JSON.stringify("Admin"));
          } else {
            localStorage.setItem("Role", JSON.stringify("User"));
          }
          GeneralCtx.setLoginStatus(true);
          navigate("/", { replace: true });
          return true;
        }
      })
      .catch(() => {
        alert("Id doesn't exit");
      });
  }

  return (
    <section className={css.body} style={style}>
      <h1>Login</h1>
      <form className="ui form" onSubmit={signIn}>
        <div className="field">
          <label>Employee ID</label>
          <input
            value={employeeId}
            required
            onChange={(e) => {
              setEmployeeId(e.target.value);
            }}
            placeholder="Enter your telephone number..."
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            required
            value={employeePassword}
            onChange={(e) => {
              setEmployeePassword(e.target.value);
            }}
            placeholder="Enter your password..."
          />
        </div>
        <div className="field">
          <div className="ui checkbox">
            <Link to="/change-password">Change password?</Link>
          </div>
        </div>
        <div align="center">
          <button className="ui button" type="submit">
            Login
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
