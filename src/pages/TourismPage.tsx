import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Home, Plane, MapPin, Compass, Calendar, Users, TrendingUp } from "lucide-react"; 

const PageContainer = styled.div`
  min-height: 100vh;
  background: #d1fae5;
  position: relative;
  overflow-x: hidden;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
`;

const HomeIconButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(16, 185, 129, 0.1);
  }
`;

const AnimatedIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  color: #047857;
`;

const HeroSection = styled.section`
  padding: 150px 5% 80px;
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  min-height: 600px;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background-image: url(${require('../Assets/areas/tourism.jpg')});
    background-size: cover;
    background-position: center;
    mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%);
    -webkit-mask-image: linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%);
    z-index: 0;
  }

  @media (max-width: 968px) {
    &::before {
      width: 100%;
      mask-image: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%);
      -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%);
    }
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  width: 100%;
  text-align: left;
  position: relative;
  z-index: 1;
  padding-right: 2rem;

  @media (max-width: 968px) {
    text-align: center;
    max-width: 100%;
    padding-right: 0;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: left;
  color: #0f172a;

  @media (min-width: 768px) {
    font-size: 4rem;
  }

  @media (max-width: 968px) {
    text-align: center;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #475569;
  margin-bottom: 2rem;
  line-height: 1.8;
  text-align: left;

  @media (max-width: 968px) {
    text-align: center;
  }
`;

const HeroButton = styled(motion.button)`
  background: #047857;
  border: none;
  color: white;
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #10b981;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
  }
`;

const ContentSection = styled.section`
  background: white;
  padding: 80px 5%;
`;

const ImplementationSection = styled.section`
  background: #ecfdf5;
  padding: 80px 5%;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitleBase = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 3rem;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 2rem;
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.15);
  }
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #047857 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;

  svg {
    width: 32px;
    height: 32px;
  }
`;

const FeatureTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin: 3rem auto;
  max-width: 1200px;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background: #d1fae5;
  border: 2px solid #6ee7b7;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #10b981;
    transform: translateY(-4px);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #047857;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #065f46;
  font-size: 1rem;
  font-weight: 600;
`;

const ProcessTimeline = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 3rem auto;
  height: 450px;
`;

const RoadPath = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const AnimatedPath = styled(motion.path)`
  fill: none;
  stroke: #0d9488;
  stroke-width: 70;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const DashedPath = styled(motion.path)`
  fill: none;
  stroke: #d1fae5;
  stroke-width: 4;
  stroke-dasharray: 10 10;
  stroke-linecap: round;
`;

const ProcessStep = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 200px;
`;

const StepNumber = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #10b981;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
  cursor: pointer;
`;

const StepContent = styled(motion.div)`
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    box-shadow: 0 8px 24px rgba(13, 148, 136, 0.25);
    transform: translateY(-4px);
    border-color: #0d9488;
    background: #f0fdfa;
  }
`;

const StepTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: #6b7280;
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  justify-content: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ApplyButton = styled(motion.button)`
  background: #047857;
  border: none;
  color: white;
  padding: 14px 32px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #10b981;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const TourismPage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Plane, title: "Smart Travel Planning", description: "AI-powered travel recommendations based on preferences, budget, and real-time availability." },
    { icon: MapPin, title: "Intelligent Booking", description: "Automated booking systems that find the best deals, handle reservations, and manage travel itineraries." },
    { icon: Compass, title: "Personalized Experiences", description: "AI curates unique travel experiences, local recommendations, and activities tailored to individual preferences." },
    { icon: Calendar, title: "Virtual Travel Assistant", description: "24/7 AI travel companion providing real-time support, translations, and local information during trips." },
    { icon: TrendingUp, title: "Predictive Analytics", description: "Advanced analytics predict travel trends, optimize pricing, and improve customer satisfaction." },
    { icon: Users, title: "Global Connectivity", description: "Seamless integration with global travel systems, local services, and real-time updates across all platforms." }
  ];

  const stats = [
    { number: "85%", label: "Satisfaction Rate" },
    { number: "50%", label: "Cost Reduction" },
    { number: "24/7", label: "Support" },
    { number: "3x", label: "Efficiency" }
  ];

  const processSteps = [
    { title: "Travel Discovery", description: "AI analyzes user preferences, past travel history, and current trends to suggest optimal destinations and experiences." },
    { title: "Smart Booking", description: "Automated systems find the best prices, handle complex itineraries, and manage all travel arrangements." },
    { title: "Personalized Journey", description: "AI provides real-time recommendations, local insights, and personalized experiences throughout the trip." },
    { title: "Continuous Support", description: "Round-the-clock AI assistance handles changes, emergencies, and ensures smooth travel experiences." }
  ];

  return (
    <PageContainer>
      <NavBar>
        <Logo>
          <AnimatedIcon
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Plane size={28} />
          </AnimatedIcon>
          Tourism AI
        </Logo>
        <HomeIconButton
          onClick={() => navigate('/landing#area')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home size={24} color="#000000" />
        </HomeIconButton>
      </NavBar>

      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tourism AI Solutions
          </HeroTitle>

          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transforming travel experiences with AI-driven planning, booking, and personalized support for tourists worldwide.
          </HeroSubtitle>

          <HeroButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/landing#contact')}
          >
            Get Started
          </HeroButton>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <ContentContainer>
          <SectionTitleBase
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            AI Solutions
          </SectionTitleBase>

          <Section>
            <FeaturesGrid>
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <FeatureCard
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                  >
                    <FeatureIcon>
                      <IconComponent />
                    </FeatureIcon>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </FeatureCard>
                );
              })}
            </FeaturesGrid>
          </Section>

        </ContentContainer>
      </ContentSection>

      <ImplementationSection>
        <ContentContainer>
          <SectionTitleBase
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Implementation Methods
          </SectionTitleBase>

          <Section>
            <ProcessTimeline>
              <RoadPath viewBox="0 0 1000 300">
                <AnimatedPath
                  d="M 80 180 Q 200 80, 320 150 Q 440 220, 560 130 Q 680 40, 800 140 Q 880 200, 950 160"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
                <DashedPath
                  d="M 80 180 Q 200 80, 320 150 Q 440 220, 560 130 Q 680 40, 800 140 Q 880 200, 950 160"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
              </RoadPath>
              
              {processSteps.map((step, index) => {
                const positions = [
                  { left: '10%', top: '42%' },
                  { left: '32%', top: '28%' },
                  { left: '58%', top: '22%' },
                  { left: '83%', top: '35%' }
                ];
                
                const colors = ['#0d9488', '#0f766e', '#115e59', '#134e4a'];
                
                return (
                  <ProcessStep
                    key={index}
                    style={positions[index]}
                    initial={{ opacity: 0, scale: 0, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                  >
                    <StepNumber
                      style={{ background: colors[index] }}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, -5, 5, -5, 0],
                        y: [0, -10, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      whileHover={{ 
                        scale: 1.2,
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {index + 1}
                    </StepNumber>
                    <StepContent
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.3 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </StepContent>
                  </ProcessStep>
                );
              })}
            </ProcessTimeline>
          </Section>

          <ActionButtons>
            <ApplyButton
              onClick={() => navigate('/landing#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started with Tourism AI
            </ApplyButton>
          </ActionButtons>
        </ContentContainer>
      </ImplementationSection>
    </PageContainer>
  );
};

export default TourismPage;
