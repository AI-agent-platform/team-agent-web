import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  useCreateBusiness,
  useUploadFile,
  useMyBusiness,
} from "../hooks/useAgents";
import { BusinessType } from "../constants/business-types.enum";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  UploadCloud,
  Building2,
  Phone,
  Mail,
  Briefcase,
  Loader2,
} from "lucide-react";
import {
  validateContact,
  validateEmail,
  validateField,
  validateName,
} from "../utils/auth/inputValidators.utils";
import { InputField } from "../components/form-components/InputField";

// ================== Animations ==================
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// ================== Modern Metallic Theme ==================
const WizardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0f1c 0%, #1c2b3a 40%, #0e1a26 100%);
  padding: 60px 20px;
  font-family: "Inter", sans-serif;
  color: #e0f2ff;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 16px 18px;
  margin: 14px 0;
  border: 1.8px solid
    ${({ error }) => (error ? "#ff4d4d" : "rgba(77,166,255,0.25)")};
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(6px);
  color: #e0f2ff;
  font-size: 15px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ error }) => (error ? "#ff4d4d" : "#4da6ff")};
    box-shadow: 0 0 10px rgba(77, 166, 255, 0.3);
  }

  &::placeholder {
    color: #9eaec6;
  }
`;

const ErrorMessage = styled.span`
  color: #ff4d4d;
  font-size: 13px;
  display: block;
  margin: -10px 0 12px 18px;
  font-weight: 500;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #4da6ff, #67e8f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #9eaec6;
  font-size: 16px;
  margin-bottom: 50px;
