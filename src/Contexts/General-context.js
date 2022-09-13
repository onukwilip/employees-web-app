import { useState, createContext } from "react";

//GENERAL CONTEXT
const GeneralContext = createContext({
  loginStatus: "",
  departmentUpdateModal: "",
  employeeUpdateModal: "",
  departmentUpdateValues: {
    id: "",
    name: "",
  },
  employeeUpdateValues: {
    id: "",
    firstname: "",
    lastname: "",
    date_of_birth: "",
    email: "",
    phone: "",
    department: "",
  },
  setDepartmentUpdateValues: (state, id, name) => {},
  setEmployeeUpdateValues: (
    state,
    id,
    firstname,
    lastname,
    date_of_birth,
    email,
    phone,
    department
  ) => {},
  setLoginStatus: (state) => {},
  encrypt: (string) => {},
  decrypt: (string) => {},
  setAuthenticated: (state) => {},
  encryptedKey: "",
  encryptedToken: "",
  authenticated: "",
  emailToUpdate: "",
  setEmailToUpdate: (email) => {},
  transformers: "",
  addTransformer: (newTransformers) => {},
  verifiedState: (
    userId,
    id,
    verified,
    business,
    capacity,
    city,
    location,
    name,
    region,
    service_center,
    state
  ) => {},
  editTransformer: (
    userId,
    id,
    verified,
    business,
    capacity,
    city,
    location,
    name,
    region,
    service_center,
    state
  ) => {},
  transformerToUpdate: {
    userId: "",
    id: "",
    verified: "",
    business: "",
    capacity: "",
    city: "",
    location: "",
    name: "",
    region: "",
    service_center: "",
    state: "",
    editType: "",
  },
  setTransformerToUpdate: (
    userId,
    id,
    verified,
    business,
    capacity,
    city,
    location,
    name,
    region,
    service_center,
    state,
    editType
  ) => {},
  deleteTransformer: (id) => {},
  transformerModalState: "",
  setTransformerModalState: (state) => {},
  setTransformers: (transformers) => {},
});

