import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useCreateBusiness,
  useSelectField,
  useUploadFile,
  useCreateDualAgents,
  useMyBusiness,
} from "../hooks/useAgents";
import { BusinessType } from "../constants/business-types.enum";

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
      border-color: #4caf50;
      background-color: #e8f5e9;
    }
    &.selected {
      border-color: #4caf50;
      background-color: #c8e6c9;
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
    &:hover {
      opacity: 0.9;
    }
  }

  .back {
    background-color: #ccc;
    color: #333;
  }

  .next {
    background-color: #4caf50;
    color: white;
  }

  .next:disabled {
    background-color: #aaa;
    cursor: not-allowed;
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
  background-color: ${(props) => (props.active ? "#4caf50" : "#ddd")};
  transition: 0.3s;
`;

// --- Component ---
const CreateAgents: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    uid: "",
    field: "",
    files: [] as File[],
  });
  const token = localStorage.getItem("access_token");
  const { mutate: createBusiness } = useCreateBusiness(token!);
  const { mutate: uploadFile } = useUploadFile();
  const { mutate: createDualAgents } = useCreateDualAgents();
  const { mutate: fetchMyBusiness } = useMyBusiness(token!);

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
          uid: business._id || "",
          field: business.field || "",
        });

        const firstIncomplete = [0, 1, 2, 3, 4, 5].find(
          (s) => !res.completedSteps.includes(s)
        );
        setStep(firstIncomplete ?? 6);
      },
    });
  }, []);

  const handleNext = () => {
    if (step === 3) {
      // After field selection step
      createBusiness(
        {
          name: formData.name,
          contact: formData.contact,
          email: formData.email,
          field: formData.field, 
        },
        {
          onSuccess: (res) => {
            setFormData({ ...formData, uid: res.uid });
            setStep(step + 1);
          },
        }
      );
    } else if (step === 4) {
      const file = formData.files[0];
      if (file) {
        uploadFile(
          {
            uid: formData.uid,
            companyName: formData.name,
            field: formData.field,
            file,
          },
          { onSuccess: () => setStep(step + 1) }
        );
      }
    } else if (step === 5) {
      createDualAgents(
        { uid: formData.uid, field: formData.field },
        {
          onSuccess: (res) => {
            alert(
              `Agents created!\nAdmin: ${res.adminUrl}\nClient: ${res.clientUrl}`
            );
            setStep(step + 1);
          },
        }
      );
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

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
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
          />
        );
      case 2:
        return (
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
      case 4:
        return (
          <input
            type="file"
            onChange={(e) =>
              setFormData({
                ...formData,
                files: e.target.files ? Array.from(e.target.files) : [],
              })
            }
          />
        );
      case 5:
        return (
          <p>
            Ready to create dual agents for UID: <b>{formData.uid}</b>
          </p>
        );
      default:
        return <p>🎉 Setup complete!</p>;
    }
  };
  return (
    <WizardContainer>
      <h2>Step {step + 1} / 5</h2>
      <StepContent>{renderStep()}</StepContent>
      <WizardButtons>
        {step < 3 && step > 0 && <button onClick={handleBack}>Back</button>}
        {step <= 4 && (
          <button
            className="next"
            onClick={handleNext}
            disabled={step === 3 && !formData.field} // must select field
          >
            Next
          </button>
        )}
      </WizardButtons>
      <ProgressBar>
        {[...Array(5)].map((_, i) => (
          <ProgressStep key={i} active={i <= step} />
        ))}
      </ProgressBar>
    </WizardContainer>
  );
};

export default CreateAgents;
