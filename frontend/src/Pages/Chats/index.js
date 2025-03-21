import React, { useState } from "react";
// import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
export default function Chats() {
  const [messages, setMessages] = useState([
    { text: "Hi, How can we help you?", type: "support" },
    { text: "My car tyre is flat help me", type: "user" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, type: "user" }]);
      setInput("");
    }
  };

  return (
    <div>
      <Header />
      <Box className="container mt-4" sx={{padding:"30px"}}>
        <h5>Chat & Support</h5>
        <div className="mt-3">
          <Box className="p-3 bg-light rounded">
            <Box
              className="mb-3"
              style={{ height: "325px", overflowY: "auto" }}
            >
              {/* {messages.map((msg, index) => (
              <Box
                key={index}
                className={`d-inline-block p-2 rounded mb-2 text-white ${
                  msg.type === "support" ? "bg-warning" : "bg-primary"
                }`}
                style={{ maxWidth: "80%" }}
              >
                {msg.text}
              </Box>
            ))} */}
              <div>
                <Box
                  className="d-inline-block p-2 rounded mb-2 text-white "
                  style={{ maxWidth: "80%", backgroundColor: "#E3641B" }}
                >
                  Hi, How can we help you?
                </Box>
              </div>
              <div className="text-end">
                <Box
                  className="d-inline-block p-2 rounded mb-2 text-white "
                  style={{ maxWidth: "80%", backgroundColor: "#9494F5" }}
                >
                  My car tyre is flat help me
                </Box>
              </div>
            </Box>
            <Box className="d-flex">
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button
                variant="contained"
                color="warning"
                className="ms-2"
                onClick={handleSend}
              >
                Send
              </Button>
            </Box>
          </Box>
        </div>
      </Box>
      <Footer />
    </div>
  );
}
