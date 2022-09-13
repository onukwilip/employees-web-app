import React from "react";

const Unauthorized = () => {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "red" }}>
        You are NOT authorized to access this page!
      </h1>
    </section>
  );
};

export default Unauthorized;
