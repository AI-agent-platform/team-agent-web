import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import EcommerceImg from "../Assets/areas/ecom.jpg";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  overflow-x: hidden;
`;

const Header = styled(motion.header)`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(102, 126, 234, 0.6), rgba(118, 75, 162, 0.6)),
    url(${EcommerceImg});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

const HeaderContent = styled.div`
  text-align: center;
  color: white;
  z-index: 2;
  max-width: 900px;
  padding: 0 2rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #00d4ff, #0099cc, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(0, 212, 255, 0.3);
  letter-spacing: -1px;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.3rem, 4vw, 2rem);
  margin-bottom: 2rem;
  opacity: 0.95;
  line-height: 1.5;
  font-weight: 300;
`;

const BackButton = styled(motion.button)`
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: rgba(0, 212, 255, 0.2);
  border: 2px solid #00d4ff;
  color: #00d4ff;
  padding: 1rem 2rem;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background: #00d4ff;
    color: #000;
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 212, 255, 0.4);
  }
`;

const MainContent = styled.main`
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Section = styled(motion.section)`
  margin-bottom: 8rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(3rem, 6vw, 5rem);
  color: #00d4ff;
  margin-bottom: 4rem;
  text-align: center;
  position: relative;
  font-weight: 800;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 6px;
    background: linear-gradient(45deg, #00d4ff, #667eea);
    border-radius: 3px;
  }
`;

const HexagonalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(0, 212, 255, 0.3);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(20px);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(102, 126, 234, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(0, 212, 255, 0.1), transparent);
    animation: rotate 8s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  &:hover {
    transform: translateY(-15px) rotateX(10deg) rotateY(10deg);
    border-color: #00d4ff;
    box-shadow: 0 25px 50px rgba(0, 212, 255, 0.3);

    &::before {
      opacity: 1;
    }

    &::after {
      opacity: 1;
    }
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #00d4ff, #667eea);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
  position: relative;
  z-index: 1;
  transform: translateZ(20px);
`;

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  color: #00d4ff;
  margin-bottom: 1.5rem;
  font-weight: 700;
  position: relative;
  z-index: 1;
  transform: translateZ(15px);
`;

const FeatureDescription = styled.p`
  color: #f0f0f0;
  line-height: 1.7;
  font-size: 1.1rem;
  font-weight: 300;
  position: relative;
  z-index: 1;
  transform: translateZ(10px);
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  border: 2px solid rgba(0, 212, 255, 0.2);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(15px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(45deg, #00d4ff, #667eea);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(45deg, #667eea, #00d4ff);
  }
`;

const StatNumber = styled.div`
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(45deg, #00d4ff, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
`;

const StatLabel = styled.div`
  color: #f0f0f0;
  font-size: 1.2rem;
  font-weight: 500;
`;

const ProcessContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const ProcessCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  border: 2px solid rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(15px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(0, 212, 255, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const StepNumber = styled.div`
  width: 90px;
  height: 90px;
  background: linear-gradient(45deg, #667eea, #00d4ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  margin: 0 auto 2rem;
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
  position: relative;
  z-index: 1;
`;

const StepTitle = styled.h3`
  color: #667eea;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  position: relative;
  z-index: 1;
`;

const StepDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  font-size: 1rem;
  font-weight: 300;
  position: relative;
  z-index: 1;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(45deg, #00d4ff, #667eea);
  border: none;
  color: white;
  padding: 1.5rem 3rem;
  border-radius: 50px;
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  margin: 3rem auto;
  display: block;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 212, 255, 0.5);
  }
`;

const FloatingWaves = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Wave = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #00d4ff, #667eea);
  border-radius: 50%;
  opacity: 0.1;
`;

const EcommercePage = () => {
  const navigate = useNavigate();
  const [waves] = useState(Array.from({ length: 20 }, (_, i) => i));

  const features = [
    {
      icon: "🛒",
      title: "Smart Shopping Cart",
      description: "AI-powered cart optimization with intelligent product recommendations and dynamic pricing strategies."
    },
    {
      icon: "🎯",
      title: "Personalized Recommendations",
      description: "Advanced algorithms analyze user behavior to suggest products that match individual preferences and needs."
    },
    {
      icon: "📊",
      title: "Inventory Management",
      description: "Predictive analytics optimize stock levels, reduce waste, and ensure products are always available."
    },
    {
      icon: "💬",
      title: "AI Customer Support",
      description: "24/7 intelligent chatbots provide instant support, answer questions, and resolve issues efficiently."
    },
    {
      icon: "🔍",
      title: "Smart Search & Discovery",
      description: "Natural language search and visual product recognition help customers find exactly what they need."
    },
    {
      icon: "📈",
      title: "Sales Optimization",
      description: "AI-driven pricing strategies, promotions, and marketing campaigns maximize conversion rates and revenue."
    }
  ];

  const stats = [
    { number: "35%", label: "Conversion Increase" },
    { number: "60%", label: "Customer Retention" },
    { number: "24/7", label: "Availability" },
    { number: "3x", label: "Revenue Growth" }
  ];

  const processSteps = [
    {
      title: "Customer Journey Analysis",
      description: "AI tracks and analyzes customer behavior across all touchpoints to understand preferences and pain points."
    },
    {
      title: "Personalized Experience",
      description: "Dynamic content, recommendations, and pricing are tailored to each customer's unique profile and behavior."
    },
    {
      title: "Intelligent Operations",
      description: "Automated inventory management, order processing, and customer support ensure seamless operations."
    },
    {
      title: "Continuous Optimization",
      description: "AI continuously learns and improves based on real-time data to enhance customer experience and business performance."
    }
  ];

  return (
    <PageContainer>
      <FloatingWaves>
        {waves.map((i) => (
          <Wave
            key={i}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            initial={{ 
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              opacity: [0, 0.1, 0],
              scale: [0, 1, 0],
            }}
            transition={{ 
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </FloatingWaves>

      <BackButton
        onClick={() => navigate('/landing#area')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Back to Areas
      </BackButton>

      <Header>
        <HeaderContent>
          <Title
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            E-commerce
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            Revolutionizing online retail with cutting-edge AI solutions for personalized shopping,
            intelligent inventory management, and enhanced customer experiences
          </Subtitle>
        </HeaderContent>
      </Header>

      <MainContent>
        <Section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle>AI Solutions for E-commerce</SectionTitle>
          <HexagonalGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </HexagonalGrid>
        </Section>

        <Section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Impact Metrics</SectionTitle>
          <StatsContainer>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsContainer>
        </Section>

        <Section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle>How It Works</SectionTitle>
          <ProcessContainer>
            {processSteps.map((step, index) => (
              <ProcessCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <StepNumber>{index + 1}</StepNumber>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </ProcessCard>
            ))}
          </ProcessContainer>
        </Section>

        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/landing#contact')}
        >
          Get Started with E-commerce AI
        </CTAButton>
      </MainContent>
    </PageContainer>
  );
};

export default EcommercePage;
