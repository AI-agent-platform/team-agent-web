import React from 'react';
import styled from 'styled-components';

export const PageBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(90deg, #0f2027 0%, #2c5364 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 370px;
  margin: 40px 0;
  padding: 36px 28px 28px 28px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(44,83,100,0.13);
`;

const Title = styled.h2`
  margin-bottom: 24px;
  text-align: center;
  color: #2c5364;
  font-size: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const StyledInput = styled.input`
  padding: 12px 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: #f7fafd;
  transition: border 0.2s, box-shadow 0.2s;
  &:focus {
    border-color: #00c6ff;
    outline: none;
    box-shadow: 0 0 0 2px #00c6ff33;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 0;
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  box-shadow: 0 2px 8px rgba(44,83,100,0.08);
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #0072ff 0%, #00c6ff 100%);
  }
`;

type AuthFormProps = {
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  children: React.ReactNode;
};

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, buttonText, children }) => (
  <FormWrapper>
    <Title>{title}</Title>
    <StyledForm onSubmit={onSubmit} autoComplete="off">
      {children}
      <SubmitButton type="submit">{buttonText}</SubmitButton>
    </StyledForm>
  </FormWrapper>
);

export default AuthForm; 