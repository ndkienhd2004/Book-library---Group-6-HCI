import React from "react";
import "./InputField.css";

const InputField = ({ placeholder, style, value, onChange, error }) => {
  return (
    <div style={{ width: "100%" }}>
      <input
        type="text"
        autoComplete="off"
        name="text"
        className={`input ${error ? "error" : ""}`}
        placeholder={placeholder}
        style={{
          ...styles.input,
          ...(error ? styles.inputError : {}),
          ...style,
        }}
        value={value}
        onChange={onChange}
      />
      {error && <p style={styles.errorText}>{error}</p>}{" "}
    </div>
  );
};

export default InputField;

const styles = {
  input: {
    border: "none",
    outline: "none",
    borderRadius: "15px",
    padding: "1em",
    backgroundColor: "#ccc",
    boxShadow: "inset 2px 5px 10px rgba(0,0,0,0.3)",
    transition: "300ms ease-in-out",
    width: "100%",
  },
  inputError: {
    border: "2px solid red",
    boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
    fontWeight: "bold",
    textAlign: "left",
  },
};
