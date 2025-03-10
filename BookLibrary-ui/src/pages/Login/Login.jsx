import { Stack } from "@mui/material";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import loginBackgroundImage from "../../assets/images/LoginBackground.png";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../apis/auth";
import AppContext from "../../context/context";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmailErr, setUserEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const { login: setAuthToken } = useContext(AppContext);
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      navigate("/");
      setAuthToken(data.data.token);
      console.log(data.data.token);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const onUsernameInputChanged = (e) => {
    setEmail(e.target.value);
    setUserEmailErr("");
  };

  const onPasswordInputChanged = (e) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };

  const validateForm = () => {
    let valid = true;

    if (email === "") {
      setUserEmailErr("Vui lòng nhập email");
      valid = false;
    }
    if (password === "") {
      setPasswordErr("Vui lòng nhập mật khẩu");
      valid = false;
    }

    return valid;
  };

  const handleLoginButtonClicked = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("emai:", email);
      console.log("password:", password);
      mutation.mutate({ email: email, password: password });
    } else {
      console.log("Login failed");
    }
  };

  return (
    <Stack sx={styles.Login}>
      <div style={styles.leftOutline}>
        <h1 style={styles.Header}>Sign In</h1>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Email</label>
          <InputField
            placeholder="Email"
            style={styles.inputField}
            value={email}
            onChange={onUsernameInputChanged}
            error={userEmailErr}
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
        <Button
          placeholder={"LOGIN"}
          style={{ marginTop: "10px" }}
          onClick={(e) => handleLoginButtonClicked(e)}
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
export default Login;

const styles = {
  Login: {
    display: "flex",
    flexDirection: "row",
    overflowX: "hidden",
    overflowY: "hidden",
    width: "90vw",
    height: "80vh",
    backgroundColor: "white",
    alignItems: "center",
    marginTop: "5vh",
    borderRadius: 10,
  },
  leftOutline: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.2)",
    borderTopLeftRadius: "15px", // Bo góc trái trên
    borderBottomLeftRadius: "15px",
    position: "relative",
    zIndex: 2,
  },
  rightOutline: {
    flex: 1,
    height: "100%",
    backgroundColor: "#f5f5f5",
    backgroundImage: `url(${loginBackgroundImage})`,
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
