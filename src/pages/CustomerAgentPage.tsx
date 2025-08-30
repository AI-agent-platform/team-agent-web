import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CustomerAgentImg from "../Assets/what-we-offer/customer-agent.jpg";

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
    url(${CustomerAgentImg});
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

const CustomerAgentPage = () => {
  const navigate = useNavigate();
  const [particles] = useState(Array.from({ length: 20 }, (_, i) => i));

  const features = [
    {
      icon: "💬",
      title: "24/7 Customer Support",
      description: "Round-the-clock intelligent customer service with instant responses and personalized assistance."
    },
    {
      icon: "🎯",
      title: "Personalized Recommendations",
      description: "AI-powered product and service recommendations based on customer preferences and behavior."
    },
    {
      icon: "⚡",
      title: "Real-time Interaction",
      description: "Instant responses and dynamic conversations that adapt to customer needs and context."
    },
    {
      icon: "📱",
      title: "Multi-channel Support",
      description: "Seamless support across web, mobile, social media, and messaging platforms."
    },
    {
      icon: "🔍",
      title: "Smart Problem Resolution",
      description: "Intelligent troubleshooting and issue resolution with step-by-step guidance."
    },
    {
      icon: "📊",
      title: "Customer Analytics",
      description: "Deep insights into customer behavior, satisfaction, and engagement patterns."
    }
  ];

  const stats = [
    { number: "24/7", label: "Availability" },
    { number: "<30s", label: "Response Time" },
    { number: "95%", label: "Satisfaction" },
    { number: "10x", label: "Efficiency" }
  ];

  const processSteps = [
    {
      title: "Customer Inquiry",
      description: "Customers reach out through any channel and are instantly greeted by our intelligent AI agent."
    },
    {
      title: "Smart Analysis",
      description: "AI analyzes the inquiry context, customer history, and intent to provide the best response."
    },
    {
      title: "Personalized Response",
      description: "Tailored solutions and recommendations are delivered based on individual customer needs."
    },
    {
      title: "Continuous Learning",
      description: "AI continuously learns from interactions to improve future customer experiences."
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
            Customer Agent
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Your intelligent customer service partner that provides support, recommendations, 
            and real-time interaction to enhance customer satisfaction
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
          Get Started with Customer Agent
        </CTAButton>
      </MainContent>
    </PageContainer>
  );
};

export default CustomerAgentPage;
