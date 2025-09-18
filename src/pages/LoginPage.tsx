import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
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

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMsg(null);

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
    <PageBackground>
      <Card>
        <Title>Login</Title>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
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
          <Button type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div style={{ margin: "20px 0" }}>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error("Google login failed")}
          />
        </div>

        <SwitchLink>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </SwitchLink>
      </Card>
    </PageBackground>
  );
};

export default LoginPage;
