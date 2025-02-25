import { useNavigate } from "react-router-dom";
import PATH from "../constants/path";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { useState } from "react";

const NavBar = ({ currentPage }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const navItems = [
    { text: "Home", path: PATH.home },
    { text: "Library", path: PATH.library },
    { text: "Upload Book", path: PATH.uploading },
    { text: "About Us", path: PATH.about },
  ];

  return (
    <nav style={styles.navBar}>
      <Button style={styles.menuIcon}>
        <MenuIcon sx={{ color: "black" }} />
      </Button>

      {navItems.map(({ text, path }) => (
        <div
          key={path}
          style={{
            ...styles.navItem,
            ...(currentPage === path ? styles.active : {}),
          }}
          onClick={() => handleNavigate(path)}
        >
          {text}
        </div>
      ))}

      <div style={styles.buttonGroup}>
        <button
          style={{
            ...styles.signUp,
            ...(currentPage === PATH.register ? styles.logIn : {}),
          }}
          onClick={() => handleNavigate(PATH.register)}
        >
          Sign Up
        </button>
        <button
          style={{
            ...styles.logIn,
            ...(currentPage === PATH.register ? styles.signUp : {}),
          }}
          onClick={() => handleNavigate(PATH.login)}
        >
          Log In
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

const styles = {
  navBar: {
    position: "fixed",
    top: "2%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "90vw",
    background: "#e2d4c7",
    padding: "15px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1000,
    boxSizing: "border-box",
    borderRadius: "20px",
    paddingBottom: "10px",
  },
  navItem: {
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "black",
    paddingBottom: "5px",
    transition: "border-bottom 0.01s ease-in-out",
  },
  active: {
    borderBottom: "3px solid black",
  },
  buttonGroup: {
    display: "flex",
  },
  signUp: {
    background: "transparent",
    border: "none",
    color: "black",
    fontSize: "16px",
    cursor: "pointer",
    padding: "8px 15px",
    borderRadius: "10px",
    transition: "background 0.3s ease-in-out",
  },
  logIn: {
    background: "black",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background 0.3s ease-in-out",
  },
};
