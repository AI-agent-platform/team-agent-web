import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  width: 100%;
  /* dark green metallic gradient */
  background: linear-gradient(180deg, #04260f 0%, #063a1f 45%, #0b5d2f 100%);
  color: #e6f7ef; /* light text for contrast on dark green */
  padding: 64px 20px 48px; /* increased vertical padding to raise footer height */
  box-sizing: border-box;
  @media (max-width: 600px) {
    padding: 20px 12px 12px; /* smaller footprint on mobile */
    display: none; /* hide footer entirely on small/mobile screens */
  }
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 40px; /* more horizontal breathing room */
  align-items: center; /* vertically center columns so inputs and taglines align */
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 180px; /* ensure taller footer area */

  @media (max-width: 1024px) {
    gap: 28px;
  }
  @media (max-width: 720px) {
    gap: 16px;
    min-height: auto;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
    min-height: 0; /* remove enforced height on very small screens */
  }
`;

const Left = styled.div`
  flex: 1 1 360px;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 600px) {
    align-items: center;
    min-width: 0;
  }
`;

const Center = styled.div`
  flex: 0 1 320px;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 600px) {
    min-width: 0;
    width: 100%;
    align-items: center;
  }
`;

const Right = styled.div`
  flex: 0 1 300px;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: flex-end;
  @media (max-width: 600px) {
    align-items: center;
    width: 100%;
  }
`;

const EmailForm = styled.form`
  display: flex;
  gap: 8px;
  align-items: center;
  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;

const EmailInput = styled.input`
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.02);
  color: inherit;
  font-size: 0.95rem;
  min-width: 220px;
  outline: none;
  ::placeholder { color: rgba(255,255,255,0.7); }
  @media (max-width: 600px) {
    min-width: 0;
    flex: 1 1 auto;
    width: 100%;
  }
`;

const SendButton = styled.button`
  padding: 10px 14px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(90deg,#10b981,#047857);
  color: white;
  font-weight: 700;
  cursor: pointer;
`;

const Logo = styled.div`
  font-weight: 800;
  font-size: 1.05rem;
  color: #f0fff4;
  margin-bottom: 8px;
`;

const Tagline = styled.p`
  margin: 0 0 12px 0;
  color: rgba(230,247,239,0.95);
  font-size: 1rem;
  line-height: 1.5;
  @media (max-width: 600px) {
    display: none; /* hide long tagline on small screens */
  }
`;

const ColumnTitle = styled.h4`
  color: #a8c0d6;
  margin: 0 0 12px 0;
  font-size: 0.98rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(230,247,239,0.98);
  font-size: 0.95rem;
  @media (max-width: 600px) {
    font-size: 0.9rem;
    gap: 6px;
    justify-content: center;
  }
`;

/* copy buttons removed per request; contact details are static text */

const CTAButton = styled.button`
  background: linear-gradient(90deg,#10b981,#047857); /* green accent */
  color: #ffffff;
  border: none;
  padding: 12px 18px; /* larger button */
  border-radius: 10px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 10px 26px rgba(3,82,50,0.18);
  @media (max-width: 600px) {
    width: 100%;
    padding: 10px 12px;
    border-radius: 6px;
  }
`;

const Small = styled.div`
  color: rgba(230,247,239,0.9);
  font-size: 0.85rem;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 18px auto 0; /* reduced separation for compact mobile */
  padding-top: 12px;
  border-top: 1px solid rgba(255,255,255,0.03);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  @media (max-width: 600px) {
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  @media (max-width: 480px) {
    margin: 12px auto 0;
    padding-top: 8px;
  }
`;

const Legal = styled.div`
  color: rgba(230,247,239,0.9);
  font-size: 0.9rem;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 8px;
  @media (max-width: 600px) {
    display: none; /* hide socials on very small screens */
  }
`;

const IconBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255,255,255,0.06);
  border: none;
  color: #e6fff0;
  cursor: pointer;
`;

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const validateEmail = (e: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  };

  const handleSend = async (ev?: React.FormEvent) => {
    if (ev) ev.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      setSending(true);
      // Placeholder: here you would POST to your backend endpoint
      // await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
      await new Promise((r) => setTimeout(r, 700)); // simulate network
      toast.success("Thanks — we'll be in touch soon.");
      setEmail("");
    } catch (err) {
      toast.error("Unable to send. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <FooterWrapper>
      <Inner>
        <Left>
          <Logo>Agent AI</Logo>
          <Tagline>
            Enterprise conversational AI — reliable, secure, and built for
            scale. Designed for operations that require uptime, privacy, and
            predictable integrations.
          </Tagline>
          <Small>Support hours: Mon–Fri 9:00–18:00 (local)</Small>
        </Left>

        <Center>
          <ColumnTitle>Contact</ColumnTitle>
          <ContactItem>
            <div style={{ minWidth: 48, color: 'rgba(230,247,239,0.8)' }}>Phone</div>
            <div style={{ flex: 1 }}>+94 76 707 2322</div>
          </ContactItem>

          <ContactItem style={{ marginTop: 8 }}>
            <div style={{ minWidth: 48, color: 'rgba(230,247,239,0.8)' }}>Email</div>
            <div style={{ flex: 1 }}>webservicespkd@gmail.com</div>
          </ContactItem>
           <ContactItem style={{ marginTop: 8 }}>
            <div style={{ minWidth: 48, color: 'rgba(230,247,239,0.8)' }}>Twitter</div>
            <div style={{ flex: 1 }}>webservicespkd</div>
          </ContactItem>
        </Center>

        <Right>
          <EmailForm onSubmit={handleSend} aria-label="Subscribe">
            <EmailInput
              aria-label="Work email"
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <SendButton type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send'}</SendButton>
          </EmailForm>

          <Small style={{marginLeft:14}}>
            Enterprise-grade security & compliance. Data residency options
            available on request.
          </Small>
        </Right>
      </Inner>

      <FooterBottom>
        <Legal>© {new Date().getFullYear()} Agent AI — All rights reserved.</Legal>
        
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
