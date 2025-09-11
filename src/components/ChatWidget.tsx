import React, { useState, useRef, useEffect } from "react";


type Message = {
  text: string;
  sender: "user" | "bot";
  isHtml?: boolean;
  timestamp: number;
};

type ButtonOption = {
  value: string;
  text: string;
};

type ApiResponse = {
  uid?: string;
  message?: string;
  question?: string;
  type?: string;
  options?: string[];
  question_id?: string;
  buttons?: { payload: string; title: string }[];
  show_file_upload?: boolean;
  more_data_prompt?: boolean;
  admin_url?: string;
  client_url?: string;
  instructions?: string;
  pdf_url?: string;
  thank_you?: string;
  error?: string;
};

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chatState, setChatState] = useState<
    | "ask_name"
    | "ask_contact"
    | "ask_email"
    | "select_field"
    | "field_questions"
    | "file_upload_choice"
    | "add_more_data_choice"
    | "dual_agents_prompt"
    | "llm_data_entry"
  >("ask_name");

  const [uid, setUid] = useState<string | null>(null);
  const [currentField, setCurrentField] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(1);
  const [latestQuestionType, setLatestQuestionType] = useState<string | null>(
    null
  );
  const [latestOptions, setLatestOptions] = useState<string[] | null>(null);
  const [latestQuestionId, setLatestQuestionId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [llmMode, setLlmMode] = useState<boolean>(false);
  const [dualAgentsReady, setDualAgentsReady] = useState<boolean>(false);
  const [showButtons, setShowButtons] = useState<ButtonOption[]>([]);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [showFileUpload, setShowFileUpload] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [fileUploadState, setFileUploadState] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage("Hello! What is your or your company's name?", "bot");
      setInputDisabled(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (
      isOpen &&
      !inputDisabled &&
      !isProcessing &&
      !showFileUpload &&
      showButtons.length === 0
    ) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, inputDisabled, isProcessing, showFileUpload, showButtons.length]);

  useEffect(() => {
    if (!inputDisabled && !isProcessing && !showFileUpload && showButtons.length === 0) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [inputDisabled, isProcessing, showFileUpload, showButtons.length]);

  const addMessage = (
    text: string,
    sender: "user" | "bot",
    isHtml = false
  ): void => {
    setMessages((prev) => [
      ...prev,
      { text, sender, isHtml, timestamp: Date.now() },
    ]);
  };

  const getCsrfToken = (): string => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "csrftoken") {
        return value;
      }
    }
    return "";
  };

  const postJson = async (data: Record<string, unknown>): Promise<ApiResponse> => {
    setIsProcessing(true);
    addMessage("Processing...", "bot");

    try {
      const response = await fetch("http://127.0.0.1:8000/chat/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      setMessages((prev) => prev.slice(0, -1));
      setIsProcessing(false);

      return result;
    } catch {
      setMessages((prev) => prev.slice(0, -1));
      setIsProcessing(false);
      addMessage("Network error. Please try again.", "bot");
      throw new Error("Network error");
    }
  };

  const handleButtonClick = async (buttonValue: string, buttonText?: string): Promise<void> => {
    addMessage(buttonText || buttonValue, "user");
    setShowButtons([]);
    setInputDisabled(true);

    if (chatState === "select_field") {
      await handleFieldSelect(buttonValue);
    } else if (chatState === "field_questions") {
      await handleButtonAnswer(buttonValue);
    } else if (chatState === "file_upload_choice") {
      await handleFileUploadChoice(buttonValue);
    } else if (chatState === "add_more_data_choice") {
      await handleAddMoreDataChoice(buttonValue);
    } else if (chatState === "dual_agents_prompt") {
      await handleDualAgentsChoice(buttonValue);
    }
  };

  const handleFieldSelect = async (field: string): Promise<void> => {
    setCurrentField(field);
    setQuestionIndex(1);

    const data = await postJson({ action: "field", uid, field });
    if (data.message) addMessage(data.message, "bot");

    setLatestQuestionType(data.type || null);
    setLatestOptions(data.options || null);
    setLatestQuestionId(data.question_id || null);

    if (data.type === "button" && data.options?.length) {
      if (data.question) addMessage(data.question, "bot");
      setShowButtons(data.options.map((opt) => ({ value: opt, text: opt })));
      setInputDisabled(true);
    } else {
      if (data.question) addMessage(data.question, "bot");
      setInputDisabled(false);
    }
    setChatState("field_questions");
  };

  const handleButtonAnswer = async (optionValue: string): Promise<void> => {
    const data = await postJson({
      action: "field_questions",
      uid,
      field: currentField,
      question_index: questionIndex,
      answer: optionValue,
      question_id: latestQuestionId,
    });

    setQuestionIndex((prev) => prev + 1);
    setLatestQuestionType(data.type || null);
    setLatestOptions(data.options || null);
    setLatestQuestionId(data.question_id || null);

    if (data.question) {
      addMessage(data.question, "bot");
      if (data.type === "button" && data.options?.length) {
        setShowButtons(data.options.map((opt) => ({ value: opt, text: opt })));
        setInputDisabled(true);
      } else {
        setInputDisabled(false);
      }
    } else {
      if (data.show_file_upload) {
        askForFileUpload();
      } else {
        addMessage(data.message || "Thanks for your responses!", "bot");
        setInputDisabled(true);
      }
    }
  };

  const askForFileUpload = (): void => {
    addMessage("Do you want to add company data in files?", "bot");
    setShowButtons([
      { value: "yes", text: "Yes" },
      { value: "no", text: "No" },
    ]);
    setChatState("file_upload_choice");
    setInputDisabled(true);
  };

  const handleFileUploadChoice = async (choice: string): Promise<void> => {
    if (choice === "yes") {
      addMessage("Please upload your file (csv, pdf, docx, txt, xlsx).", "bot");
      setShowFileUpload(true);
      setFileUploadState(true);
      setInputDisabled(true);
    } else {
      addMessage(
        "🔥 Would you like to add more data about your business? (You can add advanced details powered by our Smart Assistant!)",
        "bot"
      );
      setShowButtons([
        { value: "yes", text: "Yes" },
        { value: "no", text: "No" },
      ]);
      setChatState("add_more_data_choice");
      setInputDisabled(true);
    }
  };

  const handleFileUpload = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uid", uid || "");
    formData.append("company_name", companyName || "Unknown");
    formData.append("field", currentField || "");

    addMessage("Uploading file...", "bot");
    setShowFileUpload(false);
    setFileUploadState(false);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/chat/api/upload-file/",
        {
          method: "POST",
          headers: {
            "X-CSRFToken": getCsrfToken(),
          },
          body: formData,
          credentials: "include",
        }
      );

      const result: ApiResponse = await response.json();

      setMessages((prev) => prev.slice(0, -1));

      if (result.error) {
        addMessage("File upload error: " + result.error, "bot");
        setInputDisabled(true);
      } else {
        addMessage("File uploaded and saved successfully.", "bot");
        const fileActionRes = await postJson({
          action: "file_uploaded",
          uid,
          field: currentField,
        });
        if (fileActionRes.message) addMessage(fileActionRes.message, "bot");

        if (fileActionRes.more_data_prompt) {
          addMessage(
            "🔥 Would you like to add more data about your business? (You can add advanced details powered by our Smart Assistant!)",
            "bot"
          );
          setShowButtons([
            { value: "yes", text: "Yes" },
            { value: "no", text: "No" },
          ]);
          setChatState("add_more_data_choice");
          setInputDisabled(true);
        }
      }
    } catch {
      setMessages((prev) => prev.slice(0, -1));
      addMessage("Network/file error. Please try again.", "bot");
      setInputDisabled(true);
    }
  };

  const handleAddMoreDataChoice = async (choice: string): Promise<void> => {
    if (choice === "no") {
      await dualAgentsPromptFlow();
    } else {
      const data = await postJson({
        action: "add_more_data",
        uid,
        field: currentField,
        choice: "yes",
      });
      if (data.message) addMessage(data.message, "bot");
      setLlmMode(true);
      setChatState("llm_data_entry");
      setInputDisabled(false);
    }
  };

  const dualAgentsPromptFlow = async (): Promise<void> => {
    addMessage(
      "Would you like me to create your dual AI agents now? One for you (business owner) and one for your customers, each with their own privileges and endpoints!",
      "bot"
    );
    setShowButtons([
      { value: "yes", text: "Yes, create my dual AI agents" },
      { value: "no", text: "No" },
    ]);
    setChatState("dual_agents_prompt");
    setInputDisabled(true);
  };

  const handleDualAgentsChoice = async (choice: string): Promise<void> => {
    if (choice === "yes") {
      addMessage("Setting up your dual AI agents...", "bot");
      const data = await postJson({
        action: "dual_agents_confirm",
        uid,
        field: currentField,
      });

      if (data.admin_url && data.client_url) {
        setDualAgentsReady(true);

        const instructionHtml = `
          <div class="instruction-box">
            <b>🎩 Business Owner Agent:</b><br/>
            <span class="api-url">${data.admin_url}</span><br/>
            <b>🤝 Customer Agent:</b><br/>
            <span class="api-url">${data.client_url}</span>
          </div>
        `;

        addMessage(instructionHtml, "bot", true);

        if (data.instructions) {
          addMessage(`<div class="instruction-box">${data.instructions}</div>`, "bot", true);
        }

        if (data.pdf_url) {
          const downloadPdf = `<a href="${data.pdf_url}" class="html-link" target="_blank">📄 Download your Dual Agent API Guide (PDF)</a>`;
          addMessage(downloadPdf, "bot", true);
        }

        addMessage(data.thank_you || "Thank you for using our platform!", "bot");
      } else {
        addMessage("Failed to generate agent URLs.", "bot");
      }
      setInputDisabled(true);
    } else {
      addMessage("You can always generate your dual agents later. Thank you!", "bot");
      setInputDisabled(true);
    }
  };

  const handleUserInput = async (): Promise<void> => {
    if (isProcessing || !input.trim()) return;

    const message = input.trim();
    addMessage(message, "user");
    setInput("");
    setInputDisabled(true);

    try {
      if (chatState === "ask_name") {
        const data = await postJson({ action: "name", name: message });
        if (data.uid) setUid(data.uid);
        setCompanyName(message);
        addMessage("Hi " + message + "!", "bot");
        addMessage("What is your contact number?", "bot");
        setChatState("ask_contact");
        setInputDisabled(false);
      } else if (chatState === "ask_contact") {
        const phoneRegex = /^\+94\d{9}|0\d{9}$/;
        if (!phoneRegex.test(message)) {
          addMessage("❗ Invalid contact number. Please enter a valid number (e.g., +94XXXXXXXXX or 071XXXXXXX).", "bot");
          setInputDisabled(false);
          return;
        }
        await postJson({ action: "contact", uid, contact: message });
        addMessage("What is your email?", "bot");
        setChatState("ask_email");
        setInputDisabled(false);
      } else if (chatState === "ask_email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(message)) {
          addMessage("❗ Invalid email address. Please enter a valid email (e.g., example@domain.com).", "bot");
          setInputDisabled(false);
          return;
        }
        const data = await postJson({ action: "email", uid, email: message });
        if (data.message) addMessage(data.message, "bot");
        if (data.buttons) {
          setShowButtons(data.buttons.map((btn) => ({ value: btn.payload, text: btn.title })));
        }
        setChatState("select_field");
        setInputDisabled(true);
      } else if (chatState === "field_questions") {
        if (latestQuestionType === "button" && latestOptions?.length) {
          addMessage("Please select an option above.", "bot");
          setInputDisabled(true);
          return;
        }
        const data = await postJson({
          action: "field_questions",
          uid,
          field: currentField,
          question_index: questionIndex,
          answer: message,
          question_id: latestQuestionId,
        });

        setQuestionIndex((prev) => prev + 1);
        setLatestQuestionType(data.type || null);
        setLatestOptions(data.options || null);
        setLatestQuestionId(data.question_id || null);

        if (data.question) {
          addMessage(data.question, "bot");
          if (data.type === "button" && data.options?.length) {
            setShowButtons(data.options.map((opt) => ({ value: opt, text: opt })));
            setInputDisabled(true);
          } else {
            setInputDisabled(false);
          }
        } else {
          if (data.show_file_upload) {
            askForFileUpload();
          } else {
            addMessage(data.message || "Thanks for your responses!", "bot");
            setInputDisabled(true);
          }
        }
      } else if (chatState === "llm_data_entry" && llmMode) {
        if (message.toLowerCase() === "exit") {
          const data = await postJson({
            action: "llm_data_entry",
            uid,
            field: currentField,
            message,
          });
          if (data.message) addMessage(data.message, "bot");
          setLlmMode(false);
          await dualAgentsPromptFlow();
        } else {
          const data = await postJson({
            action: "llm_data_entry",
            uid,
            field: currentField,
            message,
          });
          if (data.message) addMessage(data.message, "bot");
          setInputDisabled(false);
        }
      }
    } catch {
      setInputDisabled(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUserInput();
    }
  };

  return (
    <div className="chat-widget-wrapper">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>💬 AI Agent Generative Platform</span>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${
                  msg.sender === "user" ? "user" : "bot"
                }`}
              >
                {msg.isHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  msg.text
                )}
              </div>
            ))}

            {isProcessing && (
              <div className="chat-bubble bot typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            {showFileUpload && (
              <div className="chat-bubble bot file-upload-container">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".csv,.pdf,.docx,.txt,.xlsx"
                  onChange={(e) =>
                    e.target.files && handleFileUpload(e.target.files[0])
                  }
                />
              </div>
            )}

            {showButtons.length > 0 && (
              <div className="chat-bubble bot button-options">
                {showButtons.map((btn, idx) => (
                  <button
                    key={idx}
                    className="option-btn"
                    onClick={() => handleButtonClick(btn.value, btn.text)}
                  >
                    {btn.text}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={inputDisabled || isProcessing || showFileUpload || showButtons.length > 0}
              placeholder={
                isProcessing
                  ? "Processing..."
                  : showFileUpload
                  ? "Please upload a file"
                  : showButtons.length > 0
                  ? "Please select an option"
                  : "Type your message..."
              }
            />
            <button
              className="send-btn"
              onClick={handleUserInput}
              disabled={inputDisabled || isProcessing || showFileUpload || showButtons.length > 0}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
