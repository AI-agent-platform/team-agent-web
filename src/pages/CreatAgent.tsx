import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  useCreateBusiness,
  useUploadFile,
  useMyBusiness,
} from "../hooks/useAgents";
import { BusinessType } from "../constants/business-types.enum";
import {
  validateContact,
  validateEmail,
} from "../utils/auth/inputValidators.utils";
import { useNavigate } from "react-router-dom";

// ================== Animations ==================
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

// ================== Styled Components ==================
const WizardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172e 0%, #1a2847 50%, #0f3a5e 100%);
  padding: 60px 20px;
  position: relative;
  overflow: hidden;
  font-family: "Inter", sans-serif;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
        circle at 25% 25%,
        rgba(99, 102, 241, 0.15),
        transparent 60%
      ),
      radial-gradient(
        circle at 80% 80%,
        rgba(168, 85, 247, 0.15),
        transparent 60%
      );
    pointer-events: none;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 42px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #94a3b8;
  font-size: 16px;
  margin-bottom: 50px;
`;

const StepWrapper = styled.div<{ isTwoColumn?: boolean }>`
  display: ${({ isTwoColumn }) => (isTwoColumn ? "grid" : "flex")};
  grid-template-columns: ${({ isTwoColumn }) =>
    isTwoColumn ? "1fr 1fr" : "1fr"};
  gap: 30px;
  align-items: flex-start;
  animation: ${fadeIn} 0.4s ease 0.2s both;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(30, 41, 82, 0.75);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 24px;
  padding: 40px;
  transition: all 0.4s ease;
  position: relative;

  &:hover {
    border-color: rgba(99, 102, 241, 0.6);
    box-shadow: 0 0 30px rgba(99, 102, 241, 0.15);
  }

  h3 {
    font-size: 22px;
    font-weight: 700;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 18px;
  margin: 14px 0;
  border: 2px solid rgba(99, 102, 241, 0.2);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.5);
  color: #e2e8f0;
  font-size: 15px;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 16px 18px;
  margin: 14px 0;
  border: 2px solid rgba(99, 102, 241, 0.2);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.5);
  color: #e2e8f0;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: #fff;
  border: none;
  padding: 16px 32px;
  font-size: 15px;
  border-radius: 14px;
  cursor: pointer;
  margin-top: 24px;
  transition: all 0.3s ease;
  font-weight: 700;
  text-transform: uppercase;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #f87171;
  font-size: 13px;
  margin-top: -8px;
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  z-index: 9999;
`;

const Toast = styled.div<{ type: "success" | "error" }>`
  background: ${({ type }) =>
    type === "success"
      ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
      : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"};
  color: white;
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.3);
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalBox = styled.div`
  background: linear-gradient(
    135deg,
    rgba(30, 41, 82, 0.95),
    rgba(51, 65, 117, 0.8)
  );
  padding: 50px;
  border-radius: 24px;
  max-width: 450px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(99, 102, 241, 0.3);

  h3 {
    color: #a78bfa;
    font-size: 28px;
    margin-bottom: 16px;
  }

  p {
    color: #cbd5e1;
    font-size: 15px;
    margin-bottom: 32px;
  }
`;

