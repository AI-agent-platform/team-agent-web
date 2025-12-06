import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import loginImage from "../Assets/authentication/login.webp";

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #163c3d 0%, #163c3d 50%, #0f172a 100%);
  position: relative;
  margin-top: 80px;

  @media (max-width: 768px) {
    margin-top: 60px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  gap: 0;
  z-index: 10;
  margin-right: 50%;

  @media (max-width: 1024px) {
    padding: 40px 20px;
    margin-right: 0;
  }
`;

const FormSection = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const ImageSection = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 50%;
  height: 100vh;
  background: url(${loginImage}) no-repeat center center;
  background-size: cover;
  background-position: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.3) 0%, rgba(30, 41, 59, 0.1) 100%);
    z-index: 1;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Card = styled.div`
  background: rgba(64, 58, 232, 0.08);
  backdrop-filter: blur(16px);
  padding: 50px 60px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  width: 520px;
  max-width: 100%;
  text-align: center;
  animation: slideInUp 0.6s ease-out;

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 1024px) {
    width: 100%;
    padding: 50px 40px;
  }
`;

const Title = styled.h2`
  margin-bottom: 8px;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.75rem;
  background: linear-gradient(135deg, #60a5fa 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 25px;
  font-weight: 400;
`;

const FormGroup = styled.div`
  margin-bottom: 22px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  color: #cbd5e1;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input<{ hasError?: boolean; isValid?: boolean }>`
  width: 100%;
  padding: 14px 16px 14px 45px;
  border-radius: 12px;
  border: 2px solid ${(props) =>
    props.hasError ? "#ef4444" : props.isValid ? "#10b981" : "rgba(148, 163, 184, 0.3)"};
  background: rgba(255, 255, 255, 0.08);
  font-size: 1rem;
  color: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:hover {
    border-color: ${(props) => (props.hasError ? "#ef4444" : "rgba(148, 163, 184, 0.5)")};
  }
`;

const IconContainer = styled.span`
  position: absolute;
  left: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 1.2rem;
  transition: color 0.3s;
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.5);
  color: #fca5a5;
  border-radius: 12px;
  padding: 12px 16px;
  text-align: center;
  margin-bottom: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 14px 20px;
  margin-top: 28px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(59, 130, 246, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 30px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.3), transparent);
  }
`;

const DividerText = styled.span`
  color: #64748b;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

const SocialButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
`;

const SwitchLink = styled.div`
  margin-top: 24px;
  font-size: 0.95rem;
  color: #94a3b8;

  a {
    color: #60a5fa;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;

    &:hover {
      color: #06b6d4;
      text-decoration: underline;
    }
  }
`;

const ForgotPasswordLink = styled.div`
  margin-top: 16px;
  font-size: 0.9rem;

  a {
    color: #60a5fa;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;

    &:hover {
      color: #06b6d4;
      text-decoration: underline;
    }
  }
`;

const LoaderSpinner = styled.span`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsPending(true);

    login(
      { email, password },
      () => {
        setIsPending(false);
        toast.success("Logged in successfully!");
        navigate("/landing");
      },
      (err) => {
        setIsPending(false);
        const message = err?.response?.data?.message || "Login failed";
        setErrorMsg(message);
        toast.error(message);
      }
    );
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) return;
    try {
      await googleLogin(credentialResponse.credential);
      toast.success("Logged in with Google!");
      navigate("/landing");
    } catch (err) {
      console.error(err);
      toast.error("Google login failed!");
    }
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <ContentWrapper>
          <FormSection>
            <Card>
              <Title>Welcome Back</Title>
              <Subtitle>Sign in to your account</Subtitle>

              {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}

              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Email Address</Label>
                  <InputWrapper>
                    <IconContainer>📧</IconContainer>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputWrapper>
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <InputWrapper>
                    <IconContainer>🔐</IconContainer>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </InputWrapper>
                </FormGroup>

                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <LoaderSpinner />
                      Logging in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <ForgotPasswordLink>
                <Link to="/forgot-password">Forgot password?</Link>
              </ForgotPasswordLink>

              <Divider>
                <DividerText>OR CONTINUE WITH</DividerText>
              </Divider>

              <SocialButtonsContainer>
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => toast.error("Google login failed")}
                />
              </SocialButtonsContainer>

              <SwitchLink>
                Don't have an account? <Link to="/signup">Create one</Link>
              </SwitchLink>
            </Card>
          </FormSection>
        </ContentWrapper>

        <ImageSection />
      </PageContainer>
    </>
  );
};

export default LoginPage;