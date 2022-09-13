import css from "../UI/Layout.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GeneralContext from "../Contexts/General-context";
import { useState, useContext, useEffect } from "react";

//COMPONENT
function ForgotPassword() {
  //DECLARATIONS
  const style = { marginTop: 50 };
  const GeneralCtx = useContext(GeneralContext);
  const pwordUrl = `https://localhost:44318/api/employee/password/`;
  const employeeId = GeneralCtx.emailToUpdate;
  const [employeeNewPassword, setEmployeeNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const decryptedToken = GeneralCtx.decrypt(GeneralCtx.encryptedToken);
  const decryptedKey = GeneralCtx.decrypt(GeneralCtx.encryptedKey);
  const navigate = useNavigate();

  //IF COMPONENT IS MOUNTED FOR THE FIRST TIME
  //CHECK IF THE USER IS AUTHENTICATED TO CHANGE PASSWORD...IF TRUE
  //LET HIM CONTINUE ELSE REDIRECT HIM TO CONFIRM OTP
  useEffect(() => {
    if (!GeneralCtx.authenticated) {
      navigate("/confirm-otp", { replace: true });
    }
  }, []);

  //FUNCTION TO CHANGE PASSWORD
  const changePassword = (e) => {
    e.preventDefault();

    //IF THE CHANGE PASSWORD BUTTON IS TRIGERED
    //CHECK IF THE USER IS AUTHENTICATED TO CHANGE PASSWORD...IF TRUE
    //LET HIM CONTINUE ELSE REDIRECT HIM TO CONFIRM OTP
    if (GeneralCtx.authenticated) {
      if (employeeNewPassword === confirmNewPassword) {
        axios
          .put(
            pwordUrl,
            {
              Email: employeeId,
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
          //IF PASSWORD IS UPDATED SUCCESSFULLY ERASE THE EMAIL
          //FROM GENERAL CONTEXT AND SET AUTHENTCATED TO FALSE
          .then((response) => {
            console.log("Response", response.data);
            GeneralCtx.setEmailToUpdate("");
            GeneralCtx.setAuthenticated(false);
            navigate("/", { replace: true });
          });
      } else {
        alert("New password and confirm password must match!");
      }
    } else {
      navigate("/confirm-otp", { replace: true });
    }
  };

  //RETURN JSX
  return (
    <section className={css.body} style={style}>
      <h1>Change forgotten password</h1>
      <form className="ui form" onSubmit={changePassword}>
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
    </section>
  );
}

export default ForgotPassword;
