import React from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";

const moodColors = {
  Supportive: "#007bff", // Blue
  Encouraging: "#28a745", // Green
  Compassionate: "#ffc107", // Yellow
  Understanding: "#6c757d", // Gray
  Motivational: "#ff5733", // Orange
};

const StyledChats = styled.div`
  width: 100%;
  overflow-y: auto;
  position: relative;
`;

const Container = styled.div`
  flex: 1;
  width: 90%;
  max-width: 900px;
  padding: 1rem;
  height: 80%;
  margin: 0 auto;
  position: relative;
`;

const ChatWrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: ${({ type }) => (type === "user" ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.pre`
  display: inline-block;
  padding: 0.75rem 1.25rem;
  border-radius: 20px;
  background-color: ${({ type }) => (type === "user" ? "#007bff" : "#e9ecef")};
  color: ${({ type }) => (type === "user" ? "#fff" : "#000")};
  max-width: 90%;
  font-size: 1rem;
  word-wrap: break-word;
  white-space: pre-wrap;
  box-sizing: border-box;
`;

const ModeLabel = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  background-color: ${({ mode }) => moodColors[mode] || "#007bff"};
  padding: 5px 10px;
  border-radius: 8px;
  margin-bottom: 5px;
  display: inline-block;
`;

export default function Chats({ chats = [] }) {
  return (
    <StyledChats>
      <Container>
        {chats.map(({ type = "user", content = "", mode = "Supportive" }, index) => (
          <ChatWrapper key={index} type={type}>
            {type !== "user" && <ModeLabel mode={mode}>{mode.toUpperCase()}</ModeLabel>}
            <MessageBubble type={type}>
              {type === "user" ? (
                content
              ) : (
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter.typeString(content).start();
                  }}
                  options={{ delay: 15 }}
                />
              )}
            </MessageBubble>
          </ChatWrapper>
        ))}
      </Container>
    </StyledChats>
  );
}
