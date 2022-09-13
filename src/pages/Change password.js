import React, { useContext } from "react";
import css from "../UI/Layout.module.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GeneralContext from "../Contexts/General-context";

function ChangePassword() {
  const style = { marginTop: 50 };
  const GeneralCtx = useContext(GeneralContext);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeNewPassword, setEmployeeNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [employeeOldPassword, setEmployeeOldPassword] = useState("");
  const url = `https://localhost:44318/api/employee/`;
  const pwordUrl = `https://localhost:44318/api/employee/password/`;
  const decryptedToken = GeneralCtx.decrypt(GeneralCtx.encryptedToken);
  const decryptedKey = GeneralCtx.decrypt(GeneralCtx.encryptedKey);
  const navigate = useNavigate();

  function changePassword(e) {
    e.preventDefault();

    axios
      .get(url + ` ${employeeId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          ApiKey: decryptedKey,
          Authorization: "basic " + decryptedToken,
        },
      })
      .then((response) => {
        const alldata = response.data;
        const email = alldata.Email;

        if (employeeOldPassword === alldata.Password) {
          if (confirmNewPassword === employeeNewPassword) {
            axios
              .put(
                pwordUrl,
                {
                  Email: email,
                  Password: employeeNewPassword,
                },
                {
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    ApiKey: decryptedKey,
                    Authorization: "basic " + decryptedToken,
                  },
                }
              )
              .then((reponse2) => {
                console.log("Password updated successfully", reponse2);
                navigate("/", { replace: true });
              })
              .catch((e) => {
                alert("Error updating password " + e);
                console.log("Error updating password", e);
              });
          } else {
            alert("Confirm password must be equal to set password");
          }
        } else {
          alert("Old password is incorrect");
        }
      })
      .catch((e) => {
        alert("Error getting values " + e);
        console.log("Error getting values", e);
      });
  }

  return (
    <section className={css.body} style={style}>
      <h1>Change password</h1>
      <form className="ui form" onSubmit={changePassword}>
        <div className="field">
          <label>Employee ID</label>
          <input
            value={employeeId}
            required
            onChange={(e) => {
              setEmployeeId(e.target.value);
            }}
            placeholder="Enter your ID..."
          />
        </div>
        <div className="field">
          <label>Old Password</label>
          <input
            type="password"
            required
            value={employeeOldPassword}
            onChange={(e) => {
              setEmployeeOldPassword(e.target.value);
            }}
            placeholder="Enter your password..."
          />
        </div>
        <div className="field">
          <label>New Password</label>
          <input
            type="password"
            required
            value={employeeNewPassword}
            onChange={(e) => {
              setEmployeeNewPassword(e.target.value);
            }}
            placeholder="Enter your password..."
          />
        </div>
        <div className="field">
          <label>Confirm Password</label>
          <input
            type="password"
            required
            value={confirmNewPassword}
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
            }}
            placeholder="Enter your password..."
          />
        </div>
        <div align="center">
          <button className="ui button" type="submit">
            Change password
          </button>
        </div>
      </form>
      <Link to="/confirm-otp">Forgotten password?</Link>
    </section>
  );
}

export default ChangePassword;
