import React, { useState, useContext, useEffect } from "react";
import css from "./TransformerEditModal.module.css";
import GeneralContext from "../Contexts/General-context";
import axios from "axios";

const TransformerEditModal = () => {
  const GeneralCtx = useContext(GeneralContext);
  //STATES
  const [userId, setUserId] = useState(GeneralCtx.transformerToUpdate.userId);
  const [id, setId] = useState(GeneralCtx.transformerToUpdate.id);
  const [verified, setVerified] = useState(
    GeneralCtx.transformerToUpdate.verified
  );
  const [businessHub, setBusinessHub] = useState(
    GeneralCtx.transformerToUpdate.business
  );
  const [capacity, setCapacity] = useState(
    GeneralCtx.transformerToUpdate.capacity
  );
  const [city, setCity] = useState(GeneralCtx.transformerToUpdate.city);
  const [location, setLocation] = useState(
    GeneralCtx.transformerToUpdate.location
  );
  const [name, setName] = useState(GeneralCtx.transformerToUpdate.name);
  const [region, setRegion] = useState(GeneralCtx.transformerToUpdate.region);
  const [serviceCenter, setServiceCenter] = useState(
    GeneralCtx.transformerToUpdate.service_center
  );
  const [state, setState] = useState(GeneralCtx.transformerToUpdate.state);
  const [editType, setEditType] = useState(
    GeneralCtx.transformerToUpdate.editType
  );
  //API
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

  //FUNCTIONS
  const submitHandler = (e) => {
    e.preventDefault();
    GeneralCtx.editTransformer(
      userId,
      id,
      verified,
      businessHub,
      capacity,
      city,
      location,
      name,
      region,
      serviceCenter,
      state
    );
    GeneralCtx.setTransformerModalState(false);
  };

  const cancelModal = (e) => {
    e.preventDefault();
    GeneralCtx.setTransformerModalState(false);
  };

  const updateTransformer = (e) => {
    e.preventDefault();
    const transformerToUpdate = {
      Business_Hub: businessHub,
      Capacity: capacity,
      City: city,
      Id: id,
      Location: location,
      Name: name,
      Region: region,
      Service_Center: serviceCenter,
      State: state,
      UserID: userId,
    };
    console.log("Transformer to update", transformerToUpdate);
    axios
      .put(url + `${id}`, transformerToUpdate, config)
      .then((response) => {
        console.log("Response ", response.data);
        GeneralCtx.setTransformerModalState(false);
      })
      .catch((e) => {
        console.log("Error ", e);
      });
  };

  return (
    <section className={css.modal_bg}>
      <div className={css.modal}>
        <h3 align="center">EDIT TRANSFORMER</h3>
        <form>
          <div className={css.form_layout}>
            <div>
              <label>
                BUSINESS HUB<br></br>
                <input
                  type="text"
                  value={businessHub}
                  onChange={(e) => {
                    setBusinessHub(e.target.value);
                  }}
                ></input>
              </label>
              <label>
                CAPACITY<br></br>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => {
                    setCapacity(e.target.value);
                  }}
                ></input>
              </label>
              <label>
                CITY<br></br>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                ></input>
              </label>
              <label>
                LOCATION<br></br>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                ></input>
              </label>
            </div>
            <div>
              <label>
                NAME<br></br>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </label>
              <label>
                REGION<br></br>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value);
                  }}
                ></input>
              </label>
              <label>
                SERVICE CENTER<br></br>
                <input
                  type="text"
                  value={serviceCenter}
                  onChange={(e) => {
                    setServiceCenter(e.target.value);
                  }}
                ></input>
              </label>
              <label>
                STATE<br></br>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                ></input>
              </label>
            </div>
          </div>
          <br />
          <label
            style={{
              textAlign: "right",
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={
                editType === "temporary" ? submitHandler : updateTransformer
              }
            >
              Update
            </button>
            <button onClick={cancelModal}>Cancel</button>
          </label>
        </form>
      </div>
    </section>
  );
};

export default TransformerEditModal;
