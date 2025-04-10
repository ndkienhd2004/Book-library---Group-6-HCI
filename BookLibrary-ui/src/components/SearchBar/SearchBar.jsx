import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { searchBook } from "../../apis/book";
import { SearchResultsList } from "./SearchResultsList";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchText(searchValue);
    }
  };

  useEffect(() => {
    if (!searchText.trim()) {
      setSearchList([]);
      return;
    }

    const delaySearch = setTimeout(async () => {
      try {
        const response = await searchBook(searchText);
        if (Array.isArray(response.data)) {
          setSearchList(response.data);
        } else {
          console.error("API response data is not an array:", response.data);
          setSearchList([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setSearchList([]);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchText]);

  return (
    <div>
      <StyledWrapper>
        <div className="input-container">
          <input
            placeholder="Search something..."
            className="input"
            name="text"
            type="text"
            value={searchText}
            onChange={(e) => handleChange(e)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon"
            // onClick={handleSubmit}
          >
            <g strokeWidth={0} id="SVGRepo_bgCarrier" />
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              id="SVGRepo_tracerCarrier"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <rect fill="white" />{" "}
              <path
                d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />{" "}
            </g>
          </svg>
        </div>
      </StyledWrapper>
      <SearchResultsList results={searchList} />
    </div>
  );
};

const StyledWrapper = styled.div`
  .input-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input {
    width: 12px;
    height: 12px;
    border-radius: 20px;
    border: none;
    outline: none;
    padding: 12px;
    background-color: transparent;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    color: black;
  }

  .input::placeholder {
    color: transparent;
  }

  .input:focus::placeholder {
    color: rgb(131, 128, 128);
  }

  .input:focus,
  .input:not(:placeholder-shown) {
    background-color: #fff;
    border: 1px solid #34312d;
    width: 160px;
    cursor: none;
    padding: 12px 5px 12px 45px;
  }

  .icon {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 5px;
    height: 40px;
    width: 40px;
    background-color: #d9c5b2;
    border-radius: 10px;
    z-index: -1;
    fill: #34312d;
    border: 1px solid #34312d;
  }

  .input:hover + .icon {
    transform: rotate(360deg);
    transition: 0.2s ease-in-out;
  }

  .input:focus + .icon,
  .input:not(:placeholder-shown) + .icon {
    z-index: 0;
    background-color: transparent;
    border: none;
  }
`;

export default SearchBar;
