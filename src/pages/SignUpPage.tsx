import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "../hooks/useAuth";
import { validatePassword } from "../utils/auth/auth.utils";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import loginImage from "../Assets/authentication/login.webp";

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
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
  background: rgba(255, 255, 255, 0.08);
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

const PasswordStrengthContainer = styled.div`
  margin-top: 10px;
`;

const StrengthBars = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
`;

const StrengthBar = styled.div<{ active: boolean; color: string }>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: ${(props) => (props.active ? props.color : "rgba(148, 163, 184, 0.2)")};
  transition: all 0.3s ease;
`;

const StrengthText = styled.p`
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  span {
    color: #60a5fa;
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  animation: shake 0.3s ease-in-out;

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }
`;

const SuccessMessage = styled.p`
  color: #10b981;
  font-size: 0.85rem;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Button = styled.button<{ disabled?: boolean; loading?: boolean }>`
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

const SocialButton = styled.button`
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  background: rgba(255, 255, 255, 0.05);
  color: #cbd5e1;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  backdrop-filter: blur(8px);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(148, 163, 184, 0.5);
    transform: translateY(-2px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
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

const TermsText = styled.p`
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 20px;
  line-height: 1.5;

  a {
    color: #60a5fa;
    text-decoration: none;
    transition: color 0.3s;

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

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validation, setValidation] = useState({
    emailValid: false,
    passwordsMatch: false,
  });

  const navigate = useNavigate();
  const { mutate, isPending, isError, error, isSuccess } = useSignUp();
  const { googleLogin } = useAuth();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account created! Please log in.");
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) strength++;
    if (pwd.match(/[0-9]/)) strength++;
    if (pwd.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(calculatePasswordStrength(pwd));
    setValidation((prev) => ({
      ...prev,
      passwordsMatch: pwd === confirmPassword,
    }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setConfirmPassword(pwd);
    setValidation((prev) => ({
      ...prev,
      passwordsMatch: password === pwd,
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const em = e.target.value;
    setEmail(em);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidation((prev) => ({
      ...prev,
      emailValid: emailRegex.test(em),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");

    const passwordError = validatePassword(password);
    if (passwordError) {
      setLocalError(passwordError);
      toast.error(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    if (!validation.emailValid) {
      setLocalError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    mutate(
      { email, password },
      {
        onSuccess: () => {
          toast.success("Account created! Please log in.");
          navigate("/login");
        },
        onError: (err: any) => {
          const errorMessage =
            err?.response?.data?.message || err?.message || "Sign up failed";
          setLocalError(errorMessage);
          toast.error(errorMessage);
        },
      }
    );
  };

  const handleGoogleSignUp = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) return;
    try {
      await googleLogin(credentialResponse.credential);
      toast.success("Signed up successfully!");
      navigate("/landing");
    } catch (err) {
      toast.error("Sign up failed. Please try again.");
      console.error(err);
    }
  };

  const getStrengthColor = (strength: number) => {
    const colors = ["#ef4444", "#f97316", "#eab308", "#10b981"];
    return colors[strength - 1] || "#ef4444";
  };

  const getStrengthLabel = (strength: number) => {
    const labels = ["Weak", "Fair", "Good", "Strong"];
    return labels[strength - 1] || "Weak";
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <ContentWrapper>
          <FormSection>
            <Card>
              <Title>Create Account</Title>
              <Subtitle>Join thousands of users worldwide</Subtitle>

              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <FormGroup>
                  <Label>Email Address</Label>
                  <InputWrapper>
                    <IconContainer>📧</IconContainer>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={handleEmailChange}
                      hasError={email.length > 0 && !validation.emailValid}
                      isValid={validation.emailValid}
                      required
                    />
                  </InputWrapper>
                  {email.length > 0 && !validation.emailValid && (
                    <ErrorMessage>✕ Please enter a valid email address</ErrorMessage>
                  )}
                  {validation.emailValid && (
                    <SuccessMessage>✓ Email looks good</SuccessMessage>
                  )}
                </FormGroup>

                {/* Password Field */}
                <FormGroup>
                  <Label>Password</Label>
                  <InputWrapper>
                    <IconContainer>🔐</IconContainer>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter a strong password"
                      value={password}
                      onChange={handlePasswordChange}
                      hasError={false}
                      isValid={passwordStrength >= 2 && password.length > 0}
                      required
                    />
                  </InputWrapper>

                  {password.length > 0 && (
                    <PasswordStrengthContainer>
                      <StrengthBars>
                        {[1, 2, 3, 4].map((i) => (
                          <StrengthBar
                            key={i}
                            active={i <= passwordStrength}
                            color={getStrengthColor(passwordStrength)}
                          />
                        ))}
                      </StrengthBars>
                      <StrengthText>
                        Strength: <span>{getStrengthLabel(passwordStrength)}</span>
                      </StrengthText>
                    </PasswordStrengthContainer>
                  )}
                </FormGroup>

                {/* Confirm Password Field */}
                <FormGroup>
                  <Label>Confirm Password</Label>
                  <InputWrapper>
                    <IconContainer>🔐</IconContainer>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      hasError={
                        confirmPassword.length > 0 && !validation.passwordsMatch
                      }
                      isValid={
                        validation.passwordsMatch && confirmPassword.length > 0
                      }
                      required
                    />
                  </InputWrapper>
                  {confirmPassword.length > 0 && !validation.passwordsMatch && (
                    <ErrorMessage>✕ Passwords do not match</ErrorMessage>
                  )}
                  {validation.passwordsMatch && confirmPassword.length > 0 && (
                    <SuccessMessage>✓ Passwords match</SuccessMessage>
                  )}
                </FormGroup>

                {localError && (
                  <ErrorMessage style={{ marginBottom: "16px" }}>
                    ⚠ {localError}
                  </ErrorMessage>
                )}

                <Button type="submit" disabled={isPending} loading={isPending}>
                  {isPending ? (
                    <>
                      <LoaderSpinner />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <Divider>
                <DividerText>OR CONTINUE WITH</DividerText>
              </Divider>

              <SocialButtonsContainer>
                <GoogleLogin
                  onSuccess={handleGoogleSignUp}
                  onError={() => toast.error("Google signup failed")}
                />
              </SocialButtonsContainer>

              <SwitchLink>
                Already have an account? <Link to="/login">Sign in</Link>
              </SwitchLink>              
            </Card>
          </FormSection>
        </ContentWrapper>

        <ImageSection />
      </PageContainer>
    </>
  );
};

export default SignUpPage;