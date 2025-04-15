import { Alert, Snackbar, Stack } from "@mui/material";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import RegisterBackgroundImage from "../../assets/images/RegisterBackground.jpg";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as auth from "../../apis/auth";
import AppContext from "../../context/context";
import Loading from "../../components/Loading/Loading";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [fullname, setFullname] = useState("");
  const [fullnameErr, setFullnameErr] = useState("");
  const { login: setAuthToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ Thêm state cho thành công

  const onFullnameInputChanged = (e) => {
    setFullname(e.target.value);
    setFullnameErr("");
  };

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

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let valid = true;
    if (email === "") {
      setEmailErr("Vui lòng nhập email");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailErr("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
      valid = false;
    }
    if (fullname === "") {
      setFullnameErr("Vui lòng nhập họ và tên");
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

  const mutation = useMutation({
    mutationFn: auth.register,
    onSuccess: (data) => {
      setSuccessMessage("Đăng ký thành công!"); // ✅ Hiển thị Snackbar thành công
      setTimeout(() => {
        setAuthToken(data.data);
        navigate("/");
        setLoading(false);
      }, 500);
    },
    onError: (error) => {
      setErrorMessage(
        error.response.data.errorResponse.errmsg ||
          "Đăng ký thất bại. Vui lòng thử lại."
      );
      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
  });

  const handleRegisterButtonClicked = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate({ email, password, fullname });
      setLoading(true);
    } else {
      setErrorMessage("Đăng ký thất bại do nhập sai thông tin.");
    }
  };

  return (
    <>
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
            <label style={styles.label}>Fullname</label>
            <InputField
              placeholder="Enter your fullname"
              style={styles.inputField}
              value={fullname}
              onChange={onFullnameInputChanged}
              error={fullnameErr}
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
          <div style={styles.inputContainer}>
            <label style={styles.label}>Repassword</label>
            <InputField
              placeholder="Confirm password"
              style={styles.inputField}
              value={confirmedPassword}
              onChange={onConfirmedPasswordInputChanged}
              error={confirmPasswordErr}
              type="password"
            />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <Button
              placeholder={"REGISTER"}
              style={{ marginTop: "10px" }}
              onClick={handleRegisterButtonClicked}
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
              Sign up now to explore an unlimited world of books!
            </h3>
          </div>
        </div>
      </Stack>

      {/* ✅ Snackbar hiển thị lỗi */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>

      {/* ✅ Snackbar hiển thị thành công */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
    </>
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
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
    position: "relative",
    zIndex: 2,
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
    marginBottom: "1rem",
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
    marginBottom: "0px",
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
