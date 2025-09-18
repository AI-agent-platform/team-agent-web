import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "../hooks/useAuth";
import { validatePassword } from "../utils/auth/auth.utils";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const PageBackground = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #163c3d;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  width: 400px;
  max-width: 90%;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 25px;
  color: #2c5364;
  font-weight: 700;
  font-size: 1.8rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin: 10px 0;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #0072ff;
    box-shadow: 0 0 8px rgba(0, 114, 255, 0.3);
  }
`;

const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 20px rgba(0, 114, 255, 0.3);
  }
`;

const SwitchLink = styled.div`
  margin-top: 18px;
  font-size: 0.95rem;
  color: #2c5364;
  a {
    color: #00c6ff;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;
    &:hover {
      color: #0072ff;
      text-decoration: underline;
    }
  }
`;

const ErrorMsg = styled.div`
  color: #fff;
  background: #d32f2f;
  border-radius: 6px;
  padding: 10px 0;
  text-align: center;
  margin-bottom: 12px;
  font-size: 0.95rem;
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

    mutate({ email, password });
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
  );
};

export default SignUpPage;
