import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import OwnerAgentImg from "../Assets/what-we-offer/owner-agent.jpg";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  overflow-x: hidden;
`;

const Header = styled(motion.header)`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${OwnerAgentImg});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

const HeaderContent = styled.div`
  text-align: center;
  color: white;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #0fcb8c, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(15, 203, 140, 0.5);
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const BackButton = styled(motion.button)`
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: rgba(15, 203, 140, 0.2);
  border: 2px solid #0fcb8c;
  color: #0fcb8c;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background: #0fcb8c;
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(15, 203, 140, 0.3);
  }
`;

const MainContent = styled.main`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled(motion.section)`
  margin-bottom: 6rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: #0fcb8c;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(45deg, #0fcb8c, #00d4ff);
    border-radius: 2px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(15, 203, 140, 0.2);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(15, 203, 140, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: #0fcb8c;
    box-shadow: 0 20px 40px rgba(15, 203, 140, 0.2);

    &::before {
      left: 100%;
    }
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #0fcb8c, #00d4ff);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #0fcb8c;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  font-size: 1rem;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(15, 203, 140, 0.1);
  border-radius: 15px;
  border: 1px solid rgba(15, 203, 140, 0.3);
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #0fcb8c;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #ccc;
  font-size: 1.1rem;
`;

const ProcessSection = styled.div`
  margin-top: 4rem;
`;

const ProcessStep = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  border-left: 4px solid #0fcb8c;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #0fcb8c, #00d4ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin-right: 2rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  color: #0fcb8c;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(45deg, #0fcb8c, #00d4ff);
  border: none;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin: 2rem auto;
  display: block;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(15, 203, 140, 0.4);
  }
`;

const FloatingParticles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #0fcb8c;
  border-radius: 50%;
`;

const OwnerAgentPage = () => {
  const navigate = useNavigate();
  const [particles] = useState(Array.from({ length: 20 }, (_, i) => i));

  const features = [
    {
      icon: "📊",
      title: "Business Analytics",
      description: "Real-time insights into business performance, revenue trends, and operational metrics with AI-powered analysis."
    },
    {
      icon: "🤖",
      title: "Automated Updates",
      description: "Intelligent automation of routine business tasks, inventory management, and customer communication."
    },
    {
      icon: "📈",
      title: "Performance Monitoring",
      description: "Continuous monitoring of business KPIs with predictive analytics and actionable recommendations."
    },
    {
      icon: "💬",
      title: "Owner Communication",
      description: "Seamless communication channel between AI agent and business owner with instant notifications."
    },
    {
      icon: "🔧",
      title: "System Management",
      description: "Automated system maintenance, updates, and optimization to ensure peak performance."
    },
    {
      icon: "📱",
      title: "Mobile Integration",
      description: "Full mobile accessibility allowing owners to monitor and control their business from anywhere."
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Monitoring" },
    { number: "50%", label: "Time Saved" },
    { number: "100%", label: "Automated" }
  ];

  const processSteps = [
    {
      title: "Initial Setup",
      description: "Configure your business parameters, goals, and preferences for personalized AI assistance."
    },
    {
      title: "Data Integration",
      description: "Connect your existing systems and data sources for comprehensive business intelligence."
    },
    {
      title: "AI Training",
      description: "Our AI learns your business patterns and optimizes operations for maximum efficiency."
    },
    {
      title: "Continuous Optimization",
      description: "Ongoing improvements and updates based on real-time performance data and market trends."
    }
  ];

  return (
    <PageContainer>
      <FloatingParticles>
        {particles.map((i) => (
          <Particle
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </FloatingParticles>

      <BackButton
        onClick={() => navigate('/landing#what-we-offer')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back to Home
      </BackButton>

      <Header>
        <HeaderContent>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Owner Agent
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Your intelligent business partner that handles communication, updates, and optimization
            to keep your business running at peak efficiency
          </Subtitle>
        </HeaderContent>
      </Header>

      <MainContent>
        <Section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Key Features</SectionTitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Section>

        <Section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Performance Metrics</SectionTitle>
          <StatsSection>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsSection>
        </Section>

        <Section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>How It Works</SectionTitle>
          <ProcessSection>
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <StepNumber>{index + 1}</StepNumber>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepContent>
              </ProcessStep>
            ))}
          </ProcessSection>
        </Section>

        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/landing#what-we-offer')}
        >
          Get Started with Owner Agent
        </CTAButton>
      </MainContent>
    </PageContainer>
  );
};

export default OwnerAgentPage;
