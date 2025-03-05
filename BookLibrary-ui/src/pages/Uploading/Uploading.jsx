import { fontSize } from "@mui/system";
import React from "react";
import styled from "styled-components";

const Uploading = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>
          Upload the book you want to share with us
        </h1>
      </div>
      <div style={styles.body}>
        <StyledWrapper>
          <div className="upload-container">
            <div className="folder">
              <div className="front-side">
                <div className="tip" />
                <div className="cover" />
              </div>
              <div className="back-side cover" />
            </div>
            <label className="custom-file-upload">
              <input className="title" type="file" />
              Choose a file
            </label>
          </div>
        </StyledWrapper>
      </div>
      <div>
        <h2 style={{ color: "black" }}>PDF, EPUB</h2>

        <span style={{ color: "black" }}>
          Upload pdf files that can highlight text for the best experience
        </span>
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .upload-container {
    --transition: 350ms;
    --folder-W: 120px;
    --folder-H: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 50px;
    background: linear-gradient(135deg, #d9c5b2, rgb(217, 197, 150));
    border-radius: 15px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    height: calc(var(--folder-H) * 1.7);
    position: relative;
    width: 360px;
    height: 200px;
  }

  .folder {
    position: absolute;
    top: 15%;
    left: calc(50% - 60px);
    animation: float 2.5s infinite ease-in-out;
    transition: transform var(--transition) ease;
  }

  .folder:hover {
    transform: scale(1.05);
  }

  .folder .front-side,
  .folder .back-side {
    position: absolute;
    transition: transform var(--transition);
    transform-origin: bottom center;
  }

  .folder .back-side::before,
  .folder .back-side::after {
    content: "";
    display: block;
    background-color: white;
    opacity: 0.5;
    z-index: 0;
    width: var(--folder-W);
    height: var(--folder-H);
    position: absolute;
    transform-origin: bottom center;
    border-radius: 15px;
    transition: transform 350ms;
    z-index: 0;
  }

  .upload-container:hover .back-side::before {
    transform: rotateX(-5deg) skewX(5deg);
  }
  .upload-container:hover .back-side::after {
    transform: rotateX(-15deg) skewX(12deg);
  }

  .folder .front-side {
    z-index: 1;
  }

  .upload-container:hover .front-side {
    transform: rotateX(-40deg) skewX(15deg);
  }

  .folder .tip {
    background: linear-gradient(135deg, #ff9a56, #ff6f56);
    width: 80px;
    height: 20px;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: -10px;
    z-index: 2;
  }

  .folder .cover {
    background: linear-gradient(135deg, #ffe563, #ffc663);
    width: var(--folder-W);
    height: var(--folder-H);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  .custom-file-upload {
    font-size: 1.1em;
    color: #ffffff;
    text-align: center;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background var(--transition) ease;
    display: inline-block;
    width: 100%;
    padding: 10px 35px;
    position: relative;
  }

  .custom-file-upload:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  .custom-file-upload input[type="file"] {
    display: none;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-20px);
    }

    100% {
      transform: translateY(0px);
    }
  }
`;

export default Uploading;

const styles = {
  container: {
    width: "80vw",
    height: "80vh",
    backgroundColor: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    margin: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    marginTop: "5vh",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "0vh",
  },
  headerText: {
    color: "#34312d",
    fontSize: "36px",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: "5vh",
    marginTop: "5vh",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "5vh",
  },
};
