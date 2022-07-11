import React from "react";
import { Button } from "antd";
import "./styles.scss";

export default function Loader() {
  return (
    <div className="loader-container" style={{ textAlign: "center" }}>
      <Button shape="circle" loading className="loader" />
    </div>
  );
}
