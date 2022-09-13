import axios from "axios";
import { Fragment, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import GeneralContext from "../Contexts/General-context";
import css from "./EmployeeUpdateModal.module.css";

function EmployeeUpdateModal(props) {
  const GeneralCtx = useContext(GeneralContext);
  const [employeeFirstName, setEmployeeFirstName] = useState(
    GeneralCtx.employeeUpdateValues.firstname
  );
  const [employeeLastName, setEmployeeLastName] = useState(
    GeneralCtx.employeeUpdateValues.lastname
  );
  const [employeeDateOfBirth, setEmployeeDateOfBirth] = useState(
    GeneralCtx.employeeUpdateValues.date_of_birth
  );
  const [employeeTel, setEmployeeTel] = useState(
    GeneralCtx.employeeUpdateValues.phone
  );
  const [employeeEmail, setEmployeeEmail] = useState(
    GeneralCtx.employeeUpdateValues.email
  );
  const [employeeDepartment, setEmployeeDepartment] = useState(
    GeneralCtx.employeeUpdateValues.department
  );
  const [departmentsData, setDepartmentsData] = useState([]);
  const [employeePassword, setemployeePassword] = useState([]);
  const navigate = useNavigate();
  const id = GeneralCtx.employeeUpdateValues.id;
  const url = `https://localhost:44318/api/values/`;
  const Empurl = `https://localhost:44318/api/employee/`;
  const decryptedToken = GeneralCtx.decrypt(GeneralCtx.encryptedToken);
  const decryptedKey = GeneralCtx.decrypt(GeneralCtx.encryptedKey);

  useEffect(() => {
    const userId = id;
    axios
      .get(Empurl + `${userId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          ApiKey: decryptedKey,
          Authorization: "basic " + decryptedToken,
        },
      })
      .then((response) => {
        const alldata = response.data;
        setemployeePassword(alldata.Password);
      });
  }, [GeneralCtx.employeeUpdateModal]);

  function updateDepartment(e) {
    e.preventDefault();

    const updateData = {
      FirstName: employeeFirstName,
      LastName: employeeLastName,
      Date_Of_Birth: employeeDateOfBirth,
      Email: employeeEmail,
      Phone_Number: employeeTel,
      Department: employeeDepartment,
      Password: employeePassword,
    };

    /* axios.patch(`https://employee-app-employee-db-default-rtdb.firebaseio.com/employee/${id}.json`, { ...updateData }, { crossdomain: 'true' })
             .then((response) => {
                 console.log('Response data', response.data)
                 GeneralCtx.setEmployeeUpdateValues(false, '', '', '', '', '', '', '')
                 navigate('/employees', { replace: true })
             }) */

    axios
      .put(
        Empurl + `${id}`,
        { ...updateData },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            ApiKey: decryptedKey,
            Authorization: "basic " + decryptedToken,
          },
        }
      )
      .then((response) => {
        console.log("Response data", response.data);
        GeneralCtx.setEmployeeUpdateValues(false, "", "", "", "", "", "", "");
        navigate("/employees", { replace: true });
      });
  }

  //GET DEPARTMENTS
  useEffect(() => {
    axios
      .get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          ApiKey: decryptedKey,
          Authorization: "basic " + decryptedToken,
        },
      })
      .then((response) => {
        const alldata = [...response.data];
        setDepartmentsData(alldata);
        console.log("Department data", departmentsData);
      });
  }, [GeneralCtx.employeeUpdateModal]);

  return (
    <Fragment>
      <section className={css.overlay}></section>
      <section className={css.modal}>
        <h2>Update modal</h2>
        <form className="ui form" onSubmit={updateDepartment}>
          <Modal.Content>
            <div className="field">
              <label>Select department</label>
              <select
                name="departments"
                value={employeeDepartment}
                required
                id="departments"
                onChange={(e) => {
                  setEmployeeDepartment(e.target.value);
                }}
              >
                <option value="">--Please select a value---</option>
                {departmentsData.map((eachDepartment) => {
                  return (
                    <option
                      key={eachDepartment.Id}
                      value={eachDepartment.DepartmentName}
                    >
                      {eachDepartment.DepartmentName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="field">
              <label>Firstname</label>
              <input
                placeholder="Firstname..."
                required
                value={employeeFirstName}
                onChange={(e) => {
                  setEmployeeFirstName(e.target.value);
                }}
              />
            </div>
            <div className="field">
              <label>Lastname</label>
              <input
                placeholder="Lastname..."
                required
                value={employeeLastName}
                onChange={(e) => {
                  setEmployeeLastName(e.target.value);
                }}
              />
            </div>
            <div className="field">
              <label>Date of birth</label>
              <input
                type="date"
                required
                value={employeeDateOfBirth}
                onChange={(e) => {
                  setEmployeeDateOfBirth(e.target.value);
                }}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                placeholder="Email..."
                type="email"
                required
                value={employeeEmail}
                onChange={(e) => {
                  setEmployeeEmail(e.target.value);
                }}
              />
            </div>
            <div className="field">
              <label>Phone number</label>
              <input
                placeholder="Phone..."
                type="tel"
                required
                value={employeeTel}
                onChange={(e) => {
                  setEmployeeTel(e.target.value);
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
                GeneralCtx.setEmployeeUpdateValues(
                  false,
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  ""
                );
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

export default EmployeeUpdateModal;
