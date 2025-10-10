import { styled } from "styled-components";

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 16px 18px;
  margin: 14px 0;
  border: 2px solid
    ${({ error }) => (error ? "#ef4444" : "rgba(99, 102, 241, 0.2)")};
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.5);
  color: #e2e8f0;
  font-size: 15px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ error }) =>
      error ? "#ef4444" : "rgba(99, 102, 241, 0.6)"};
  }
`;

const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 13px;
  display: block;
  margin: -12px 0 14px 18px;
  font-weight: 500;
`;

interface ValidatedInputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validator: (value: string) => { valid: boolean; error?: string };
  touched: boolean;
  onBlur: () => void;
}

export const InputField: React.FC<ValidatedInputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  validator,
  touched,
  onBlur,
}) => {
  const validation = validator(value);

  return (
    <InputWrapper>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={touched && !validation.valid}
      />
      {touched && !validation.valid && (
        <ErrorMessage>{validation.error}</ErrorMessage>
      )}
    </InputWrapper>
  );
};
