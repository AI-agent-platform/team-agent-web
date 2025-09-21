import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CustomerAgentImg from "../Assets/what-we-offer/customer.jpg";
import {
  MessageSquare,
  Target,
  Zap,
  Smartphone,
  Search,
  BarChart3
} from "lucide-react";

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
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
`;

const BackButton = styled(motion.button)`
  background: #6366f1;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #4f46e5;
    transform: translateY(-1px);
  }
`;

const HeroSection = styled.section`
  padding: 120px 5% 80px;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  max-width: 500px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  margin-bottom: 1.5rem;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const HeroButton = styled(motion.button)`
  background: #6366f1;
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #4f46e5;
    transform: translateY(-2px);
  }
`;

const HeroVisual = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const MockupCard = styled.div`
  background: #f1f5f9;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  
  .header {
    display: flex;
    align-items: center;
    justify-content: between;
    margin-bottom: 1rem;
    
    .title {
      font-weight: 600;
      color: #1e293b;
    }
    
    .status {
      background: #10b981;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
      margin-left: auto;
    }
  }
  
  .content {
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  
  .stat {
    text-align: left;
    
    .number {
      font-size: 1.5rem;
      font-weight: 700;
      color: #6366f1;
    }
    
    .label {
      font-size: 0.6rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
`;

const Section = styled.section`
  padding: 80px 5%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  margin-bottom: 3rem;
`;

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

const MetricsSection = styled.section`
  padding: 80px 5%;
  background: white;
`;

const MetricsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const MetricCard = styled(motion.div)`
  text-align: center;
`;

const MetricNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #6366f1;
  margin-bottom: 0.5rem;
`;

const MetricLabel = styled.div`
  color: #64748b;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
`;

const ProcessSection = styled.section`
  padding: 80px 5%;
  background: #f8fafc;
`;

const ProcessContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ProcessTimeline = styled.div`
  position: relative;
  margin-top: 4rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e2e8f0;
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const ProcessStep = styled(motion.div)`
  position: relative;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    .content {
      text-align: right;
    }
    
    @media (max-width: 768px) {
      flex-direction: row;
      
      .content {
        text-align: left;
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const StepNumber = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: #6366f1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  z-index: 10;
  
  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin-right: 1.5rem;
    flex-shrink: 0;
  }
`;

const StepContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: calc(50% - 2rem);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StepTitle = styled.h3`
  font-size: 1.3rem;
  color: #0f172a;
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const StepDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const CTASection = styled.section`
  padding: 80px 5%;
  background: #6366f1;
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
  color: #6366f1;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
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
  const [particles] = useState(Array.from({ length: 20 }, (_, i) => i));

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
      <NavBar>
        <Logo>Customer Agent</Logo>
        <BackButton
          onClick={() => navigate('/landing#what-we-offer')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back to Home
        </BackButton>
      </NavBar>

      <HeroSection>
        <HeroGrid>
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <MockupCard>
              <div className="header">
                <span className="title">Customer Support Hub</span>
                <span className="status">Active</span>
              </div>
              <div className="content">
                AI-powered customer service providing instant support and personalized assistance across all channels.
              </div>
            </MockupCard>

            <MockupCard>
              <div className="header">
                <span className="title">Smart Recommendations</span>
                <span className="status">Learning</span>
              </div>
              <div className="content">
                Intelligent product recommendations and personalized solutions based on customer behavior and preferences.
              </div>
            </MockupCard>

            <StatsRow>
              <div className="stat">
                <div className="number">95%</div>
                <div className="label">Satisfaction Rate</div>
              </div>
              <div className="stat">
                <div className="number">24/7</div>
                <div className="label">Availability</div>
              </div>
            </StatsRow>
          </HeroVisual>
        </HeroGrid>
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

      <MetricsSection>
        <MetricsContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Performance Metrics
          </SectionTitle>

          <MetricsGrid>
            {stats.map((metric, index) => (
              <MetricCard
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <MetricNumber>{metric.number}</MetricNumber>
                <MetricLabel>{metric.label}</MetricLabel>
              </MetricCard>
            ))}
          </MetricsGrid>
        </MetricsContainer>
      </MetricsSection>

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
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <StepNumber>{index + 1}</StepNumber>
                <StepContent className="content">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepContent>
              </ProcessStep>
            ))}
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
          Transform your customer service with intelligent AI that provides personalized support and drives satisfaction.
        </CTASubtitle>
        <CTAButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/landing#what-we-offer')}
        >
          Get Started with Customer Agent
        </CTAButton>
      </CTASection>
    </PageContainer>
  );
};

export default CustomerAgentPage;