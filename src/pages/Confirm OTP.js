import css from "../UI/Layout.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import GeneralContext from "../Contexts/General-context";

//COMPONENT
function ConfirmOTP() {
  //DECLARATIONS
  const style = { marginTop: 50 };
  const [emailAddress, setEmailAddress] = useState("");
  const [OTPValue, setOTPValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const GeneralCtx = useContext(GeneralContext);
  const decryptedToken = GeneralCtx.decrypt(GeneralCtx.encryptedToken);
  const decryptedKey = GeneralCtx.decrypt(GeneralCtx.encryptedKey);
  const url = `https://localhost:44318/api/employee/otp/`;
  const [intervalId, setIntervalId] = useState(0);
  const navigate = useNavigate();

  const color = { color: messageColor };
  const error = { color: "orangered", display: "block" };

  //SEND THE OTP
  function sendOTP(e) {
    e.preventDefault();

    axios
      .post(
        url,
        {
          Email: emailAddress,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            ApiKey: decryptedKey,
            Authorization: "basic " + decryptedToken,
          },
        }
      )
      .then((response) => {
        console.log("Send OTP response", response.data);
        setResponseMessage(response.data);
        setMessageColor("green");
      })
      .catch((error) => {
        setResponseMessage(error);
        setMessageColor("red");
      });

    //RESEND OTP AFTER EVERY 3 MINUTES
    const interval = setInterval(() => {
      axios
        .post(
          url,
          {
            Email: emailAddress,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              ApiKey: decryptedKey,
              Authorization: "basic " + decryptedToken,
            },
          }
        )
        .then((response) => {
          console.log("Send OTP response", response.data);
          setResponseMessage(response.data);
          setMessageColor("green");
        })
        .catch((error) => {
          setResponseMessage(error);
          setMessageColor("red");
        });
    }, 180000);

    setIntervalId(interval);
  }

  //CONFIRM THE OTP
  function confirmOTP(e) {
    e.preventDefault();
    axios
      .post(
        url + `get`,
        { Email: emailAddress },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            ApiKey: decryptedKey,
            Authorization: "basic " + decryptedToken,
          },
        }
      )
      .then((response) => {
        console.log("Confirm OTP resopnse", response.data);

        const OTP = response.data;

        //VALIDATE THE OTP
        if (OTPValue === OTP) {
          axios
            .post(
              url + `erase`,
              { Email: emailAddress },
              {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  ApiKey: decryptedKey,
                  Authorization: "basic " + decryptedToken,
                },
              }
            )
            //IF THE OTP IS VALIDATED
            .then((response) => {
              clearInterval(intervalId);
              console.log("Interval cleared");
              setIntervalId(0);
              GeneralCtx.setAuthenticated(true);
              GeneralCtx.setEmailToUpdate(emailAddress);
              navigate("/forgot-password", { replace: true });
            })
            //CATCH THE ERROR
            .catch((error) => {
              setErrorVisible(true);
              setErrorMessage(error);
            });
        } else {
          //ELSE IF IT'S INVALID
          setErrorVisible(true);
          setErrorMessage("Invalid OTP");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //RETURN JSX
  return (
    <section className={css.body} style={style}>
      <h1>Confirm OTP</h1>
      <form className="ui form" onSubmit={sendOTP}>
        <h3>Send OTP</h3>
        <div className="field">
          <label>Employee email address</label>
          <input
            value={emailAddress}
            required
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
            placeholder="Enter your email address..."
          />
          <label>OTP WILL BE AUTOMATICALLY RESENT AFTER 180 SECONDS!</label>
        </div>
        <div className="field" style={color}>
          <p align="center">{responseMessage}</p>
        </div>
        <div align="center">
          <button className="ui button" type="submit">
            Click to send or resend OTP
          </button>
        </div>
      </form>

      <br />
      <br />

      <form className="ui form" onSubmit={confirmOTP}>
        <h3>Confirm the OTP</h3>
        <div className="field">
          <label>Enter OTP sent to yur email address</label>
          <input
            value={OTPValue}
            required
            onChange={(e) => {
              setOTPValue(e.target.value);
            }}
            placeholder="Enter the one time password"
          />
          {errorVisible && <label style={error}>{errorMessage}</label>}
        </div>
        <div align="center">
          <button className="ui button" type="submit">
            Confirm OTP
          </button>
        </div>
      </form>
    </section>
  );
}

export default ConfirmOTP;