// ================== Component ==================
const CreateAgents: React.FC = () => {
  const [step, setStep] = useState(0);
  const [csvUploaded, setCsvUploaded] = useState(false);
  const [agentCreated, setAgentCreated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    field: "",
    file: null as File | null,
  });
  const [uid, setUid] = useState("");
  const [errors, setErrors] = useState<{ email?: string; contact?: string }>(
    {}
  );
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: "success" | "error" }[]
  >([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const { mutate: createBusiness } = useCreateBusiness();
  const { mutate: uploadFile } = useUploadFile();
  const { mutate: fetchMyBusiness } = useMyBusiness();

  // Load existing business on mount
  useEffect(() => {
    fetchMyBusiness(undefined, {
      onSuccess: (res) => {
        if (res.data) {
          const b = res.data;
          setUid(b.ownerUid);
          setFormData({
            name: b.name || "",
            contact: b.contact || "",
            email: b.email || "",
            field: b.field || "",
            file: null,
          });
          setCsvUploaded(!!b.csvUploaded);
          if (b.name) {
            setStep(1);
          }

          setUid("6887d11b2b3e6250985710b2");
          if (b.csvUploaded) {
            setAgentCreated(true);
            setShowSuccessModal(true);
          }
        }
      },
    });
  }, []);

  const addToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      4000
    );
  };

  const handleCreateBusiness = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.contact ||
      !formData.field
    ) {
      addToast("Please fill all fields!", "error");
      return;
    }
    createBusiness(formData, {
      onSuccess: (res) => {
        setUid(res.ownerUid);
        setStep(1);
        addToast("Business created successfully!", "success");
      },
      onError: (err) => {
        addToast("Business creation failed.", "error");
      },
    });
  };

  const handleUpload = () => {
    if (csvUploaded) {
      addToast(
        "Agent already created. Check your email for API credentials.",
        "error"
      );
      setShowSuccessModal(true);
      return;
    }

    if (!formData.file) {
      addToast("Please select a file first.", "error");
      return;
    }

    uploadFile(
      { file: formData.file, business_uuid: uid },
      {
        onSuccess: () => {
          setCsvUploaded(true);
          setAgentCreated(true);
          addToast("Agent deployed successfully!", "success");
          setShowSuccessModal(true);
        },
        onError: () => {
          addToast("File upload failed.", "error");
        },
      }
    );
  };

  return (
    <>
      <WizardContainer>
        <Content>
          <Title>{step === 0 ? "Business Setup" : "Upload & Deploy"}</Title>
          <Subtitle>
            {step === 0
              ? "Get your business running in minutes"
              : "Complete your agent setup"}
          </Subtitle>

          <StepWrapper isTwoColumn={step === 1}>
            {step === 0 ? (
              <Card>
                <h3>📋 Business Details</h3>
                <Input
                  placeholder="Business Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Select
                  value={formData.field}
                  onChange={(e) =>
                    setFormData({ ...formData, field: e.target.value })
                  }
                >
                  <option value="">Select Industry Field</option>
                  {Object.values(BusinessType).map((field) => (
                    <option key={field} value={field}>
                      {field}
                    </option>
                  ))}
                </Select>
                <Button onClick={handleCreateBusiness}>Continue →</Button>
              </Card>
            ) : (
              <>
                <Card>
                  <h3>✅ Business Summary</h3>
                  <p>
                    <strong>Business:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Contact:</strong> {formData.contact}
                  </p>
                  <p>
                    <strong>Industry:</strong> {formData.field}
                  </p>
                  <p>
                    <strong>CSV Status:</strong>{" "}
                    {csvUploaded ? "✅ Uploaded" : "⏳ Pending"}
                  </p>
                  <p>
                    <strong>Agent Status:</strong>{" "}
                    {agentCreated ? "✅ Active" : "⏳ Pending"}
                  </p>
                </Card>

                <Card>
                  <h3>📤 Upload CSV Data</h3>
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        file: e.target.files ? e.target.files[0] : null,
                      })
                    }
                  />
                  <Button onClick={handleUpload}>Deploy Agent →</Button>
                </Card>
              </>
            )}
          </StepWrapper>

          <ToastContainer>
            {toasts.map((t) => (
              <Toast key={t.id} type={t.type}>
                {t.message}
              </Toast>
            ))}
          </ToastContainer>
        </Content>
      </WizardContainer>

      {showSuccessModal && (
        <ModalOverlay>
          <ModalBox>
            <h3>🎉 Agent Active!</h3>
            <p>
              Your AI agent is fully active! Check your email for API
              credentials and integration details.
            </p>
            <Button onClick={() => navigate("/")}>Go to Dashboard →</Button>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
};

export default CreateAgents;
