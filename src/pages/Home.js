import { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "../Contexts/General-context";

function Home() {
  const [file, setFile] = useState("");
  const url = `https://localhost:44318/api/FileUpload`;
  const GeneralCtx = useContext(GeneralContext);
  const decryptedKey = GeneralCtx.decrypt(GeneralCtx.encryptedKey);

  /* const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Body", file);
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "multipart/form-data",
        ApiKey: decryptedKey,
      },
    };

    axios.post(url, formData, config).then((res) => {
      console.log("Response ", res.data);
    });
  };

  const getImage = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        ApiKey: decryptedKey,
      },
    };
    axios.get(url + `/${1000}`, config).then((res) => {
      console.log("Response ", res.data);
    });
  };*/

  return (
    <div>
      <h1>WELCOME TO MY APP!</h1>
      {/* <form onSubmit={submitHandler}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        ></input>
        <br />
        <button>Send</button>
      </form>
      <div>
        <button onClick={getImage}>Get Image</button>
        </div> */}
      <img src="https://localhost:44318/GetImage.aspx?id=1017" alt="" />
    </div>
  );
}

export default Home;
