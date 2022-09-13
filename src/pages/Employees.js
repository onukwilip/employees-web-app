import { useContext, useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import axios from "axios";
import GeneralContext from "../Contexts/General-context";
import { useNavigate } from "react-router-dom";

function Employees() {
  const navigate = useNavigate();
  const [departmentsData, setDepartmentsData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeFirstName, setemployeeFirstName] = useState("");
  const [employeeLastName, setemployeeLastName] = useState("");
  const [employeeDateOfBirth, setEmployeeDateOfBirth] = useState("");
  const [employeeTel, setEmployeeTel] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const GeneralCtx = useContext(GeneralContext);
  const url = `https://localhost:44318/api/employee/`;
  const depUrl = `https://localhost:44318/api/values/`;
  const decryptedToken = GeneralCtx.decrypt(GeneralCtx.encryptedToken);
  const decryptedKey = GeneralCtx.decrypt(GeneralCtx.encryptedKey);
  const role = JSON.parse(localStorage.getItem("Role"));

  function getEmployeeData() {
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
        setEmployeeData(alldata);
        console.log("Employee data", employeeData);
      });
  }

  //VALIDATE ROLE
  useEffect(() => {
    if (role !== "Admin") {
      navigate("/unauthorized", { replace: true });
    }
  }, []);

  //GET DEPARTMENTS
  useEffect(() => {
    axios
      .get(depUrl, {
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
  }, [GeneralCtx.departmentUpdateModal]);

  //GET EMPLOYEES
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
        setEmployeeData(alldata);
        console.log("Employee data", employeeData);
      });
  }, [GeneralCtx.employeeUpdateModal]);

  const style = {
    width: "auto",
  };

  function postNewEmployee(e) {
    e.preventDefault();

    const newData = {
      FirstName: employeeFirstName,
      LastName: employeeLastName,
      Date_Of_Birth: employeeDateOfBirth,
      Email: employeeEmail,
      Phone_Number: employeeTel,
      Department: employeeDepartment,
      Password: "123456",
    };

    axios
      .post(
        url,
        { ...newData },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            ApiKey: decryptedKey,
            Authorization: "basic " + decryptedToken,
          },
        }
      )
      .then((response) => {
        console.log("Response", response.data);
        console.log("Employee data", newData);
        getEmployeeData();
      });
  }

  function deleteData(id) {
    axios
      .delete(url + `${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          ApiKey: decryptedKey,
          Authorization: "basic " + decryptedToken,
        },
      })
      .then((response) => {
        console.log("Data with id " + id + " deleted successfully");
        console.log("Response", response);
        getEmployeeData();
      });
  }

  if (role === "Admin") {
    return (
      <section style={style}>
        <h1>Employees</h1>

        <h3>Add Employees</h3>
        <section>
          <form className="ui form" onSubmit={postNewEmployee}>
            <div className="field">
              <label>Select department</label>
              <select
                name="departments"
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
                      key={eachDepartment.id}
                      value={eachDepartment.DepartmentName}
                    >
                      {eachDepartment.DepartmentName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="field">
              <label>Employee firstname</label>
              <input
                placeholder="Firstname"
                required
                value={employeeFirstName}
                onChange={(e) => {
                  setemployeeFirstName(e.target.value);
                }}
              />
            </div>
            <div className="field">
              <label>Employee lastname</label>
              <input
                placeholder="Lastname"
                required
                value={employeeLastName}
                onChange={(e) => {
                  setemployeeLastName(e.target.value);
                }}
              />
            </div>
            <div className="field">
              <label>Employee date of birth</label>
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
              <label>Employee email address</label>
              <input
                placeholder="Email address..."
                type="email"
                required
                value={employeeEmail}
                onChange={(e) => {
                  setEmployeeEmail(e.target.value);
                }}
              />
            </div>
            <div className="field">
              <label>Employee phone</label>
              <input
                placeholder="phone number"
                type="tel"
                required
                value={employeeTel}
                onChange={(e) => {
                  setEmployeeTel(e.target.value);
                }}
              />
            </div>
            <button className="ui button" type="submit">
              Add employee
            </button>
          </form>
        </section>

        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Firstname</Table.HeaderCell>
              <Table.HeaderCell>Lastname</Table.HeaderCell>
              <Table.HeaderCell>Date of birth</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone number</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {employeeData.map((eachEmployee) => {
              return (
                <Table.Row key={eachEmployee.Id}>
                  <Table.Cell>{eachEmployee.Id}</Table.Cell>
                  <Table.Cell textAlign="left">
                    {eachEmployee.FirstName}
                  </Table.Cell>
                  <Table.Cell textAlign="left">
                    {eachEmployee.LastName}
                  </Table.Cell>
                  <Table.Cell textAlign="left">
                    {eachEmployee.Date_Of_Birth}
                  </Table.Cell>
                  <Table.Cell textAlign="left">{eachEmployee.Email}</Table.Cell>
                  <Table.Cell textAlign="left">
                    {eachEmployee.Phone_Number}
                  </Table.Cell>
                  <Table.Cell textAlign="left">
                    {eachEmployee.Department}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <button
                      className="ui button"
                      onClick={() => {
                        GeneralCtx.setEmployeeUpdateValues(
                          true,
                          eachEmployee.Id,
                          eachEmployee.FirstName,
                          eachEmployee.LastName,
                          eachEmployee.Date_Of_Birth,
                          eachEmployee.Email,
                          eachEmployee.Phone_Number,
                          eachEmployee.Department
                        );
                      }}
                    >
                      EDIT
                    </button>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <button
                      className="ui button"
                      onClick={() => {
                        deleteData(eachEmployee.Id);
                      }}
                    >
                      DELETE
                    </button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <br></br>
        <br></br>
      </section>
    );
  } else {
    return <div>You are NOT authorized to access this page!</div>;
  }
}

export default Employees;
