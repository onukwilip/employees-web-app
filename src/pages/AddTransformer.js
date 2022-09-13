import React, { useState, useContext, useEffect } from "react";
import * as XLSX from "xlsx";
import { Table } from "semantic-ui-react";
import GeneralContext from "../Contexts/General-context";

const AddTransformer = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const GeneralCtx = useContext(GeneralContext);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
        console.log("Error ", error);
      };
    });

    promise.then((data) => {
      const newData = data.map((each, index) => ({
        userId: JSON.parse(localStorage.getItem("UserId")),
        id: index,
        verified: false,
        ...each,
      }));
      GeneralCtx.addTransformer(newData);
    });
  };

  useEffect(() => {
    const data = GeneralCtx.transformers.filter((transformer) => {
      return transformer?.userId === JSON.parse(localStorage.getItem("UserId"));
    });
    setRows(data);
    console.log("Rows ", data);
  }, [GeneralCtx.transformers]);

  return (
    <section align="center">
      <h1>Add Transformer</h1>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];

          if (
            file?.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ) {
            readExcel(file);
            setError(false);
          } else {
            setError(true);
          }
        }}
      />
      <br />
      <div>{error && <p style={{ color: "red" }}>Invalid file type</p>}</div>
      <br />
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
            {rows.map((eachRow, index) => {
              return (
                <Table.Row key={index}>
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
                  <Table.Cell textAlign="center">
                    <button
                      onClick={() => {
                        GeneralCtx.setTransformerToUpdate(
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
                          eachRow.STATE,
                          "temporary"
                        );
                      }}
                    >
                      EDIT
                    </button>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <button
                      onClick={() => {
                        GeneralCtx.deleteTransformer(eachRow.id);
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
      <button>Clear all</button>
      <br />
      <p>Total number of transformers added by you: {rows.length}</p>
    </section>
  );
};

export default AddTransformer;
