import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  useCreateBusiness,
  useUploadFile,
  useMyBusiness,
} from "../hooks/useAgents";
import { BusinessType } from "../constants/business-types.enum";
import { validateContact, validateEmail } from "../utils/auth/inputValidators.utils";
import { useNavigate } from "react-router-dom";

// ================= Styled Components =================
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const WizardContainer = styled.div`
  max-width: 650px;
  margin: 70px auto;
  padding: 50px 40px;
  border-radius: 20px;
  background: linear-gradient(145deg, #f9fbff, #ffffff);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
  text-align: center;
  font-family: "Inter", sans-serif;
  animation: ${fadeIn} 0.4s ease;
`;

const Title = styled.h2`
  font-size: 26px;
  color: #222;
  font-weight: 600;
  margin-bottom: 25px;
`;

const StepContent = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.4s ease;

  input,
  select {
    width: 85%;
    padding: 14px;
    margin: 12px 0;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 10px;
    transition: all 0.3s;
    background-color: #fafafa;

    &:focus {
      border-color: #2196f3;
      outline: none;
      background-color: #fff;
      box-shadow: 0 0 6px rgba(33, 150, 243, 0.3);
    }
  }

  button {
    background: linear-gradient(90deg, #2196f3, #1976d2);
    color: #fff;
    border: none;
    padding: 14px 28px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
    transition: 0.3s;
    box-shadow: 0 6px 15px rgba(33, 150, 243, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 18px rgba(33, 150, 243, 0.4);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  }
`;

const ErrorText = styled.p`
  color: #f44336;
  font-size: 14px;
  margin-top: -5px;
`;

const LoadingText = styled.p`
  color: #ff7f50;
  font-weight: 600;
  margin: 15px 0;
  font-size: 15px;
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 25px;
  right: 25px;
  z-index: 9999;
`;

const slideIn = keyframes`
  0% { transform: translateY(-100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const Toast = styled.div<{ type: "success" | "error" }>`
  min-width: 270px;
  margin-bottom: 10px;
  padding: 15px 20px;
  color: #fff;
  background: ${(props) =>
    props.type === "success"
      ? "linear-gradient(90deg, #43a047, #2e7d32)"
      : "linear-gradient(90deg, #f44336, #d32f2f)"};
  border-radius: 8px;
  font-weight: 500;
  animation: ${slideIn} 0.4s ease forwards;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
`;

// ===== Modal Styling =====
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalBox = styled.div`
  background: #ffffff;
  padding: 35px 40px;
  border-radius: 16px;
  max-width: 420px;
  width: 90%;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease;

  h3 {
    color: #2196f3;
    font-size: 22px;
    margin-bottom: 12px;
  }

  p {
    font-size: 15px;
    color: #555;
    margin-bottom: 25px;
    line-height: 1.5;
  }

  button {
    background: linear-gradient(90deg, #2196f3, #1976d2);
    border: none;
    color: white;
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: linear-gradient(90deg, #1976d2, #0d47a1);
      transform: translateY(-1px);
    }
  }
`;

// =============== Component ===============
interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "error";
}

const CreateAgents: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    field: "",
    file: null as File | null,
  });
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [uid, setUid] = useState("");
  const [errors, setErrors] = useState<{ email?: string; contact?: string }>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const { mutate: createBusiness } = useCreateBusiness();
  const { mutate: uploadFile } = useUploadFile();
  const { mutate: fetchMyBusiness } = useMyBusiness();

  useEffect(() => {
    fetchMyBusiness(undefined, {
      onSuccess: (res) => {
        if (res.data) {
          const business = res.data;
          if (business.name) setStep(1);
          setFormData({
            name: business.name || "",
            contact: business.contact || "",
            email: business.email || "",
            field: business.field || "",
            file: null,
          });
          setUid(business.ownerUid);
        }
      },
    });
  }, []);

  const addToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const handleCreateBusiness = () => {
    if (!formData.name || !formData.email || !formData.contact || !formData.field) {
      addToast("Please fill all fields!", "error");
      return;
    }
    if (errors.email || errors.contact) {
      addToast("Please fix validation errors.", "error");
      return;
    }

    setLoadingMessage("Creating your business...");
    createBusiness(
      {
        name: formData.name,
        contact: formData.contact,
        email: formData.email,
        field: formData.field,
      },
      {
        onSuccess: (res) => {
          setLoadingMessage(null);
          setUid(res.ownerUid);
          addToast("Business created successfully!", "success");
          setStep(1);
        },
        onError: (err) => {
          setLoadingMessage(null);
          const message =
            err.response?.data?.message ||
            err.response?.data?.detail ||
            err.message ||
            "Business creation failed.";
          addToast(message, "error");
        },
      }
    );
  };

  const handleUpload = () => {
    if (!formData.file) {
      addToast("Please select a file first.", "error");
      return;
    }

    setLoadingMessage("Uploading file...");
    uploadFile(
      {
        file: formData.file,
        business_uuid: uid,
      },
      {
        onSuccess: () => {
          setLoadingMessage(null);
          setShowSuccessModal(true); // ✅ Show modal
        },
        onError: () => {
          setLoadingMessage(null);
          addToast("File upload failed.", "error");
        },
      }
    );
  };

  const renderStep = () => {
    if (step === 0) {
      return (
        <>
          <input
            type="text"
            placeholder="Business Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={(e) => {
              const val = e.target.value;
              setFormData({ ...formData, contact: val });
              setErrors({
                ...errors,
                contact: validateContact(val)
                  ? ""
                  : "Contact number must be at least 7 characters",
              });
            }}
          />
          {errors.contact && <ErrorText>{errors.contact}</ErrorText>}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              const val = e.target.value;
              setFormData({ ...formData, email: val });
              setErrors({
                ...errors,
                email: validateEmail(val) ? "" : "Invalid email format",
              });
            }}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
          <select
            value={formData.field}
            onChange={(e) => setFormData({ ...formData, field: e.target.value })}
          >
            <option value="">Select Field</option>
            {Object.values(BusinessType).map((fieldOption) => (
              <option key={fieldOption} value={fieldOption}>
                {fieldOption.charAt(0).toUpperCase() + fieldOption.slice(1)}
              </option>
            ))}
          </select>
          <button onClick={handleCreateBusiness}>Next</button>
        </>
      );
    } else if (step === 1) {
      return (
        <>
          <input
            type="file"
            accept=".csv"
            onChange={(e) =>
              setFormData({
                ...formData,
                file: e.target.files ? e.target.files[0] : null,
              })
            }
          />
          <button onClick={handleUpload} disabled={!formData.file}>
            Upload CSV Data
          </button>
        </>
      );
    } else {
      return <p>🎉 Setup completed! You will get a user guide via email.</p>;
    }
  };

  return (
    <>
      <WizardContainer>
        <Title>
          {step === 0 ? "Business Setup" : "Upload Your Business Data"}
        </Title>
        <StepContent>
          {renderStep()}
          {loadingMessage && <LoadingText>{loadingMessage}</LoadingText>}
        </StepContent>

        <ToastContainer>
          {toasts.map((toast) => (
            <Toast key={toast.id} type={toast.type}>
              {toast.message}
            </Toast>
          ))}
        </ToastContainer>
      </WizardContainer>

      {/* ✅ Success Modal */}
      {showSuccessModal && (
        <ModalOverlay>
          <ModalBox>
            <h3>🎉 Upload Successful</h3>
            <p>
              Your business data is uploaded successfully. You will receive an
              email containing both business and customer agent API URLs.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/"); // redirect to home
              }}
            >
              OK
            </button>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
};

export default CreateAgents;
