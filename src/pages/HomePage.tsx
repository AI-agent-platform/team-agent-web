import React from 'react';
import styled from 'styled-components';

const Hero = styled.section`
  background: linear-gradient(90deg, #0f2027 0%, #2c5364 100%);
  color: #fff;
  padding: 80px 20px 60px 20px;
  text-align: center;
`;

const Headline = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 18px;
`;

const Subheadline = styled.p`
  font-size: 1.3rem;
  margin-bottom: 32px;
  color: #e0e0e0;
`;

const CTAButton = styled.button`
  background: #00c6ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 16px 36px;
  font-size: 1.15rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s;
  &:hover {
    background: #0072ff;
  }
`;

const Features = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  margin: 60px 0 40px 0;
`;

const FeatureCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(44,83,100,0.07);
  padding: 32px 24px;
  max-width: 320px;
  min-width: 260px;
  text-align: left;
  flex: 1 1 260px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #2c5364;
`;

const FeatureDesc = styled.p`
  color: #444;
  font-size: 1rem;
`;

const HowItWorks = styled.section`
  background: #f7fafd;
  padding: 48px 20px;
  text-align: center;
`;

const Steps = styled.ol`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  list-style: none;
  padding: 0;
  margin: 32px 0 0 0;
`;

const Step = styled.li`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(44,83,100,0.06);
  padding: 24px 18px;
  max-width: 220px;
  min-width: 180px;
  font-size: 1rem;
`;

const HomePage: React.FC = () => {
  return (
    <>
      <Hero>
        <Headline>Build Your Own AI Agent in Minutes</Headline>
        <Subheadline>
          Empower your business with custom AI agents—no coding required. Design, deploy, and manage intelligent agents tailored to your needs.
        </Subheadline>
        <CTAButton onClick={() => window.location.href = '/signup'}>
          Create Your AI Agent
        </CTAButton>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureTitle>Easy Agent Builder</FeatureTitle>
          <FeatureDesc>
            Intuitive drag-and-drop interface lets you design AI agents for customer support, sales, and more—no technical skills needed.
          </FeatureDesc>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>Industry Integrations</FeatureTitle>
          <FeatureDesc>
            Seamlessly connect your agent to your website, CRM, or messaging platforms. Integrate with tools you already use.
          </FeatureDesc>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>Secure & Scalable</FeatureTitle>
          <FeatureDesc>
            Enterprise-grade security, analytics, and scalability. Your data and conversations are always protected.
          </FeatureDesc>
        </FeatureCard>
      </Features>

      <HowItWorks>
        <h2>How It Works</h2>
        <Steps>
          <Step>
            <b>1. Sign Up</b>
            <br />Create your free account and access the agent builder.
          </Step>
          <Step>
            <b>2. Design Agent</b>
            <br />Choose templates or customize workflows for your business.
          </Step>
          <Step>
            <b>3. Deploy & Monitor</b>
            <br />Launch your agent and track performance with real-time analytics.
          </Step>
        </Steps>
      </HowItWorks>
    </>
  );
};

export default HomePage; 