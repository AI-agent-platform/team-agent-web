import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import EcommerceImg from "../Assets/areas/ecom.jpg";
import { Home, ShoppingBag, ShoppingCart, Users as UsersIcon, TrendingUp, Search, BarChart3 } from "lucide-react";

const PageContainer = styled.div`
  min-height: 100vh;
  background: #e0e7ff;
  position: relative;
  overflow-x: hidden;
`;

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HomeIconButton = styled(motion.div)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const AnimatedIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: #667eea;
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
    background-image: url(${EcommerceImg});
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
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 2rem;
  text-align: left;

  @media (max-width: 968px) {
    text-align: center;
  }
`;

const HeroButton = styled(motion.button)`
  background: #667eea;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #764ba2;
    transform: translateY(-2px);
  }
`;

const ContentSection = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const ImplementationSection = styled.section`
  padding: 5rem 2rem;
  background: #f5f3ff;
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitleBase = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  margin-bottom: 3rem;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  color: #64748b;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background: #f8fafc;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  svg {
    width: 32px;
    height: 32px;
  }
`;

const FeatureTitle = styled.h4`
  font-size: 1.2rem;
  color: #0f172a;
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const StatCard = styled(motion.div)`
  background: #ede9fe;
  border: 1px solid #c4b5fd;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
`;

const ProcessTimeline = styled.div`
  position: relative;
  margin-top: 3rem;
  height: 450px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 968px) {
    height: auto;
  }
`;

const RoadPath = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
  
  @media (max-width: 968px) {
    display: none;
  }
`;

const AnimatedPath = styled(motion.path)`
  fill: none;
  stroke: #667eea;
  stroke-width: 70;
  stroke-linecap: round;
`;

const DashedPath = styled(motion.path)`
  fill: none;
  stroke: #ffffff;
  stroke-width: 3;
  stroke-dasharray: 20, 15;
  stroke-linecap: round;
`;

const ProcessStep = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  
  @media (max-width: 968px) {
    position: relative;
    margin-bottom: 3rem;
    flex-direction: row;
    gap: 1.5rem;
  }
`;

const StepNumber = styled(motion.div)`
  width: 100px;
  height: 100px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
  border: 5px solid white;
  margin-bottom: 1rem;
  position: relative;
  
  @media (max-width: 968px) {
    width: 80px;
    height: 80px;
    font-size: 1.3rem;
    margin-bottom: 0;
  }
`;

const StepContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  max-width: 250px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }
  
  @media (max-width: 968px) {
    max-width: 100%;
    flex: 1;
  }
`;

const StepTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: #64748b;
  font-size: 0.85rem;
  line-height: 1.6;
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
  background: #667eea;
  border: none;
  color: white;
  padding: 14px 32px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #764ba2;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const EcommercePage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: ShoppingCart, title: "Smart Shopping Cart", description: "AI-powered cart optimization with intelligent product recommendations and dynamic pricing strategies." },
    { icon: UsersIcon, title: "Personalized Recommendations", description: "Advanced algorithms analyze user behavior to suggest products that match individual preferences and needs." },
    { icon: BarChart3, title: "Inventory Management", description: "Predictive analytics optimize stock levels, reduce waste, and ensure products are always available." },
    { icon: ShoppingBag, title: "AI Customer Support", description: "24/7 intelligent chatbots provide instant support, answer questions, and resolve issues efficiently." },
    { icon: Search, title: "Smart Search & Discovery", description: "Natural language search and visual product recognition help customers find exactly what they need." },
    { icon: TrendingUp, title: "Sales Optimization", description: "AI-driven pricing strategies, promotions, and marketing campaigns maximize conversion rates and revenue." }
  ];

  const stats = [
    { number: "35%", label: "Conversion Increase" },
    { number: "60%", label: "Customer Retention" },
    { number: "24/7", label: "Availability" },
    { number: "3x", label: "Revenue Growth" }
  ];

  const processSteps = [
    { title: "Customer Journey Analysis", description: "AI tracks and analyzes customer behavior across all touchpoints to understand preferences and pain points." },
    { title: "Personalized Experience", description: "Dynamic content, recommendations, and pricing are tailored to each customer's unique profile and behavior." },
    { title: "Intelligent Operations", description: "Automated inventory management, order processing, and customer support ensure seamless operations." },
    { title: "Continuous Optimization", description: "AI continuously learns and improves based on real-time data to enhance customer experience and business performance." }
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
            <ShoppingBag size={28} />
          </AnimatedIcon>
          E-commerce AI
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
            E-commerce AI Solutions
          </HeroTitle>

          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Revolutionizing online retail with cutting-edge AI for personalized shopping, inventory management, and enhanced customer experiences.
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
                
                const colors = ['#667eea', '#764ba2', '#5a67d8', '#553c9a'];
                
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
              Get Started with E-commerce AI
            </ApplyButton>
          </ActionButtons>
        </ContentContainer>
      </ImplementationSection>
    </PageContainer>
  );
};

export default EcommercePage;
