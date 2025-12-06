import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
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
`;

const Title = styled.h2`
  margin-bottom: 8px;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.6rem;
  background: linear-gradient(135deg, #60a5fa 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: #94a3b8;
  font-size: 0.95rem;
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

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid rgba(148, 163, 184, 0.3);
  background: rgba(255, 255, 255, 0.08);
  font-size: 1rem;
  color: #ffffff;
  transition: all 0.3s;
  backdrop-filter: blur(8px);

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
  }
`;

const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 14px 20px;
  margin-top: 18px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
`;

const Message = styled.div`
  margin-top: 14px;
  color: #9eaec6;
  font-size: 0.95rem;
`;

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_NEST_API}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Request failed");
      }

      toast.success("Reset email sent. Check your inbox.");
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to send reset email");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Navbar />
      <PageContainer>
        <ContentWrapper>
          <FormSection>
            <Card>
            <Title>Reset Your Password</Title>
            <Subtitle>Enter the email associated with your account</Subtitle>

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>

              <Button type="submit" disabled={isPending}>
                {isPending ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
           
            </Card>
          </FormSection>
        </ContentWrapper>

        <ImageSection />
      </PageContainer>
    </>
  );
};

export default ForgotPassword;
