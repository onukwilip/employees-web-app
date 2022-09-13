import { useContext, useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import axios from "axios";
import GeneralContext from "../Contexts/General-context";
import { useNavigate } from "react-router-dom";

function Department() {
  const navigate = useNavigate();
  const [departmentsData, setDepartmentsData] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const GeneralCtx = useContext(GeneralContext);
  const url = `https://localhost:44318/api/values/`;
  const decryptedToken = GeneralCtx.decrypt(GeneralCtx.encryptedToken);
  const decryptedKey = GeneralCtx.decrypt(GeneralCtx.encryptedKey);
  const role = JSON.parse(localStorage.getItem("Role"));

  function getData() {
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
  }

  function caeserCipher(str, num) {
    num = num % 26;
    var lowerCaseStr = str.toLowerCase();
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    var newStr = "";

    for (var i = 0; i < lowerCaseStr.length; i++) {
      var currentLetter = lowerCaseStr[i];
      if (currentLetter === " ") {
        newStr += currentLetter;
        continue;
      }
      var currentIndex = alphabet.indexOf(currentLetter);
      var newIndex = currentIndex + num;
      if (newIndex > 25) {
        newIndex = newIndex - 26;
      }
      if (newIndex < 0) {
        newIndex = newIndex + 26;
      }
      if (str[i] === str[i].toUpperCase()) {
        newStr += alphabet[newIndex].toUpperCase();
      } else {
        newStr += alphabet[newIndex];
      }
    }

    return newStr;
  }

  //VALIDATE ROLE
  useEffect(() => {
    if (role !== "Admin") {
      navigate("/unauthorized", { replace: true });
    }
  }, []);

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
  }, [GeneralCtx.departmentUpdateModal]);

  const style = {
    width: 40 + "%",
  };

  function postNewDepartment(e) {
    e.preventDefault();

    const newData = {
      DepartmentName: departmentName,
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
        getData();
        setDepartmentName("");
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
        console.log("Response", response);
        getData();
      });
  }

  if (role === "Admin") {
    return (
      <section style={style}>
        <h1>Department</h1>
        <h3>Add Department</h3>
        <section>
          <form className="ui form" onSubmit={postNewDepartment}>
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
            <button className="ui button" type="submit">
              Add department
            </button>
          </form>
        </section>

        <Table celled inverted selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {departmentsData.map((eachDepartment) => {
              return (
                <Table.Row key={eachDepartment.Id}>
                  <Table.Cell>{eachDepartment.Id}</Table.Cell>
                  <Table.Cell textAlign="left">
                    {eachDepartment.DepartmentName}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <button
                      className="ui button"
                      onClick={() => {
                        GeneralCtx.setDepartmentUpdateValues(
                          true,
                          eachDepartment.Id,
                          eachDepartment.DepartmentName
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
                        deleteData(eachDepartment.Id);
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
      </section>
    );
  } else {
    return <div>You are NOT authorized to access this page!</div>;
  }
  return (
    <section style={style}>
      <h1>Department</h1>
      <h3>Add Department</h3>
      <section>
        <form className="ui form" onSubmit={postNewDepartment}>
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
          <button className="ui button" type="submit">
            Add department
          </button>
        </form>
      </section>

      <Table celled inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {departmentsData.map((eachDepartment) => {
            return (
              <Table.Row key={eachDepartment.Id}>
                <Table.Cell>{eachDepartment.Id}</Table.Cell>
                <Table.Cell textAlign="left">
                  {eachDepartment.DepartmentName}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <button
                    className="ui button"
                    onClick={() => {
                      GeneralCtx.setDepartmentUpdateValues(
                        true,
                        eachDepartment.Id,
                        eachDepartment.DepartmentName
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
                      deleteData(eachDepartment.Id);
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
    </section>
  );
}

export default Department;
