import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  useCreateBusiness,
  useUploadFile,
  useCreateDualAgents,
  useMyBusiness,
} from "../hooks/useAgents";
import { BusinessType } from "../constants/business-types.enum";
import {
  validateContact,
  validateEmail,
} from "../utils/auth/inputValidators.utils";

// --- Styled Components ---
const WizardContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  border-radius: 16px;
  background: linear-gradient(135deg, #f0f4ff, #ffffff);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Roboto", sans-serif;
`;

const StepContent = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  input[type="text"],
  input[type="email"],
  input[type="file"] {
    width: 80%;
    padding: 12px;
    margin: 10px 0;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: 0.3s;
    &:focus {
      border-color: #4caf50;
      outline: none;
      box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
    }
  }

  /* Styles for the create-agents button placed here so it applies when the button is rendered inside StepContent */
  .create-agents {
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 14px 28px;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(76, 175, 80, 0.18);
    transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
    margin-top: 8px;
  }

  .create-agents:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(76, 175, 80, 0.22);
  }

  .create-agents:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const FieldsSelection = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;

  .field-card {
    flex: 1;
    padding: 20px;
    margin: 0 10px;
    border-radius: 12px;
    border: 2px solid #ddd;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: 0.3s;
    text-transform: uppercase;
    font-weight: bold;
    color: #333;

    &:hover {
      border-color: #2196f3;
      background-color: #e3f2fd;
    }

    &.selected {
      border-color: #2196f3;
      background-color: #bbdefb;
    }
  }
`;

const WizardButtons = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;

  button {
    padding: 12px 25px;
    font-size: 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s;
    &:hover:enabled {
      opacity: 0.9;
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .back {
    background-color: #ccc;
    color: #333;
  }

  .next {
    background-color: #2196f3;
    color: white;
  }

  /* keep create-agents here as well for safety if you ever render it inside the button area */
  .create-agents {
    background-color: #4caf50;
    color: #fff;
    padding: 14px 28px;
    font-size: 17px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  }
`;

const ProgressBar = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
`;

const ProgressStep = styled.div<{ active: boolean }>`
  flex: 1;
  height: 10px;
  margin: 0 4px;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? "#2196f3" : "#ddd")};
  transition: 0.3s;
`;

const LoadingText = styled.p`
  color: #ff7f50;
  font-weight: bold;
  margin: 10px 0;
`;

// --- Toasts ---
const slideIn = keyframes`
  0% { transform: translateY(-100%); opacity: 0 }
  100% { transform: translateY(0); opacity: 1 }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
`;

const Toast = styled.div<{ type: "success" | "error" }>`
  min-width: 250px;
  margin-bottom: 10px;
  padding: 15px 20px;
  color: #fff;
  background-color: ${(props) =>
    props.type === "success" ? "#4caf50" : "#f44336"};
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.3s ease forwards;
`;

interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "error";
}

// --- Component ---
const CreateAgents: React.FC = () => {
  const [step, setStep] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    uid: "",
    field: "",
    files: [] as File[],
  });
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [errors, setErrors] = useState<{ email?: string; contact?: string }>(
    {}
  );
  const token = localStorage.getItem("access_token");
  const { mutate: createBusiness } = useCreateBusiness(token!);
  const { mutate: uploadFile } = useUploadFile(token!);
  const { mutate: createDualAgents } = useCreateDualAgents();
  const { mutate: fetchMyBusiness } = useMyBusiness(token!);

  // Fetch existing business info
  useEffect(() => {
    fetchMyBusiness(undefined, {
      onSuccess: (res) => {
        if (!res.data) return;
        const business = res.data;
        setFormData({
          ...formData,
          name: business.name || "",
          contact: business.contact || "",
          email: business.email || "",
          uid: business.ownerUid || "",
          field: business.field || "",
          files: [],
        });

        const firstIncomplete = [0, 1, 2, 3, 4, 5].find(
          (s) => !res.completedSteps.includes(s)
        );
        setStep(firstIncomplete ?? 6);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // --- Step navigation ---
  const handleNext = () => {
    setButtonsDisabled(true);

    if (step === 3) {
      // --- Business creation ---
      if (!formData.field) {
        addToast("Please select a field!", "error");
        setButtonsDisabled(false);
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
            setFormData({ ...formData });
            setLoadingMessage(null);
            addToast("Business created successfully!", "success");
            setStep(step + 1);
            setButtonsDisabled(false);
          },
          onError: (err) => {
            setLoadingMessage(null);
            const message =
              err.response?.data?.message ||
              err.response?.data?.detail ||
              err.message ||
              "Business creation failed.";

            addToast(message, "error");
            setButtonsDisabled(false);
          },
        }
      );
    } else if (step === 4) {
      // --- File upload only ---
      const file = formData.files[0];
      if (!file) {
        addToast("Please select a file to upload.", "error");
        setButtonsDisabled(false);
        return;
      }

      setLoadingMessage("Uploading file...");
      uploadFile(
        {
          uid: formData.uid,
          companyName: formData.name,
          field: formData.field,
          file,
        },
        {
          onSuccess: () => {
            setLoadingMessage(null);
            addToast("File uploaded successfully!", "success");
            setStep(step + 1); // Go to step 5
            setButtonsDisabled(false);
          },
          onError: () => {
            setLoadingMessage(null);
            addToast("File upload failed.", "error");
            setButtonsDisabled(false);
          },
        }
      );
    } else {
      setStep(step + 1);
      setButtonsDisabled(false);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // --- Agent creation ---
  const handleCreateAgents = () => {
    setButtonsDisabled(true);
    setLoadingMessage("Creating dual agents...");

    createDualAgents(
      {
        action: "dual_agents_confirm",
        uid: formData.uid,
        company_name: formData.name,
        field: formData.field,
      },
      {
        onSuccess: () => {
          setLoadingMessage(null);
          addToast("Dual agents created successfully!", "success");
          setStep(step + 1);
          setButtonsDisabled(false);
        },
        onError: () => {
          setLoadingMessage(null);
          addToast("Failed to create agents.", "error");
          setButtonsDisabled(false);
        },
      }
    );
  };

  // --- Render steps ---
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        );
      case 1:
        return (
          <input
            type="text"
            placeholder="Contact"
            value={formData.contact}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({ ...formData, contact: value });
              setErrors({
                ...errors,
                contact: validateContact(value)
                  ? ""
                  : "Contact number must be at least 7 characters",
              });
            }}
          />
        );
      case 2:
        return (
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({ ...formData, email: value });
              setErrors({
                ...errors,
                email: validateEmail(value) ? "" : "Invalid email format",
              });
            }}
          />
        );
      case 3:
        return (
          <FieldsSelection>
            {Object.values(BusinessType).map((fieldOption) => (
              <div
                key={fieldOption}
                className={`field-card ${
                  formData.field === fieldOption ? "selected" : ""
                }`}
                onClick={() => setFormData({ ...formData, field: fieldOption })}
              >
                {fieldOption.charAt(0).toUpperCase() + fieldOption.slice(1)}
              </div>
            ))}
          </FieldsSelection>
        );
      //   case 4:
      //     return (
      //       <input
      //         type="file"
      //         onChange={(e) =>
      //           setFormData({
      //             ...formData,
      //             files: e.target.files ? Array.from(e.target.files) : [],
      //           })
      //         }
      //       />
      //     );
      //   case 5:
      //     // Step 6 (index 5): ONLY render the create-agents button (no other text, no back button)
      //     return (
      //       <button
      //         className="create-agents"
      //         onClick={handleCreateAgents}
      //         disabled={buttonsDisabled}
      //       >
      //         {buttonsDisabled ? "Creating Agents..." : "Create Agents"}
      //       </button>
      //     );
      case 4:
        return (
          <p>🎉 Setup completed! You will get user guide through your email</p>
        );

      default:
        return (
          <p>🎉 Setup completed! You will get user guide through your email</p>
        );
    }
  };

  return (
    <WizardContainer>
      <h2>Step {step + 1} / 6</h2>
      <StepContent>
        {renderStep()}

        {loadingMessage && step !== 5 && (
          <LoadingText>{loadingMessage}</LoadingText>
        )}
      </StepContent>
      <WizardButtons>
        {step > 0 && step < 4 && (
          <button
            className="back"
            onClick={handleBack}
            disabled={buttonsDisabled}
          >
            Back
          </button>
        )}
        {step <= 3 && (
          <button
            className="next"
            onClick={handleNext}
            disabled={
              buttonsDisabled ||
              (step === 3 && !formData.field) ||
              (step === 1 && !!errors.contact) ||
              (step === 2 && !!errors.email)
            }
          >
            Next
          </button>
        )}
      </WizardButtons>
      <ProgressBar>
        {[...Array(4)].map((_, i) => (
          <ProgressStep key={i} active={i <= step} />
        ))}
      </ProgressBar>

      <ToastContainer>
        {toasts.map((toast) => (
          <Toast key={toast.id} type={toast.type}>
            {toast.message}
          </Toast>
        ))}
      </ToastContainer>
    </WizardContainer>
  );
};

export default CreateAgents;
