import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "../hooks/useAuth";
import { validatePassword } from "../utils/auth/auth.utils";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const PageBackground = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 40px 45px;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  width: 420px;
  max-width: 100%;
  position: relative;
  overflow: hidden;
`;

const DecorativeCircle = styled.div<{ top?: string; left?: string; right?: string; bottom?: string }>`
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: #5EDCD2;
  z-index: 0;
  ${({ top }) => top && `top: ${top};`}
  ${({ left }) => left && `left: ${left};`}
  ${({ right }) => right && `right: ${right};`}
  ${({ bottom }) => bottom && `bottom: ${bottom};`}
`;

const DecorativeAccent = styled.div<{ top?: string; left?: string; right?: string; bottom?: string }>`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #2C2C2C;
  z-index: 0;
  ${({ top }) => top && `top: ${top};`}
  ${({ left }) => left && `left: ${left};`}
  ${({ right }) => right && `right: ${right};`}
  ${({ bottom }) => bottom && `bottom: ${bottom};`}
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
`;

const Title = styled.h1`
  margin: 0 0 35px 0;
  color: #1a1a1a;
  font-weight: 600;
  font-size: 2.2rem;
  letter-spacing: -0.5px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  color: #272525ff;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 0;
  border: none;
  border-bottom: 2px solid #E0E0E0;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  background: transparent;
  box-sizing: border-box;
  color: #1a1a1a;
  font-weight: 500;

  &:focus {
    outline: none;
    border-bottom-color: #5EDCD2;
  }

  &::placeholder {
    color: #B0B0B0;
  }
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  width: 70px;
  height: 70px;
  margin-top: 30px;
  border: none;
  border-radius: 50%;
  background: #2C2C2C;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: ${({ disabled }) => (disabled ? 'none' : 'scale(1.05)')};
    box-shadow: ${({ disabled }) => (disabled ? '0 4px 15px rgba(0, 0, 0, 0.2)' : '0 6px 20px rgba(0, 0, 0, 0.3)')};
  }

  &:active {
    transform: ${({ disabled }) => (disabled ? 'none' : 'scale(0.98)')};
  }

  svg {
    width: 28px;
    height: 28px;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0;
  color: #707070;
  font-size: 0.85rem;
  font-weight: 500;
  position: relative;
  z-index: 10;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #E0E0E0;
  }

  &::before {
    margin-right: 16px;
  }

  &::after {
    margin-left: 16px;
  }
`;

const GoogleButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 10;
  
  & > div {
    width: 100% !important;
  }
  
  & button {
    width: 100% !important;
    justify-content: center !important;
  }
`;

const SwitchLink = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 0.95rem;
  color: #606060;
  position: relative;
  z-index: 10;
  
  a {
    color: #2C2C2C;
    text-decoration: none;
    font-weight: 600;
    margin-left: 4px;
    transition: color 0.2s;
    
    &:hover {
      color: #1c837aff;
      text-decoration: underline;
    }
  }
`;

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const { mutate, isPending, isError, error, isSuccess } = useSignUp();
  const { googleLogin } = useAuth();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account created! Please log in.");
      navigate("/login");
    }
  }, [isSuccess, navigate]);

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

  return (
    <>
      <Navbar />
      <PageBackground>
        <Card>
          <Title>Sign Up</Title>
          {/* {(localError || isError) && (
          <ErrorMsg>
            {localError ||
              (error as any)?.response?.data?.message ||
              "Sign up failed"}
          </ErrorMsg>
        )} */}
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <div style={{ margin: "20px 0" }}>
            <GoogleLogin
              onSuccess={handleGoogleSignUp}
              onError={() => toast.error("Google signup failed")}
            />
          </div>

          <SwitchLink>
            Already have an account? <Link to="/login">Login</Link>
          </SwitchLink>
        </Card>
      </PageBackground>
    </>
  );
};

export default SignUpPage;