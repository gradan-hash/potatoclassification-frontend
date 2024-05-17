import React from "react";
import Navbar from "./Navbar";
import ImageUpload from "./ImageUpload";

const Homepage = () => {
  return (
    <div style={{ background: "lightgrey", minHeight: "100vh" }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}>
        <ImageUpload />
      </div>
    </div>
  );
};

export default Homepage;
