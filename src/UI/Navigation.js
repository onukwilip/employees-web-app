import { useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "../Contexts/General-context";
import css from "./Navigation.module.css";

function Navigation() {
  const GeneralCtx = useContext(GeneralContext);
  const role = JSON.parse(localStorage.getItem("Role"));

  return (
    <header className={css.header}>
      <div className="ui secondary menu">
        <div>
          <h1>EMPLOYEE WEB APP</h1>
        </div>
        <Link to="/" className="item">
          Home
        </Link>
        {role === "Admin" && (
          <Link to="/department" className="item">
            Department
          </Link>
        )}
        {role === "Admin" && (
          <Link to="/employees" className="item">
            Employees
          </Link>
        )}
        <Link to="/add-transformer" className="item">
          Add Transformer
        </Link>
        {role === "Admin" && (
          <Link to="/edit-transformer" className="item">
            Edit Transformer
          </Link>
        )}
        {role === "Admin" && (
          <Link to="/uploaded-transformers" className="item">
            Uploaded Transformers
          </Link>
        )}
        <div className="right menu">
          <div className="item">
            <div className="ui icon input">
              <input type="text" placeholder="Search..." />
              <i aria-hidden="true" className="search icon"></i>
            </div>
          </div>
          <Link
            to="/"
            className="item"
            onClick={() => {
              localStorage.setItem("loginState", JSON.stringify(false));
              localStorage.setItem("Role", JSON.stringify("None"));
              GeneralCtx.setLoginStatus(false);
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
