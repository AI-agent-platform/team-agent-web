import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  font-family: "Segoe UI", sans-serif;
`;

const ToggleButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 26px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const ChatWindow = styled.div`
  width: 340px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background-color: #f5c014ff;
  color: white;
  padding: 12px 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Bubble = styled.div<{ sender: string }>`
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 20px;
  line-height: 1.4;
  font-size: 14px;
  word-wrap: break-word;
  align-self: ${(props) =>
    props.sender === "user" ? "flex-end" : "flex-start"};
  background-color: ${(props) =>
    props.sender === "user" ? "#dcf8c6" : "#ffffff"};
  border: ${(props) =>
    props.sender === "user" ? "none" : "1px solid #e0e0e0"};
  border-bottom-right-radius: ${(props) =>
    props.sender === "user" ? "4px" : "20px"};
  border-bottom-left-radius: ${(props) =>
    props.sender === "user" ? "20px" : "4px"};
`;

const ImageBubble = styled.img`
  max-width: 180px;
  border-radius: 10px;
  margin-top: 4px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ddd;
  padding: 10px;
  background: #fff;
`;

const TextRow = styled.div`
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
`;

const SendBtn = styled.button`
  margin-left: 8px;
  padding: 10px 16px;
  background-color: #dde336ff;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const FileInput = styled.input`
  margin-top: 8px;
`;

const ChatWidget = () => {
  const [messages, setMessages] = useState<
    { sender: string; text?: string; imageUrl?: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() && !file) return;

    const userMsg: any = { sender: "user" };
    if (input.trim()) userMsg.text = input.trim();
    if (file) userMsg.imageUrl = URL.createObjectURL(file);

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setFile(null);

    try {
      const formData = new FormData();
      formData.append("message", input);
      if (file) formData.append("file", file);

      const res = await fetch("http://localhost:4001/chat", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const botMsg = {
        sender: "bot",
        text: data.message || "No response",
        ...(data.imageUrl && { imageUrl: data.imageUrl }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error: Unable to connect." },
      ]);
    }
  };

  return (
    <Wrapper>
      {isOpen ? (
        <ChatWindow>
          <ChatHeader>
            <span>💬 Chat Assistant</span>
            <CloseBtn onClick={() => setIsOpen(false)}>×</CloseBtn>
          </ChatHeader>
          <MessagesContainer>
            {messages.map((msg, index) => (
              <Bubble key={index} sender={msg.sender}>
                {msg.text}
                {msg.imageUrl && (
                  <ImageBubble src={msg.imageUrl} alt="sent-img" />
                )}
              </Bubble>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>
          <InputArea>
            <TextRow>
              <Input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <SendBtn onClick={sendMessage}>Send</SendBtn>
            </TextRow>
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </InputArea>
        </ChatWindow>
      ) : (
        <ToggleButton onClick={() => setIsOpen(true)}>💬</ToggleButton>
      )}
    </Wrapper>
  );
};

export default ChatWidget;
