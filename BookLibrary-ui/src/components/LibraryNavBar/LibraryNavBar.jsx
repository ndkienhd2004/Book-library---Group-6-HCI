import React from "react";
import styled from "styled-components";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useLocation, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
const Radio = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    console.log(location.pathname);
  };
  return (
    <StyledWrapper>
      <div className="input">
        <button
          className="value"
          onClick={() => handleNavigate(PATH.library)}
          active={location.pathname === ""}
        >
          <svg
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <PersonIcon />
          </svg>
          Profile
        </button>
        <button
          className="value"
          onClick={() => handleNavigate(PATH.savedBooks)}
          active={location.pathname === `library/${PATH.savedBooks}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Line">
            <BookmarkIcon />
          </svg>
          Saved Book
        </button>
        <button
          className="value"
          onClick={() => handleNavigate(PATH.history)}
          active={location.pathname === `library/${PATH.history}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
            <HistoryIcon />
          </svg>
          History
        </button>
        <button className="value">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="svg8">
            <LogoutIcon />
          </svg>
          Logout
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input {
    display: flex;
    flex-direction: column;
    width: 16vw;
    background-color: #ffffff;
    justify-content: center;
    border-radius: 5px;
    margin-top: 3vh;
  }

  .value {
    background-color: transparent;
    border: none;
    padding: 30px;
    color: black;
    display: flex;
    justify-content:"center",
    align-items:"center",
    position: relative;
    gap: 10px;
    cursor: pointer;
    border-radius: 4px;
  }

  .value:not(:active):hover,
  .value:focus {
    background-color: #d9c5b2;
  }

  .value:focus,
  .value:active {
    background-color: #d9c5b2;
    outline: none;
  }

  .value::before {
    content: "";
    position: absolute;

    top: 5px;
    left: -10px;
    width: 5px;
    height: 80%;
    background-color: #34312d;
    border-radius: 5px;
    opacity: 0;
  }

  .value:focus::before,
  .value:active::before {
    opacity: 1;
  }

  .value svg {
    width: 15px;
  }
`;

export default Radio;
