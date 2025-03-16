import { borderTop, height, margin, padding, width } from "@mui/system";
import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { FaComments } from "react-icons/fa";
import styled from "styled-components";
import InputField from "../InputField/InputField";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import zIndex from "@mui/material/styles/zIndex";
import { io } from "socket.io-client";

const useSocket = (() => {
  let socketInstance = null;
  return () => {
    if (!socketInstance) {
      socketInstance = io("http://localhost:8000");
    }
    return socketInstance;
  };
})();

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const nodeRef = useRef(null);
  const messagesEndRef = useRef(null);
  const socket = useRef(useSocket()).current;

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", text: msg },
      ]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = {
        sender: "You",
        text: input,
        // time: new Date().toLocaleTimeString([], {
        //   hour: "2-digit",
        //   minute: "2-digit",
        // }),
      };
      setMessages([...messages, newMessage]);
      socket.emit("chat message", newMessage.text);
      setInput("");
    }
  };
  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div ref={nodeRef} style={styles.chatContainer}>
        {isOpen && (
          <div style={styles.chatBox}>
            <div style={styles.chatHeader}>
              <span>Chat with Support</span>
              <button onClick={() => setIsOpen(false)}>✖</button>
            </div>
            <div style={styles.chatMessages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={
                    msg.sender === "You"
                      ? styles.userMessage
                      : styles.botMessage
                  }
                >
                  <p>{msg.text}</p>
                  <span>{msg.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div style={styles.chatInput}>
              <InputField
                placeholder="Type a message..."
                style={styles.inputField}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <Button sx={styles.chatButton} onClick={handleSendMessage}>
                <SendIcon fontSize="medium" />
              </Button>
            </div>
          </div>
        )}
        <StyledWrapper>
          <div className="container" onClick={() => setIsOpen(!isOpen)}>
            <div className="toggle">
              <input type="checkbox" />
              <span className="button" />
              <span className="label">
                <FaComments />
              </span>
            </div>
          </div>
        </StyledWrapper>
      </div>
    </Draggable>
  );
};

export default ChatBox;

const styles = {
  chatContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    cursor: "grab",
    zIndex: 9999,
  },
  chatBox: {
    width: "100%",
    height: "400px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
  },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    backgroundColor: "#c8a17a",
    width: "300px",
    padding: "10px",
    height: "30px",
    alignItems: "center",
  },
  chatMessages: {
    flex: 1,
    padding: "5px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  userMessage: {
    alignSelf: "flex-end",
    background: "#c8a17a",
    color: "white",
    padding: "0px 10px",
    borderRadius: "12px",
    maxWidth: "40%",
    wordBreak: "break-word",
    fontSize: "14px",
    lineHeight: "14px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "unset",
  },

  botMessage: {
    alignSelf: "flex-start",
    background: "#e5e5ea",
    color: "black",
    padding: "0px 12px",
    borderRadius: "12px",
    maxWidth: "40%",
    wordBreak: "break-word",
    display: "flex",
    flexDirection: "column",
  },
  chatInput: {
    display: "flex",
    width: "100%",
    paddingBottom: "5px",
    paddingTop: "5px",
    alignItems: "center",
    borderTop: "2px solid #e5e5ea",
  },
  inputField: {
    width: "80%",
    fontFamily: "Montserrat, sans-serif",
  },
  chatButton: {
    background: "#c8a17a",
    width: "48px",
    height: "36px",
    color: "white",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    marginRight: "10px",
    minWidth: "unset",
    padding: "5px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
};

const StyledWrapper = styled.div`
  .toggle {
    display: inline-block;
  }

  .toggle {
    position: relative;
    height: 80px;
    width: 80px;
  }

  .toggle:before {
    box-shadow: 0;
    border-radius: 84.5px;
    background: #c8a17a;
    position: absolute;
    margin-left: -36px;
    margin-top: -36px;
    opacity: 0.2;
    height: 72px;
    width: 72px;
    left: 50%;
    top: 50%;
  }

  .toogle input:checked ~ .label {
    color: rgba(31, 25, 25, 0.8);
  }

  .toggle .button {
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 10px 20px rgba(200, 161, 122, 0.5),
      inset 0 -3px 5px rgba(150, 120, 90, 0.3),
      inset 0 3px 5px rgba(255, 255, 255, 0.2);
    border-radius: 68.8px;
    position: absolute;
    background: #c8a17a;
    margin-left: -34.4px;
    margin-top: -34.4px;
    display: block;
    height: 68.8px;
    width: 68.8px;
    left: 50%;
    top: 55%;
  }

  .toggle .label {
    transition: color 300ms ease-out;
    line-height: 101px;
    text-align: center;
    justify-content: center;
    align-items: center;
    position: absolute;
    font-weight: 700;
    font-size: 28px;
    display: block;
    opacity: 0.9;
    height: 100%;
    width: 100%;
    color: rgba(255, 255, 255, 0.9);
  }

  .toggle input {
    opacity: 0;
    position: absolute;
    cursor: pointer;
    z-index: 9999;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }

  .toggle input:active ~ .button {
    filter: blur(0.5px);
    box-shadow: 0 12px 25px -4px rgba(0, 0, 0, 0.4),
      inset 0 -8px 30px 1px rgba(255, 255, 255, 0.9),
      0 -10px 15px -1px rgba(255, 255, 255, 0.6),
      inset 0 8px 25px 0 rgba(0, 0, 0, 0.4),
      inset 0 0 10px 1px rgba(255, 255, 255, 0.6);
  }

  .toggle input:active ~ .label {
    font-size: 26px;
    color: rgba(0, 0, 0, 0.45);
  }

  .toggle input:checked ~ .button {
    filter: blur(0.5px);
    box-shadow: 0 10px 25px -4px rgba(200, 161, 122, 0.5),
      inset 0 -8px 25px -1px rgba(255, 230, 200, 0.9),
      0 -10px 15px -1px rgba(255, 240, 220, 0.6),
      inset 0 8px 20px 0 rgba(150, 120, 90, 0.3),
      inset 0 0 5px 1px rgba(255, 220, 180, 0.6); /* Viền sáng nhẹ */
  }

  .toggle input:checked ~ .label {
    color: rgba(0, 0, 0, 0.8);
  }
`;
