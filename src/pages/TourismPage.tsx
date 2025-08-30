import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TourismImg from "../Assets/areas/tourism.jpg";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #2d1b69 0%, #11998e 50%, #38ef7d 100%);
  overflow-x: hidden;
`;

const Header = styled(motion.header)`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(45, 27, 105, 0.7), rgba(17, 153, 142, 0.7)),
    url(${TourismImg});
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
  background: linear-gradient(45deg, #ff9a56, #ff6b9d, #c44569);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(255, 154, 86, 0.3);
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
  background: rgba(255, 154, 86, 0.2);
  border: 2px solid #ff9a56;
  color: #ff9a56;
  padding: 1rem 2rem;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background: #ff9a56;
    color: #000;
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(255, 154, 86, 0.4);
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
  color: #ff9a56;
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
    background: linear-gradient(45deg, #ff9a56, #ff6b9d);
    border-radius: 3px;
  }
`;

const MasonryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 154, 86, 0.3);
  border-radius: 20px;
  padding: 2.5rem;
  backdrop-filter: blur(20px);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 154, 86, 0.1), rgba(255, 107, 157, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px) rotate(2deg);
    border-color: #ff9a56;
    box-shadow: 0 20px 40px rgba(255, 154, 86, 0.3);

    &::before {
      opacity: 1;
    }
  }

  &:nth-child(even) {
    transform: translateY(20px);
    
    &:hover {
      transform: translateY(10px) rotate(-2deg);
    }
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(45deg, #ff9a56, #ff6b9d);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: white;
  box-shadow: 0 8px 25px rgba(255, 154, 86, 0.4);
  position: relative;
  z-index: 1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.6rem;
  color: #ff9a56;
  margin-bottom: 1rem;
  font-weight: 700;
  position: relative;
  z-index: 1;
`;

const FeatureDescription = styled.p`
  color: #f0f0f0;
  line-height: 1.6;
  font-size: 1rem;
  font-weight: 300;
  position: relative;
  z-index: 1;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 15px;
  border: 2px solid rgba(255, 154, 86, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 154, 86, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(45deg, #ff9a56, #ff6b9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #f0f0f0;
  font-size: 1.1rem;
  font-weight: 500;
`;

const TimelineContainer = styled.div`
  position: relative;
  margin-top: 4rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #ff9a56, #ff6b9d);
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  position: relative;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    @media (max-width: 768px) {
      flex-direction: row;
    }
  }
`;

interface TimelineContentProps {
  side: 'left' | 'right';
}

const TimelineContent = styled.div<TimelineContentProps>`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 154, 86, 0.3);
  border-radius: 15px;
  padding: 2rem;
  width: 45%;
  backdrop-filter: blur(15px);
  position: relative;
  
  @media (max-width: 768px) {
    width: calc(100% - 60px);
    margin-left: 60px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    
    ${props => props.side === 'left' ? `
      right: -20px;
      border-left-color: rgba(255, 154, 86, 0.3);
    ` : `
      left: -20px;
      border-right-color: rgba(255, 154, 86, 0.3);
    `}
    
    transform: translateY(-50%);
    
    @media (max-width: 768px) {
      left: -20px;
      border-right-color: rgba(255, 154, 86, 0.3);
      border-left-color: transparent;
    }
  }
`;

const TimelineDot = styled.div`
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, #ff9a56, #ff6b9d);
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px rgba(255, 154, 86, 0.5);
  
  @media (max-width: 768px) {
    left: 20px;
  }
`;

const TimelineTitle = styled.h3`
  color: #ff9a56;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const TimelineDescription = styled.p`
  color: #f0f0f0;
  line-height: 1.5;
  font-size: 0.95rem;
  font-weight: 300;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff9a56, #ff6b9d);
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
  box-shadow: 0 10px 30px rgba(255, 154, 86, 0.3);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(255, 154, 86, 0.5);
  }
`;

const FloatingShapes = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Shape = styled(motion.div)`
  position: absolute;
  background: linear-gradient(45deg, #ff9a56, #ff6b9d);
  border-radius: 50%;
  opacity: 0.1;
`;

const TourismPage = () => {
  const navigate = useNavigate();
  const [shapes] = useState(Array.from({ length: 15 }, (_, i) => i));

  const features = [
    {
      icon: "🗺️",
      title: "Smart Travel Planning",
      description: "AI-powered travel recommendations based on preferences, budget, and real-time availability for personalized experiences."
    },
    {
      icon: "🏨",
      title: "Intelligent Booking",
      description: "Automated booking systems that find the best deals, handle reservations, and manage travel itineraries seamlessly."
    },
    {
      icon: "🎯",
      title: "Personalized Experiences",
      description: "AI curates unique travel experiences, local recommendations, and activities tailored to individual preferences."
    },
    {
      icon: "📱",
      title: "Virtual Travel Assistant",
      description: "24/7 AI travel companion providing real-time support, translations, and local information during trips."
    },
    {
      icon: "📊",
      title: "Predictive Analytics",
      description: "Advanced analytics predict travel trends, optimize pricing, and improve customer satisfaction and retention."
    },
    {
      icon: "🌍",
      title: "Global Connectivity",
      description: "Seamless integration with global travel systems, local services, and real-time updates across all platforms."
    }
  ];

  const stats = [
    { number: "85%", label: "Satisfaction Rate" },
    { number: "50%", label: "Cost Reduction" },
    { number: "24/7", label: "Support" },
    { number: "3x", label: "Efficiency" }
  ];

  const timelineSteps = [
    {
      title: "Travel Discovery",
      description: "AI analyzes user preferences, past travel history, and current trends to suggest optimal destinations and experiences."
    },
    {
      title: "Smart Booking",
      description: "Automated systems find the best prices, handle complex itineraries, and manage all travel arrangements."
    },
    {
      title: "Personalized Journey",
      description: "AI provides real-time recommendations, local insights, and personalized experiences throughout the trip."
    },
    {
      title: "Continuous Support",
      description: "Round-the-clock AI assistance handles changes, emergencies, and ensures smooth travel experiences."
    }
  ];

  return (
    <PageContainer>
      <FloatingShapes>
        {shapes.map((i) => (
          <Shape
            key={i}
            style={{
              width: Math.random() * 50 + 20,
              height: Math.random() * 50 + 20,
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
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          />
        ))}
      </FloatingShapes>

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
            Tourism
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            Transforming travel experiences with cutting-edge AI solutions for personalized tourism,
            intelligent booking systems, and seamless customer support
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
          <SectionTitle>AI Solutions for Tourism</SectionTitle>
          <MasonryGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </div>
              </FeatureCard>
            ))}
          </MasonryGrid>
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
          <TimelineContainer>
            {timelineSteps.map((step, index) => (
              <TimelineItem
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <TimelineContent side={index % 2 === 0 ? 'left' : 'right'}>
                  <TimelineTitle>{step.title}</TimelineTitle>
                  <TimelineDescription>{step.description}</TimelineDescription>
                </TimelineContent>
                <TimelineDot />
              </TimelineItem>
            ))}
          </TimelineContainer>
        </Section>

        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/landing#contact')}
        >
          Get Started with Tourism AI
        </CTAButton>
      </MainContent>
    </PageContainer>
  );
};

export default TourismPage;
