import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AgricultureImg from "../Assets/areas/aggriculture.jpg";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  overflow-x: hidden;
`;

const Header = styled(motion.header)`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${AgricultureImg});
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
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(255, 107, 107, 0.3);
  letter-spacing: -2px;
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
  background: rgba(255, 107, 107, 0.2);
  border: 2px solid #ff6b6b;
  color: #ff6b6b;
  padding: 1rem 2rem;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background: #ff6b6b;
    color: #000;
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(255, 107, 107, 0.4);
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
  color: #4ecdc4;
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
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    border-radius: 3px;
  }
`;

const HorizontalScrollContainer = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 2rem 0;
  scroll-snap-type: x mandatory;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    border-radius: 4px;
  }
`;

const FeatureCard = styled(motion.div)`
  min-width: 400px;
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid rgba(78, 205, 196, 0.3);
  border-radius: 25px;
  padding: 3rem 2rem;
  backdrop-filter: blur(20px);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  scroll-snap-align: start;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  }

  &:hover {
    transform: translateY(-15px) scale(1.02);
    border-color: #4ecdc4;
    box-shadow: 0 25px 50px rgba(78, 205, 196, 0.3);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: white;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
`;

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  color: #4ecdc4;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const FeatureDescription = styled.p`
  color: #e0e0e0;
  line-height: 1.7;
  font-size: 1.1rem;
  font-weight: 300;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin: 4rem 0;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(78, 205, 196, 0.1));
  border-radius: 20px;
  border: 2px solid rgba(255, 107, 107, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(255, 107, 107, 0.1), transparent);
    animation: rotate 4s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const StatNumber = styled.div`
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const StatLabel = styled.div`
  color: #e0e0e0;
  font-size: 1.3rem;
  font-weight: 500;
  position: relative;
  z-index: 1;
`;

const ProcessContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const ProcessCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  border: 2px solid rgba(69, 183, 209, 0.3);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(45deg, #45b7d1, #4ecdc4);
  }
`;

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #45b7d1, #4ecdc4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 900;
  color: white;
  margin: 0 auto 2rem;
  box-shadow: 0 15px 35px rgba(69, 183, 209, 0.4);
`;

const StepTitle = styled.h3`
  color: #45b7d1;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const StepDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
  font-size: 1rem;
  font-weight: 300;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
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
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(255, 107, 107, 0.5);
  }
`;

const FloatingElements = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 50%;
`;

const AgriculturePage = () => {
  const navigate = useNavigate();
  const [elements] = useState(Array.from({ length: 25 }, (_, i) => i));

  const features = [
    {
      icon: "🌱",
      title: "Smart Crop Monitoring",
      description: "Advanced AI sensors and drones monitor crop health, detect diseases early, and optimize growth patterns for maximum yield."
    },
    {
      icon: "💧",
      title: "Intelligent Irrigation",
      description: "AI-powered irrigation systems that automatically adjust water usage based on soil moisture, weather forecasts, and crop requirements."
    },
    {
      icon: "📊",
      title: "Predictive Analytics",
      description: "Machine learning algorithms predict crop yields, market trends, and optimal planting times using historical and real-time data."
    },
    {
      icon: "🤖",
      title: "Automated Harvesting",
      description: "Robotic systems with computer vision that identify ripe crops and harvest them at the perfect time for maximum quality."
    },
    {
      icon: "🌡️",
      title: "Climate Control",
      description: "Smart greenhouse systems that automatically regulate temperature, humidity, and lighting for optimal plant growth conditions."
    },
    {
      icon: "📱",
      title: "Mobile Farm Management",
      description: "Comprehensive mobile apps that provide real-time insights, remote monitoring, and control over all agricultural operations."
    }
  ];

  const stats = [
    { number: "45%", label: "Yield Increase" },
    { number: "70%", label: "Water Savings" },
    { number: "24/7", label: "Monitoring" },
    { number: "95%", label: "Efficiency" }
  ];

  const processSteps = [
    {
      title: "Field Analysis",
      description: "AI analyzes soil conditions, topography, and historical data to create optimal farming strategies and crop selection."
    },
    {
      title: "Smart Implementation",
      description: "Automated systems plant crops at optimal times and locations based on AI recommendations and weather predictions."
    },
    {
      title: "Continuous Monitoring",
      description: "Real-time sensors and drones track crop health, weather conditions, and resource usage throughout the growing season."
    },
    {
      title: "Intelligent Harvesting",
      description: "AI determines the perfect harvest time and coordinates automated harvesting operations for maximum quality and efficiency."
    }
  ];

  return (
    <PageContainer>
      <FloatingElements>
        {elements.map((i) => (
          <FloatingElement
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, -150],
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </FloatingElements>

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
            Agriculture
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            Revolutionizing farming with cutting-edge AI solutions for sustainable agriculture,
            optimized crop yields, and intelligent resource management
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
          <SectionTitle>AI Solutions for Agriculture</SectionTitle>
          <HorizontalScrollContainer>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </HorizontalScrollContainer>
        </Section>

        <Section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Impact Metrics</SectionTitle>
          <StatsGrid>
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
          </StatsGrid>
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
          Get Started with Agriculture AI
        </CTAButton>
      </MainContent>
    </PageContainer>
  );
};

export default AgriculturePage;
