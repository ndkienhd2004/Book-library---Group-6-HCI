import { Alert, Snackbar, Stack } from "@mui/material";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import loginBackgroundImage from "../../assets/images/LoginBackground.png";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as auth from "../../apis/auth";
import AppContext from "../../context/context";
import Loading from "../../components/Loading/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmailErr, setUserEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const { login: setAuthToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const mutation = useMutation({
    mutationFn: auth.login,
    onSuccess: (data) => {
      setSuccessMessage("Login successful!");
      setTimeout(() => {
        setAuthToken(data.data);
        navigate("/");
        setLoading(false);
      }, 500);
    },

    onError: (error) => {
      setErrorMessage(error.response.data || "Login failed. Please try again.");
      setTimeout(() => {
        setLoading(false);
      }, 500);
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
      mutation.mutate({ email: email, password: password });
      setLoading(true);
    } else {
      setErrorMessage("Login failed due to invalid form input.");
    }
  };

  return (
    <>
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
              type="password"
            />
          </div>
          {loading ? (
            <Loading size={32} />
          ) : (
            <Button
              placeholder={"LOGIN"}
              style={{ marginTop: "10px" }}
              onClick={(e) => handleLoginButtonClicked(e)}
            />
          )}
        </div>
        <div style={styles.rightOutline}>
          <div style={styles.rightOutlineText}>
            <h3
              style={{
                color: "#34312D",
                marginBottom: "0px",
                fontSize: "24px",
              }}
            >
              Hey
            </h3>
            <h3 style={{ color: "#34312D", fontSize: "24px" }}>
              Welcome to BookLibrary
            </h3>
          </div>
        </div>
      </Stack>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => {
          setSuccessMessage("");
        }}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
    </>
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
