import React, { useState, useEffect } from "react";
import AuthForm, { PageBackground, StyledInput } from "../components/AuthForm";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { useAuth } from "../context/AuthContext";

const SwitchLink = styled.div`
  margin-top: 18px;
  text-align: center;
  font-size: 1rem;
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
  margin-bottom: 8px;
  font-size: 1rem;
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMsg(null);

    login(
      { email, password },
      () => {
        setIsPending(false);
        navigate("/home"); 
      },
      (err) => {
        setIsPending(false);
        setErrorMsg(err?.response?.data?.message || "Login failed");
      }
    );
  }

  return (
    <PageBackground>
      <div>
        <AuthForm
          title="Login"
          onSubmit={handleSubmit}
          buttonText={isPending ? "Logging in..." : "Login"}
        >
          {errorMsg && (
            <ErrorMsg>
              {errorMsg}
            </ErrorMsg>
          )}
          <StyledInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </AuthForm>
        <SwitchLink>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </SwitchLink>
      </div>
    </PageBackground>
  );
};

export default LoginPage;