//GENERAL CONTEXT COMPONENT
export function GeneralContextComponent(props) {
  //LOGIN
  const [loginState, setLoginState] = useState(
    JSON.parse(localStorage.getItem("loginState"))
  );
  //DEPARTMENTS
  const [modalState, setModalState] = useState(false);
  const [departmentID, setDepartmentID] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  //EMPLOYEES
  const [employeeModalState, setEmployeeModalState] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeFirstName, setEmployeeFirstName] = useState("");
  const [employeeLastName, setEmployeeLastName] = useState("");
  const [employeeDateOfBirth, setEmployeeDateOfBirth] = useState("");
  const [employeeTel, setEmployeeTel] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  //OTHERS
  const [emailToUpdate, setEmailToUpdate] = useState("");
  const encryptedToken =
    "VW1WaFkzUlFjbTlxWldOMFFWQkpPbE5YUlVaS0xURTROelkwTFVoRVRreFhMVGszTXpJdw==";
  const encryptedKey =
    "U0NCVU9WSC1SNjNZOVI4NC1VVEpHUlFHODUtOFQ1OUlIRk9VLUI5NDhUNDg3US1HNEJVSTA5VThV";
  const [authenticated, setAuthenticated] = useState(false);
  //TRANSFORMERS
  const [transformers, setTransformers] = useState([]);
  const [transformerToUpdate, setTransformeToUpdate] = useState({
    userId: "",
    id: "",
    verified: "",
    business: "",
    capacity: "",
    city: "",
    location: "",
    name: "",
    region: "",
    service_center: "",
    state: "",
    editType: "",
  });
  const [transformerModalState, setTransformerModalState] = useState(false);

  //ADD TO TRANSFORMERS HANDLER
  function addTransformer(newTransformers) {
    let oldTransformers = [...transformers, ...newTransformers];
    setTransformers(oldTransformers);
    console.log("All transformers ", oldTransformers);
  }

  //SET TRANSFORMER TO UPDATE
  function setTransformerToUpdate(
    userId,
    id,
    verified,
    business,
    capacity,
    city,
    location,
    name,
    region,
    service_center,
    state,
    editType
  ) {
    const transformer = {
      userId: userId,
      id: id,
      verified: verified,
      business: business,
      capacity: capacity,
      city: city,
      location: location,
      name: name,
      region: region,
      service_center: service_center,
      state: state,
      editType: editType,
    };

    setTransformeToUpdate({ ...transformer });
    console.log("Transformer to update values ", transformer);
    setTransformerModalState(true);
  }

  //UPDATE VERIFIED STATE
  function verifiedState(
    userId,
    id,
    verified,
    business,
    capacity,
    city,
    location,
    name,
    region,
    service_center,
    state
  ) {
    const oldTransformers = [...transformers];

    const index = oldTransformers.findIndex((eachData) => eachData.id === id);

    oldTransformers[index] = {
      userId: userId,
      id: id,
      verified: !verified,
      BUSINESS_HUB: business,
      CAPACITY: capacity,
      CITY: city,
      LOCATION: location,
      NAME: name,
      REGION: region,
      SERVICE_CENTER: service_center,
      STATE: state,
    };

    setTransformers(oldTransformers);

    console.log("Updated Row", oldTransformers[index]);
  }

  //EDIT TRANSFORMER
  function editTransformer(
    userId,
    id,
    verified,
    business,
    capacity,
    city,
    location,
    name,
    region,
    service_center,
    state
  ) {
    const oldTransformers = [...transformers];

    const index = oldTransformers.findIndex((eachData) => eachData.id === id);

    oldTransformers[index] = {
      userId: userId,
      id: id,
      verified: verified,
      BUSINESS_HUB: business,
      CAPACITY: capacity,
      CITY: city,
      LOCATION: location,
      NAME: name,
      REGION: region,
      SERVICE_CENTER: service_center,
      STATE: state,
    };

    setTransformers(oldTransformers);

    console.log("Updated Row", oldTransformers[index]);
  }

  //DELETE TRANSFORMER
  function deleteTransformer(id) {
    setTransformers((oldTransformers) => {
      return oldTransformers.filter((eachData) => eachData.id !== id);
    });

    console.log("Transformer with id '" + id + "' deleted successfully...");
  }

  //SET EMAIL TO UPDATE HANDLER
  function setEmailToUpdateHandler(email) {
    setEmailToUpdate(email);
  }

  //SET AUTHENTICATED HANDLER
  function setAuthenticatedHandler(state) {
    setAuthenticated(state);
  }

  //ENCRYPT FUNCTION
  function encrypt(string) {
    var cipher = window.btoa(string);
    return cipher;
  }

  //DECRYPT FUNCTION
  function decrypt(string) {
    var decipher = window.atob(string);
    return decipher;
  }

  //SET DEPARTMENT UPDATE VALUES
  function setDepartmentUpdateValues(state, id, name) {
    setModalState(state);
    setDepartmentID(id);
    setDepartmentName(name);
  }

  //SET EMPLOYEE UPDATE VALUES
  function setEmployeeUpdateValues(
    state,
    id,
    firstname,
    lastname,
    date_of_birth,
    email,
    phone,
    department
  ) {
    setEmployeeModalState(state);
    setEmployeeId(id);
    setEmployeeFirstName(firstname);
    setEmployeeLastName(lastname);
    setEmployeeDateOfBirth(date_of_birth);
    setEmployeeEmail(email);
    setEmployeeTel(phone);
    setEmployeeDepartment(department);
  }

  //SET LOGIN STATUS
  function setLoginStatus(state) {
    setLoginState(state);
  }

  //GENERAL CONTEXT CONTENT
  const context = {
    loginStatus: loginState,
    departmentUpdateModal: modalState,
    employeeUpdateModal: employeeModalState,
    departmentUpdateValues: {
      id: departmentID,
      name: departmentName,
    },
    employeeUpdateValues: {
      id: employeeId,
      firstname: employeeFirstName,
      lastname: employeeLastName,
      date_of_birth: employeeDateOfBirth,
      email: employeeEmail,
      phone: employeeTel,
      department: employeeDepartment,
    },
    setDepartmentUpdateValues: setDepartmentUpdateValues,
    setEmployeeUpdateValues: setEmployeeUpdateValues,
    setLoginStatus: setLoginStatus,
    encrypt: encrypt,
    decrypt: decrypt,
    setAuthenticated: setAuthenticatedHandler,
    encryptedKey: encryptedKey,
    encryptedToken: encryptedToken,
    authenticated: authenticated,
    emailToUpdate: emailToUpdate,
    setEmailToUpdate: setEmailToUpdateHandler,
    transformers: transformers,
    addTransformer: addTransformer,
    verifiedState: verifiedState,
    editTransformer: editTransformer,
    transformerToUpdate: transformerToUpdate,
    setTransformerToUpdate: setTransformerToUpdate,
    deleteTransformer: deleteTransformer,
    transformerModalState: transformerModalState,
    setTransformerModalState: setTransformerModalState,
    setTransformers: setTransformers,
  };

  //RETURN JSX
  return (
    <GeneralContext.Provider value={context}>
      {props.children}
    </GeneralContext.Provider>
  );
}

export default GeneralContext;
