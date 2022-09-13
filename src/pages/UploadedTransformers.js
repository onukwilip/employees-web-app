import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table } from "semantic-ui-react";
import GeneralContext from "../Contexts/General-context";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const UploadedTransformers = () => {
  const navigate = useNavigate();
  const GeneralCtx = useContext(GeneralContext);
  const [uploadedTransformers, setUploadedTransformers] = useState([]);
  const role = JSON.parse(localStorage.getItem("Role"));
  const [loading, setLodaing] = useState(false);
  const url = `https://localhost:44318/api/transformers/`;
  const decryptedToken = GeneralCtx.decrypt(GeneralCtx.encryptedToken);
  const decryptedKey = GeneralCtx.decrypt(GeneralCtx.encryptedKey);
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      ApiKey: decryptedKey,
      Authorization: "basic " + decryptedToken,
    },
  };

  const getAllTransformers = () => {
    axios
      .get(url, config)
      .then((response) => {
        setUploadedTransformers(response.data);
        console.log("Response ", response.data);
        setLodaing(false);
      })
      .catch((error) => {
        console.log("Error ", error);
      });
  };

  useEffect(() => {
    if (role !== "Admin") {
      navigate("/unauthorized", { replace: true });
    }
  }, []);

  useEffect(() => {
    setLodaing(true);
    getAllTransformers();
  }, [GeneralCtx.transformerModalState]);

  const deleteTransformer = (id) => {
    axios
      .delete(url + `${id}`, config)
      .then((response) => {
        console.log("Response ", response.data);
        getAllTransformers();
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  if (role === "Admin") {
    if (loading) {
      return <Loading />;
    } else {
      return (
        <section align="center">
          <h1>Uploaded Transformers</h1>
          <div style={{ maxHeight: "350px", overflowY: "auto" }}>
            <Table celled inverted selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Business hub</Table.HeaderCell>
                  <Table.HeaderCell>Capacity</Table.HeaderCell>
                  <Table.HeaderCell>City</Table.HeaderCell>
                  <Table.HeaderCell>Location</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Region</Table.HeaderCell>
                  <Table.HeaderCell>Service center</Table.HeaderCell>
                  <Table.HeaderCell>State</Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {uploadedTransformers.map((eachRow, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell textAlign="left">
                        {eachRow.Business_Hub}
                      </Table.Cell>
                      <Table.Cell textAlign="left">
                        {eachRow.Capacity}
                      </Table.Cell>
                      <Table.Cell textAlign="left">{eachRow.City}</Table.Cell>
                      <Table.Cell textAlign="left">
                        {eachRow.Location}
                      </Table.Cell>
                      <Table.Cell textAlign="left">{eachRow.Name}</Table.Cell>
                      <Table.Cell textAlign="left">{eachRow.Region}</Table.Cell>
                      <Table.Cell textAlign="center">
                        {eachRow.Service_Center}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {eachRow.State}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <button
                          onClick={() => {
                            GeneralCtx.setTransformerToUpdate(
                              eachRow.UserID,
                              eachRow.Id,
                              true,
                              eachRow.Business_Hub,
                              eachRow.Capacity,
                              eachRow.City,
                              eachRow.Location,
                              eachRow.Name,
                              eachRow.Region,
                              eachRow.Service_Center,
                              eachRow.State,
                              "permanent"
                            );
                          }}
                        >
                          EDIT
                        </button>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <button
                          onClick={() => {
                            deleteTransformer(eachRow.Id);
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
          </div>
          <br />
          <p>
            Total number of transformers added by you:{" "}
            {uploadedTransformers.length}
          </p>
        </section>
      );
    }
  } else {
    return <div>You are NOT authorized to access this page!</div>;
  }
};

export default UploadedTransformers;
