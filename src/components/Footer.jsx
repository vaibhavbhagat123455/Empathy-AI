import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const StyledFooter = styled.footer`
  width: 100%;
  margin-top: 1rem;
`;

const ChatBoxForm = styled.form`
  width: 90%;
  max-width: 900px;
  height: 65px;
  margin: 0 auto;
  padding: 0 1rem 0 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  background-color: #f4f4f4;
`;

const Input = styled.input`
  width: 70%;
  height: 80%;
  background: transparent;
  border: none;
  font-size: 1rem;
  outline: none;
`;

const Btn = styled.button`
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background-color: black;
  color: white;
`;

const Caption = styled.h1`
  text-align: center;
  margin: 1rem 0;
  font-size: 1rem;
  font-weight: 400;
  color: #7d7d7d;
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.5); }
  50% { box-shadow: 0 0 15px rgba(255, 0, 0, 1); }
  100% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.5); }
`;

const pulse2 = keyframes`
  0% { box-shadow: 0 0 5px rgba(5, 71, 3, 0.5); }
  50% { box-shadow: 0 0 15px rgb(28, 146, 46); }
  100% { box-shadow: 0 0 5px rgba(26, 76, 6, 0.5); }
`;

const MicButton = styled.button`
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background-color: ${({ listening }) => (listening ? "red" : "gray")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  animation: ${({ listening }) => (listening ? pulse : "none")} 1s infinite;
`;

const SpeechToggle = styled.button`
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background-color: ${({ speaking }) => (speaking ? "green" : "gray")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ speaking }) => (speaking ? pulse2 : "none")} 1s infinite;
`;

export default function Footer({ setPrompt, speaking, setSpeaking, language }) {
  const [value, setValue] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = false;
      speechRecognition.lang = language; // Set the language for speech recognition

      speechRecognition.onresult = (event) => {
        let newSpeech = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal && event.results[i][0].transcript) {
            newSpeech += event.results[i][0].transcript + " ";
          }
        }
        if (newSpeech.trim()) {
          appendTextSmoothly(newSpeech.trim());
        }
      };

      speechRecognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setListening(false);
      };

      speechRecognition.onend = () => {
        if (recognitionRef.current && listening) {
          recognitionRef.current.start();
        }
      };

      recognitionRef.current = speechRecognition;
    } else {
      alert("Your browser does not support speech recognition.");
    }
  }, [language]); // Add language as a dependency

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleOnClick = () => {
    setPrompt(value);
    setValue("");
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleOnClick();
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (!listening) {
      setListening(true);
      recognitionRef.current.start();
    } else {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const handleSpeechToggle = (event) => {
    event.stopPropagation();
    setSpeaking((prev) => {
      if (prev) {
        window.speechSynthesis.cancel();
      }
      return !prev;
    });
  };

  const appendTextSmoothly = (newText) => {
    let index = 0;
    setValue((prevValue) => {
      const fullText = prevValue + " " + newText;
      const interval = setInterval(() => {
        setValue((currentText) => {
          if (index < fullText.length) {
            index++;
            return fullText.substring(0, index);
          } else {
            clearInterval(interval);
            return currentText;
          }
        });
      }, 50);
      return prevValue;
    });
  };

  return (
    <StyledFooter>
      <ChatBoxForm onSubmit={handleOnSubmit}>
        <MicButton type="button" onClick={handleVoiceInput} listening={listening}>
          <i className="fa-solid fa-microphone"></i>
        </MicButton>
        <Input
          ref={inputRef}
          placeholder="Message EmpathyAI"
          value={value}
          onChange={handleOnChange}
          onKeyDown={(e) => e.key === "Enter" && handleOnSubmit(e)}
          required
        />
        <SpeechToggle type="button" onClick={handleSpeechToggle} speaking={speaking}>
          <i className="fa-solid fa-volume-up"></i>
        </SpeechToggle>
        <Btn type="submit">
          <i className="fa-solid fa-arrow-up"></i>
        </Btn>
      </ChatBoxForm>
      <Caption>
        Copy Right{" "}
        <a href={"https://github.com/vaibhavbhagat9545"} target="_blank" rel="noopener noreferrer">
          Vaibhav Bhagat
        </a>{" "}
        &copy;
      </Caption>
    </StyledFooter>
  );
}