`;

const StepWrapper = styled.div<{ isTwoColumn?: boolean }>`
  display: ${({ isTwoColumn }) => (isTwoColumn ? "grid" : "flex")};
  grid-template-columns: ${({ isTwoColumn }) =>
    isTwoColumn ? "1fr 1fr" : "1fr"};
  gap: 30px;
  align-items: flex-start;
  animation: ${fadeIn} 0.5s ease;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(77, 166, 255, 0.25);
  border-radius: 20px;
  padding: 35px 40px;
  transition: all 0.3s ease;
  box-shadow: 0 0 25px rgba(77, 166, 255, 0.08);

  &:hover {
    border-color: rgba(77, 166, 255, 0.5);
    box-shadow: 0 0 35px rgba(77, 166, 255, 0.2);
  }

  h3 {
    font-size: 22px;
    font-weight: 700;
    background: linear-gradient(135deg, #4da6ff, #67e8f9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  font-size: 15px;

  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(77, 166, 255, 0.2);
  padding: 12px 15px;
  border-radius: 10px;
  transition: 0.25s;

  &:hover {
    border-color: #4da6ff;
    box-shadow: 0 0 10px rgba(77, 166, 255, 0.15);
  }

  svg {
    color: #4da6ff;
  }

  span.label {
    color: #9eaec6;
    font-size: 13px;
    display: block;
  }

  span.value {
    font-weight: 500;
    font-size: 15px;
    color: #e0f2ff;
  }
`;

const Status = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: ${({ active }) => (active ? "#4ade80" : "#fbbf24")};

  svg {
    flex-shrink: 0;
  }
`;

const Select = styled.select<{ error?: boolean }>`
  width: 100%;
  padding: 16px 18px;
  margin: 14px 0;
  border: 1.8px solid
    ${({ error }) => (error ? "#ff4d4d" : "rgba(77,166,255,0.25)")};
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #e0f2ff;
  transition: 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ error }) => (error ? "#ff4d4d" : "#4da6ff")};
    box-shadow: 0 0 10px rgba(77, 166, 255, 0.3);
  }
`;

const SpinningLoader = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

const Button = styled.button<{ loading?: boolean }>`
  background: linear-gradient(135deg, #4da6ff 0%, #67e8f9 100%);
  color: #0a0f1c;
  border: none;
  padding: 16px 32px;
  font-size: 15px;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 24px;
  transition: all 0.3s ease;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 0 20px rgba(77, 166, 255, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 0 30px rgba(77, 166, 255, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
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
      ? "linear-gradient(135deg, #4ade80, #22c55e)"
      : "linear-gradient(135deg, #ff4d4d, #dc2626)"};
  color: white;
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.3);
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 10, 20, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
`;

const ModalBox = styled.div`
  background: linear-gradient(
    135deg,
    rgba(15, 23, 35, 0.95),
    rgba(25, 38, 56, 0.85)
  );
  padding: 50px;
  border-radius: 22px;
  max-width: 450px;
  width: 90%;
  text-align: center;
  box-shadow: 0 0 40px rgba(77, 166, 255, 0.25);
  border: 1px solid rgba(77, 166, 255, 0.3);

  h3 {
    color: #67e8f9;
    font-size: 26px;
    margin-bottom: 16px;
  }

  p {
    color: #9eaec6;
    font-size: 15px;
    margin-bottom: 32px;
  }
`;

// ================== Main Component ==================
const CreateAgents: React.FC = () => {
  const [step, setStep] = useState(0);
  const [csvUploaded, setCsvUploaded] = useState(false);
  const [agentCreated, setAgentCreated] = useState(false);
  const [uid, setUid] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    field: "",
    file: null as File | null,
  });
  const [touched, setTouched] = useState({
    name: false,
    contact: false,
    email: false,
    field: false,
  });
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: "success" | "error" }[]
  >([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const { mutate: createBusiness } = useCreateBusiness();
  const { mutate: uploadFile } = useUploadFile();
  const { mutate: fetchMyBusiness } = useMyBusiness();

  useEffect(() => {
    fetchMyBusiness(undefined, {
      onSuccess: (res) => {
        if (res.data) {
          const b = res.data;
          setFormData({
            name: b.name || "",
            contact: b.contact || "",
            email: b.email || "",
            field: b.field || "",
            file: null,
          });
          setUid(b.ownerUid);
          setCsvUploaded(!!b.csvUploaded);
          if (b.csvUploaded) {
            setAgentCreated(true);
            setShowSuccessModal(true);
          }
          if (b.name) setStep(1);
        }
      },
    });
  }, [step]);

  const addToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      4000
    );
  };

  const isFormValid = (): boolean => {
    return (
      validateName(formData.name).valid &&
      validateEmail(formData.email).valid &&
      validateContact(formData.contact).valid &&
      validateField(formData.field).valid
    );
  };

  const handleCreateBusiness = () => {
    setTouched({ name: true, email: true, contact: true, field: true });

    if (!isFormValid()) {
      addToast("Please fill all fields correctly!", "error");
      return;
    }

    setLoadingCreate(true);
    createBusiness(formData, {
      onSuccess: () => {
        addToast("Business created successfully!", "success");
        setStep(1);
      },
      onError: () => addToast("Business creation failed.", "error"),
      onSettled: () => setLoadingCreate(false),
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

    setLoadingUpload(true);
    uploadFile(
      { file: formData.file, business_uuid: uid },
      {
        onSuccess: () => {
          setCsvUploaded(true);
          setAgentCreated(true);
          addToast("Agent deployed successfully!", "success");
          setShowSuccessModal(true);
        },
        onError: () => addToast("File upload failed.", "error"),
        onSettled: () => setLoadingUpload(false),
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
              : "Review your info & deploy your agent"}
          </Subtitle>

          <StepWrapper isTwoColumn={step === 1}>
            {step === 0 ? (
              <Card style={{ width: "100%" }}>
                <h3>📋 Business Details</h3>
                <div style={{ width: "100%" }}>
                  <InputField
                    placeholder="Business Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    validator={validateName}
                    touched={touched.name}
                    onBlur={() => setTouched({ ...touched, name: true })}
                  />
                  <InputField
                    placeholder="Contact Number"
                    value={formData.contact}
                    onChange={(e) => {
                      const digitsOnly = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setFormData({ ...formData, contact: digitsOnly });
                    }}
                    validator={validateContact}
                    touched={touched.contact}
                    onBlur={() => setTouched({ ...touched, contact: true })}
                  />
                  <InputField
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    validator={validateEmail}
                    touched={touched.email}
                    onBlur={() => setTouched({ ...touched, email: true })}
                  />
                  <InputWrapper>
                    <Select
                      value={formData.field}
                      onChange={(e) =>
                        setFormData({ ...formData, field: e.target.value })
                      }
                      onBlur={() => setTouched({ ...touched, field: true })}
                      error={
                        touched.field && !validateField(formData.field).valid
                      }
                    >
                      <option value="">Select Industry Field</option>
                      {Object.entries(BusinessType).map(([key, value]) => (
                        <option key={key} value={value}>
                          {key}
                        </option>
                      ))}
                    </Select>
                    {touched.field && !validateField(formData.field).valid && (
                      <ErrorMessage>
                        {validateField(formData.field).error}
                      </ErrorMessage>
                    )}
                  </InputWrapper>
                </div>
                <Button
                  onClick={handleCreateBusiness}
                  disabled={loadingCreate || !isFormValid()}
                  loading={loadingCreate}
                >
                  {loadingCreate ? (
                    <>
                      <SpinningLoader size={18} /> Creating...
                    </>
                  ) : (
                    "Continue →"
                  )}
                </Button>
              </Card>
            ) : (
              <>
                <Card>
                  <h3>
                    You have successfully created your agents. Now lets input
                    your business data for accurate response
                  </h3>
                  <InfoGrid>
                    <InfoItem>
                      <Building2 size={18} />
                      <div>
                        <span className="label">Business Name</span>
                        <span className="value">{formData.name}</span>
                      </div>
                    </InfoItem>

                    <InfoItem>
                      <Mail size={18} />
                      <div>
                        <span className="label">Email</span>
                        <span className="value">{formData.email}</span>
                      </div>
                    </InfoItem>

                    <InfoItem>
                      <Phone size={18} />
                      <div>
                        <span className="label">Contact</span>
                        <span className="value">{formData.contact}</span>
                      </div>
                    </InfoItem>

                    <InfoItem>
                      <Briefcase size={18} />
                      <div>
                        <span className="label">Industry</span>
                        <span className="value">{formData.field}</span>
                      </div>
                    </InfoItem>

                    <InfoItem>
                      <UploadCloud size={18} />
                      <div>
                        <span className="label">CSV Status</span>
                        <Status active={csvUploaded}>
                          {csvUploaded ? (
                            <>
                              <CheckCircle size={18} /> Uploaded
                            </>
                          ) : (
                            <>
                              <Clock size={18} /> Pending
                            </>
                          )}
                        </Status>
                      </div>
                    </InfoItem>

                    <InfoItem>
                      <CheckCircle size={18} />
                      <div>
                        <span className="label">Agent Status</span>
                        <Status active={agentCreated}>
                          {agentCreated ? (
                            <>
                              <CheckCircle size={18} /> Active
                            </>
                          ) : (
                            <>
                              <Clock size={18} /> Pending
                            </>
                          )}
                        </Status>
                      </div>
                    </InfoItem>
                  </InfoGrid>
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
                  <Button
                    onClick={handleUpload}
                    disabled={loadingUpload}
                    loading={loadingUpload}
                  >
                    {loadingUpload ? (
                      <>
                        <SpinningLoader size={18} /> Deploying...
                      </>
                    ) : (
                      "Deploy Agent →"
                    )}
                  </Button>
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
              Your AI agent is now fully deployed. Check your email for API
              credentials and integration instructions.
            </p>
            <Button onClick={() => navigate("/")}>Go to Dashboard →</Button>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
};

export default CreateAgents;
