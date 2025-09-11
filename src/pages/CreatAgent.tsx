import React, { useState, useRef } from "react";
import styled from "styled-components";

// ---------------------- Styled Components ----------------------

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
  background: #f8fafc;
`;

const Sidebar = styled.div`
  background: linear-gradient(180deg, #1e293b, #0f172a);
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Step = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  font-weight: ${p => (p.active ? 700 : 400)};
  opacity: ${p => (p.active ? 1 : 0.65)};
  font-size: 13px;
`;

const Dot = styled.div<{ active?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  margin-right: 10px;
  background: ${p => (p.active ? "#34d399" : "rgba(255,255,255,0.18)")};
`;

const Main = styled.div`
  padding: 40px;
  overflow-y: auto;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  max-width: 640px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #d0d7e2;
  font-size: 15px;
  margin-bottom: 20px;

  &:focus {
    border-color: #4f46e5;
    outline: none;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }
`;

const Button = styled.button<{ variant?: "ghost" | "solid" }>`
  padding: 10px 14px;
  border-radius: 8px;
  background: ${p =>
    p.variant === "ghost"
      ? "transparent"
      : "linear-gradient(90deg,#4f46e5,#6dd3ff)"};
  border: ${p => (p.variant === "ghost" ? "1px solid #e6eef8" : "none")};
  color: ${p => (p.variant === "ghost" ? "#0f172a" : "#fff")};
  font-weight: 600;
  cursor: pointer;
  margin-right: 10px;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const ProgressWrapper = styled.div`
  background: #e6eef8;
  height: 8px;
  border-radius: 8px;
  margin-bottom: 30px;
  overflow: hidden;
`;

const Bar = styled.div<{ width: number }>`
  height: 100%;
  width: ${p => p.width || 0}%;
  background: linear-gradient(90deg, #6dd3ff, #4f46e5);
  transition: width 360ms ease;
`;

const FileUpload = styled.input`
  margin-top: 16px;
`;

// ---------------------- Component ----------------------

const CreateAgent: React.FC = () => {
  const [step, setStep] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [adminUrl, setAdminUrl] = useState<string | null>(null);
  const [clientUrl, setClientUrl] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);

  // Steps
  const steps = [
    "Company Name",
    "Contact",
    "Email",
    "Business Details",
    "File Upload",
    "Dual Agents",
  ];

  // CSRF token getter
  const getCsrfToken = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "csrftoken") return value;
    }
    return "";
  };

  // ---------------------- Handlers ----------------------

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    setFileToUpload(file || null);
  };

  const handleFileUpload = async () => {
    if (!fileToUpload) return;

    setProcessing(true);

    const formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("contact", contact);
    formData.append("email", email);
    formData.append("file", fileToUpload);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat/api/upload-file/", {
        method: "POST",
        headers: { "X-CSRFToken": getCsrfToken() },
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      setAdminUrl(data.admin_url);
      setClientUrl(data.client_url);
      setStep(5);
    } finally {
      setProcessing(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  // ---------------------- Render ----------------------

  return (
    <Wrapper>
      <Sidebar>
        {steps.map((label, i) => (
          <Step key={i} active={i === step}>
            <Dot active={i === step} />
            {label}
          </Step>
        ))}
      </Sidebar>

      <Main>
        <Card>
          <ProgressWrapper>
            <Bar width={(step / (steps.length - 1)) * 100} />
          </ProgressWrapper>

          {/* Step 0 - Company Name */}
          {step === 0 && (
            <form onSubmit={handleNext}>
              <Title>Enter Company Name</Title>
              <Input
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                required
              />
              <Button type="submit">Next</Button>
            </form>
          )}

          {/* Step 1 - Contact */}
          {step === 1 && (
            <form onSubmit={handleNext}>
              <Title>Enter Contact Number</Title>
              <Input
                value={contact}
                onChange={e => setContact(e.target.value)}
                required
              />
              <Button type="submit">Next</Button>
            </form>
          )}

          {/* Step 2 - Email */}
          {step === 2 && (
            <form onSubmit={handleNext}>
              <Title>Enter Email</Title>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Button type="submit">Next</Button>
            </form>
          )}

          {/* Step 3 - Business Details */}
          {step === 3 && (
            <>
              <Title>Provide Business Details</Title>
              <p>Some optional extra details can go here...</p>
              <Button onClick={() => setStep(4)}>Next</Button>
            </>
          )}

          {/* Step 4 - File Upload */}
          {step === 4 && (
            <>
              <Title>Upload Business Data</Title>
              <FileUpload
                ref={fileRef}
                type="file"
                accept=".csv,.xlsx,.xls,.pdf,.docx,.txt"
                onChange={handleFileChange}
              />
              <Button onClick={handleFileUpload} disabled={!fileToUpload || processing}>
                {processing ? "Uploading..." : "Upload & Finish"}
              </Button>
            </>
          )}

          {/* Step 5 - Show URLs */}
          {step === 5 && (
            <>
              <Title>Your Agents Are Ready</Title>
              <p>
                🎩 Business Owner Agent:{" "}
                <a href={adminUrl || "#"} target="_blank">
                  {adminUrl}
                </a>
                <Button
                  variant="ghost"
                  onClick={() => copyToClipboard(adminUrl || "")}
                >
                  Copy
                </Button>
              </p>
              <p>
                🤝 Customer Agent:{" "}
                <a href={clientUrl || "#"} target="_blank">
                  {clientUrl}
                </a>
                <Button
                  variant="ghost"
                  onClick={() => copyToClipboard(clientUrl || "")}
                >
                  Copy
                </Button>
              </p>
            </>
          )}
        </Card>
      </Main>
    </Wrapper>
  );
};

export default CreateAgent;
