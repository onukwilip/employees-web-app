import { Fragment, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeUpdateModal from "./components/EmployeeUpdateModal";
import UpdateModal from "./components/UpdateModal";
import GeneralContext from "./Contexts/General-context";
import Department from "./pages/Department";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import Layout from "./UI/Layout";
import Home from "./pages/Home";
import ChangePassword from "./pages/Change password";
import ConfirmOTP from "./pages/Confirm OTP";
import ForgotPassword from "./pages/Forgot password";
import AddTransformer from "./pages/AddTransformer";
import EditTransformer from "./pages/EditTransformer";
import TransformerEditModal from "./components/TransformerEditModal";
import UploadedTransformers from "./pages/UploadedTransformers";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const GeneralCtx = useContext(GeneralContext);

  if (!GeneralCtx.loginStatus) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/confirm-otp" element={<ConfirmOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
      </Routes>
    );
  } else {
    return (
      <>
        {GeneralCtx.transformerModalState && <TransformerEditModal />}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/department" element={<Department />}></Route>
            <Route path="/employees" element={<Employees />}></Route>
            <Route path="/add-transformer" element={<AddTransformer />}></Route>
            <Route
              path="/uploaded-transformers"
              element={<UploadedTransformers />}
            ></Route>
            <Route
              path="/edit-transformer"
              element={<EditTransformer />}
            ></Route>
            <Route path="/unauthorized" element={<Unauthorized />}></Route>
          </Routes>
          {GeneralCtx.departmentUpdateModal && <UpdateModal />}
          {GeneralCtx.employeeUpdateModal && <EmployeeUpdateModal />}
        </Layout>
      </>
    );
  }
}

export default App;
