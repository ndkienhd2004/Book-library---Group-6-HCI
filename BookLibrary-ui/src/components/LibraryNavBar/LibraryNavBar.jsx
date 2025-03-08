import React, { useContext } from "react";
import styled from "styled-components";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useLocation, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import { deleteAccessToken } from "../../utils/auth";
import AppContext from "../../context/context";

const Radio = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AppContext);
  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogoutButtonClicked = () => {
    console.log("Logout clicked");
    logout();
  };
  return (
    <StyledWrapper>
      <div className="menu">
        <NavButton
          onClick={() => handleNavigate(PATH.library)}
          $active={location.pathname === PATH.library}
        >
          <PersonIcon /> Profile
        </NavButton>
        <NavButton
          onClick={() => handleNavigate(PATH.savedBooks)}
          $active={location.pathname.includes(PATH.savedBooks)}
        >
          <BookmarkIcon /> Saved Book
        </NavButton>
        <NavButton
          onClick={() => handleNavigate(PATH.history)}
          $active={location.pathname.includes(PATH.history)}
        >
          <HistoryIcon /> History
        </NavButton>
        <NavButton onClick={handleLogoutButtonClicked}>
          <LogoutIcon /> Logout
        </NavButton>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .menu {
    display: flex;
    flex-direction: column;
    width: 16vw;
    background-color: #ffffff;
    border-radius: 5px;
    margin-top: 3vh;
  }
`;

const NavButton = styled.button`
  background-color: ${(props) => (props.$active ? "#d9c5b2" : "transparent")};
  border: none;
  padding: 20px;
  color: black;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 4px;
  position: relative;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0e6dd;
  }

  &::before {
    content: "";
    position: absolute;
    top: 5px;
    left: -10px;
    width: 5px;
    height: 80%;
    background-color: #34312d;
    border-radius: 5px;
    opacity: ${(props) => (props.$active ? "1" : "0")};
    transition: opacity 0.3s;
  }
`;

export default Radio;
