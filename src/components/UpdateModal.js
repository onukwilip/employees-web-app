import axios from "axios";
import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import GeneralContext from "../Contexts/General-context";
import css from "./UpdateModal.module.css";

function UpdateModal(props) {
  const GeneralCtx = useContext(GeneralContext);
  const [departmentName, setDepartmentName] = useState(
    GeneralCtx.departmentUpdateValues.name
  );
  const navigate = useNavigate();
  const id = GeneralCtx.departmentUpdateValues.id;
  const url = `https://localhost:44318/api/values/`;
  const decryptedToken = GeneralCtx.decrypt(GeneralCtx.encryptedToken);
  const decryptedKey = GeneralCtx.decrypt(GeneralCtx.encryptedKey);

  function updateDepartment(e) {
    e.preventDefault();

    axios
      .put(
        url + `${id}`,
        { DepartmentName: departmentName },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            ApiKey: decryptedKey,
            Authorization: "basic " + decryptedToken,
          },
        }
      )
      .then((response) => {
        console.log("Updated successfully");
        GeneralCtx.setDepartmentUpdateValues(false, "", "");
        navigate("/department", { replace: true });
      });
  }

  return (
    <Fragment>
      <section className={css.overlay}></section>
      <section className={css.modal}>
        <h2>Update modal</h2>
        <form className="ui form" onSubmit={updateDepartment}>
          <Modal.Content>
            <div className="field">
              <label>Department Name</label>
              <input
                placeholder="Name"
                required
                value={departmentName}
                onChange={(e) => {
                  setDepartmentName(e.target.value);
                }}
              />
            </div>
          </Modal.Content>
          <br></br>
          <Modal.Actions align="right">
            <Button color="green">
              <Icon name="checkmark" /> Update
            </Button>
            <Button
              color="red"
              type="button"
              onClick={() => {
                GeneralCtx.setDepartmentUpdateValues(false, "", "");
              }}
            >
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </form>
      </section>
    </Fragment>
  );
}

export default UpdateModal;
