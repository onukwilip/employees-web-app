import React, { useState, useContext, useEffect } from "react";
import { Table } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import GeneralContext from "../Contexts/General-context";
import axios from "axios";

const EditTransformer = () => {
  const navigate = useNavigate();
  const GeneralCtx = useContext(GeneralContext);
  const [allTransformers, setAllTransformers] = useState([]);
  const role = JSON.parse(localStorage.getItem("Role"));
  const url = `https://localhost:44318/api/transformers/`;
  const decryptedToken = GeneralCtx.decrypt(GeneralCtx.encryptedToken);
  const decryptedKey = GeneralCtx.decrypt(GeneralCtx.encryptedKey);

  useEffect(() => {
    setAllTransformers(GeneralCtx.transformers);
  }, [GeneralCtx.transformers]);

  useEffect(() => {
    if (role !== "Admin") {
      navigate("/unauthorized", { replace: true });
    }
  }, []);

  const uploadTransformers = (e) => {
    e.preventDefault();

    const transformersToUpload = GeneralCtx.transformers.filter(
      (transformer) => transformer.verified === true
    );

    const newTransformers = GeneralCtx.transformers.filter(
      (transformer) => transformer.verified === false
    );
    GeneralCtx.setTransformers(newTransformers);
    console.log("Transformers to upload", transformersToUpload);

    axios
      .post(url, transformersToUpload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          ApiKey: decryptedKey,
          Authorization: "basic " + decryptedToken,
        },
      })
      .then((response) => {
        console.log("Response ", response.data);
      })
      .catch((e) => {
        console.log("Error ", e);
      });
  };

  if (role === "Admin") {
    return (
      <section align="center">
        <h1>Edit Transformers</h1>
        <br></br>
        <div style={{ maxHeight: "350px", overflowY: "auto" }}>
          <Table celled inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Verify</Table.HeaderCell>
                <Table.HeaderCell>User ID</Table.HeaderCell>
                <Table.HeaderCell>Business hub</Table.HeaderCell>
                <Table.HeaderCell>Capacity</Table.HeaderCell>
                <Table.HeaderCell>City</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Region</Table.HeaderCell>
                <Table.HeaderCell>Service center</Table.HeaderCell>
                <Table.HeaderCell>State</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {allTransformers.map((eachRow, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell textAlign="left">
                      <input
                        type="checkbox"
                        checked={eachRow.verified ? true : false}
                        onChange={() => {
                          GeneralCtx.verifiedState(
                            eachRow.userId,
                            eachRow.id,
                            eachRow.verified,
                            eachRow.BUSINESS_HUB,
                            eachRow.CAPACITY,
                            eachRow.CITY,
                            eachRow.LOCATION,
                            eachRow.NAME,
                            eachRow.REGION,
                            eachRow.SERVICE_CENTER,
                            eachRow.STATE
                          );
                        }}
                      />
                    </Table.Cell>
                    <Table.Cell textAlign="left">{eachRow.userId}</Table.Cell>
                    <Table.Cell textAlign="left">
                      {eachRow.BUSINESS_HUB}
                    </Table.Cell>
                    <Table.Cell textAlign="left">{eachRow.CAPACITY}</Table.Cell>
                    <Table.Cell textAlign="left">{eachRow.CITY}</Table.Cell>
                    <Table.Cell textAlign="left">{eachRow.LOCATION}</Table.Cell>
                    <Table.Cell textAlign="left">{eachRow.NAME}</Table.Cell>
                    <Table.Cell textAlign="left">{eachRow.REGION}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {eachRow.SERVICE_CENTER}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{eachRow.STATE}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
        <br />
        <div align="right" style={{ width: "100%" }}>
          <button onClick={uploadTransformers}>Upload...</button>
          <button
            onClick={() => {
              GeneralCtx.setTransformers([]);
            }}
          >
            Clear all
          </button>
        </div>

        <br />
        <p>Total number of transformers added: {allTransformers.length}</p>
      </section>
    );
  } else {
    return <div>You are NOT authorized to access this page!</div>;
  }
};

export default EditTransformer;
