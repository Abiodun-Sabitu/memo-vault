import React from "react";
import { Button } from "antd";

type HtmlType = "button" | "submit" | "reset"; // Define HtmlType explicitly

const CustomButton: React.FC<{
  label: React.ReactNode;
  color: string;
  htmlType: HtmlType;
  onClick: () => void;
}> = ({ label, color, onClick, htmlType }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexDirection: "column",
    }}
  >
    <Button
      htmlType={htmlType}
      onClick={onClick}
      style={{
        backgroundColor: color,
        color: "white",
        paddingTop: "20px",
        paddingBottom: "20px",
        border: "none",
      }}
      className="no-focus-outline"
    >
      {label}
    </Button>
  </div>
);

export default CustomButton;
