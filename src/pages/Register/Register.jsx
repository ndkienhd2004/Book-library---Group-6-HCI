import { Stack } from "@mui/material";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import RegisterBackgroundImage from "../../assets/loginBackground.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

  const onEmailInputChanged = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };
  const onPasswordInputChanged = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };
  const onConfirmedPasswordInputChanged = (e) => {
    setConfirmedPassword(e.target.value);
    setConfirmPasswordErr("");
  };
  const validateForm = () => {
    let valid = true;
    if (email === "") {
      setEmailErr("Vui lòng nhập họ và tên");
      valid = false;
    }
    if (password === "") {
      setPasswordErr("Vui lòng nhập mật khẩu");
      valid = false;
    }
    if (confirmedPassword === "") {
      setConfirmPasswordErr("Vui lòng nhập mật khẩu");
      valid = false;
    }
    if (password.length < 8 && password !== "") {
      setPasswordErr("Mật khẩu phải có ít nhất 8 kí tự");
      valid = false;
    }
    if (confirmedPassword !== password && password !== "") {
      setConfirmPasswordErr("Mật khẩu không khớp");
      valid = false;
    }
    return valid;
  };

  const handleRegisterButtonClicked = () => {
    if (validateForm()) {
      console.log("Login successful");
      navigate("/");
    } else {
      console.log("Login failed");
    }
  };
  return (
    <Stack sx={styles.Register}>
      <div style={styles.leftOutline}>
        <h1 style={styles.Header}>Sign Up</h1>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Email</label>
          <InputField
            placeholder="Email"
            style={styles.inputField}
            value={email}
            onChange={onEmailInputChanged}
            error={emailErr}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Password</label>
          <InputField
            placeholder="Password"
            style={styles.inputField}
            value={password}
            onChange={onPasswordInputChanged}
            error={passwordErr}
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Repassword</label>
          <InputField
            placeholder="Confirm password"
            style={styles.inputField}
            value={confirmedPassword}
            onChange={onConfirmedPasswordInputChanged}
            error={confirmPasswordErr ? "Invalid email format" : ""}
          />
        </div>
        <Button
          placeholder={"REGISTER"}
          style={{ marginTop: "10px" }}
          onClick={handleRegisterButtonClicked}
        />
      </div>
      <div style={styles.rightOutline}>
        <div style={styles.rightOutlineText}>
          <h3
            style={{ color: "#34312D", marginBottom: "0px", fontSize: "24px" }}
          >
            Hey
          </h3>
          <h3 style={{ color: "#34312D", fontSize: "24px" }}>
            Welcome to BookLibrary
          </h3>
        </div>
      </div>
    </Stack>
  );
};
export default Register;

const styles = {
  Register: {
    display: "flex",
    flexDirection: "row",
    overflowX: "hidden",
    overflowY: "hidden",
    width: "90vw",
    height: "80vh",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    marginTop: "5vh",
    borderRadius: 10,
  },
  leftOutline: {
    flex: 1,
    height: "100%",
    backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  rightOutline: {
    flex: 1,
    height: "100%",
    backgroundColor: "#f5f5f5",
    backgroundImage: `url(${RegisterBackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    position: "relative",
  },
  Header: {
    color: "#34312D",
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "6rem",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    marginBottom: "1rem",
    alignItems: "flex-start",
  },
  label: {
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "5px",
    color: "#34312D",
  },
  inputField: {
    width: "100%",
    fontFamily: "Montserrat, sans-serif",
  },
  rightOutlineText: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    textAlign: "left",
  },
};
