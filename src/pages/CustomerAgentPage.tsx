// import React, { useState } from "react";
import { motion, /*AnimatePresence*/ } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RagImg from "../Assets/RAGarchitecture.jpg";
import {
  BarChart3,
  Bot,
  TrendingUp,
  MessageSquare,
  Settings,
  Shield,
  Home,
  Users,
  User,
  Brain,
  Search,
  Target,
  Zap,
  Smartphone
} from "lucide-react";

const PageContainer = styled.div`
  min-height: 100vh;
  background: #beeaefff;
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

const AnimatedBotIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: #6366f1;
`;

const HeroSection = styled.section`
  padding: 150px 5% 80px;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroContent = styled.div`
  max-width: 500px;
  max-width:  100%;
  width: 100%;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 2rem;
  text-align: center;
`;

const HeroButton = styled(motion.button)`
  background: #54559fff;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #675df8ff;
    transform: translateY(-2px);
  }
`;

const HeroVisual = styled(motion.div)`
  margin-top: 3rem;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
`;


const Section = styled.section`
  padding: 80px 5%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitleBase = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = SectionTitleBase;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #ede9fe;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  color: #6366f1;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const FeatureTitle = styled.h3`
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


const ProcessSection = styled.section`
  padding: 5rem 2rem 6rem 2rem;
  background: #eff5f2ff;
`;

const ProcessContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const ProcessTimeline = styled.div`
  position: relative;
  margin-top: 4rem;
  padding: 3rem 0;
  height: 450px;
`;

const RoadPath = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const AnimatedPath = styled(motion.path)`
  fill: none;
  stroke: #1e293b;
  stroke-width: 70;
  stroke-linecap: round;
`;

const DashedPath = styled(motion.path)`
  fill: none;
  stroke: #ffffff;
  stroke-width: 4;
  stroke-dasharray: 20, 15;
  stroke-linecap: round;
`;

const ProcessStep = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  
  @media (max-width: 768px) {
    position: relative;
    margin-bottom: 3rem;
  }
`;

const StepNumber = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border: 5px solid white;
  margin-bottom: 1rem;
  position: relative;
  
  svg {
    width: 45px;
    height: 45px;
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    
    svg {
      width: 35px;
      height: 35px;
    }
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
    border-color: #eeeef5ff;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const StepTitle = styled.h3`
  font-size: 1.1rem;
  color: #0f172a;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const StepDescription = styled.p`
  color: #64748b;
  line-height: 1.5;
  font-size: 0.85rem;
`;

const CTASection = styled.section`
  padding: 80px 5%;
  background: #a7a7edff;
  color: white;
  text-align: center;
`;

const CTATitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CTASubtitle = styled(motion.p)`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(motion.button)`
  background: white;
  color: #5152b3ff;
  border: none;
  padding: 16px 32px;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  }
`;

const CustomerAgentPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: "24/7 Customer Support",
      description: "Round-the-clock intelligent customer service with instant responses and personalized assistance."
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description: "AI-powered product and service recommendations based on customer preferences and behavior."
    },
    {
      icon: Zap,
      title: "Real-time Interaction",
      description: "Instant responses and dynamic conversations that adapt to customer needs and context."
    },
    {
      icon: Smartphone,
      title: "Multi-channel Support",
      description: "Seamless support across web, mobile, social media, and messaging platforms."
    },
    {
      icon: Search,
      title: "Smart Problem Resolution",
      description: "Intelligent troubleshooting and issue resolution with step-by-step guidance."
    },
    {
      icon: BarChart3,
      title: "Customer Analytics",
      description: "Deep insights into customer behavior, satisfaction, and engagement patterns."
    }
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
      <NavBar>
        <Logo>
          <AnimatedBotIcon
            animate={{
              scale: [1, 1.15, 1],
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Users size={28} />
          </AnimatedBotIcon>
          Customer Agent
          
        </Logo>
        <HomeIconButton
          onClick={() => navigate('/landing#what-we-offer')}
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
      About Customer Agent
    </HeroTitle>

    <HeroSubtitle
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      Your intelligent customer service partner that provides support, recommendations, 
      and real-time interaction to enhance customer satisfaction and drive business growth.

    </HeroSubtitle>

    <HeroButton
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        const section = document.getElementById("how-it-works");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }}
    >
      Learn more
    </HeroButton>
  </HeroContent>

  <HeroVisual
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1.05 }}
    transition={{ duration: 1, delay: 0.3 }}
  >
    <img
      src={RagImg}
      alt="Dashboard Preview"
      className="w-full h-auto max-w-2xl mx-auto drop-shadow-xl rounded-xl"
    />
  </HeroVisual>
</HeroSection>

  
        <Section>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Key Features
          </SectionTitle>

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

      <ProcessSection>
        <ProcessContainer>
          <div id="how-it-works">
            <SectionTitle
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              How It Works
            </SectionTitle>
          </div>


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
              
              const colors = ['#22d3ee', '#a3e635', '#fb923c', '#f472b6'];
              const IconComponent = [User, Brain, Bot, TrendingUp][index];
              
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
                    style={{ background: colors[index], color: 'white' }}
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
                    <IconComponent />
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
        </ProcessContainer>
      </ProcessSection>

      <CTASection>
        <CTATitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Ready to Get Started?
        </CTATitle>
        <CTASubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join our framework to generate your own AI-powered Customer Agent and revolutionize your business operations today.
        </CTASubtitle>
        <CTAButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/landing#what-we-offer')}
        >
          Start Your Journey
        </CTAButton>
      </CTASection>
    </PageContainer>
  );
};

export default CustomerAgentPage;