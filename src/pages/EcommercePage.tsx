import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import EcommerceImg from "../Assets/areas/ecom.jpg";
import ShoppingImg from "../Assets/areas/ecommerce.jpg";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
const SideImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;      
  height: 50%;
  object-fit: cover;
  opacity: 0.9;    
  border-radius: 0 0 0 0; /* optional curve */
  z-index: 0;
  @media (max-width: 768px) {
  height: 35%;
}
@media (max-width: 480px) {
  height: 25%;
}

`;

const MainCard = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
  border-radius: 12px;
}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: #667eea;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background: #f093fb;
    color: #000;
  }
  @media (max-width: 480px) {
  font-size: 0.75rem;
  padding: 0.4rem 0.6rem;
}
`;

const HeaderSection = styled.div`
  position: relative;
  height: 200px;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
    url(${ShoppingImg});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
  height: 150px;
}
`;

const ContentSection = styled.div`
  padding: 2rem;
  @media (max-width: 768px) {
  padding: 1.2rem;
  }
  @media (max-width: 480px) {
    padding: 1rem;
}
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
  text-align: center;
  @media (max-width: 768px) {
  font-size: 2rem;
}
@media (max-width: 480px) {
  font-size: 1.6rem;
}
`;

const Description = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const TabContainer = styled.div`
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;
`;

const TabList = styled.div`
  display: flex;
  gap: 0;
`;

const Tab = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.$active ? '#667eea' : '#6b7280'};
  border-bottom: 2px solid ${props => props.$active ? '#667eea' : 'transparent'};
  cursor: pointer;
  
  &:hover {
    color: #667eea;
  }
  @media (max-width: 480px) {
  flex: 1;
  text-align: center;
  padding: 0.75rem;
  font-size: 0.9rem;
}
`;

const TabContent = styled(motion.div)`
  min-height: 400px;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  color: #374151;
  line-height: 1.6;
  margin-bottom: 0.75rem;
  padding-left: 1rem;
  position: relative;
  
  &:before {
    content: '•';
    color: #667eea;
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin: 1.5rem 0;
  @media (max-width: 480px) {
  grid-template-columns: 1fr;
}
`;

const StatCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ProcessStep = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #667eea;
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
`;

const ApplyButton = styled.button`
  flex: 2;
  background: #667eea;
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #764ba2;
  }
  @media (max-width: 480px) {
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
}
`;

const EcommercePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("solutions");

  const features = [
    { title: "Smart Shopping Cart", description: "AI-powered cart optimization with intelligent product recommendations and dynamic pricing strategies." },
    { title: "Personalized Recommendations", description: "Advanced algorithms analyze user behavior to suggest products that match individual preferences and needs." },
    { title: "Inventory Management", description: "Predictive analytics optimize stock levels, reduce waste, and ensure products are always available." },
    { title: "AI Customer Support", description: "24/7 intelligent chatbots provide instant support, answer questions, and resolve issues efficiently." },
    { title: "Smart Search & Discovery", description: "Natural language search and visual product recognition help customers find exactly what they need." },
    { title: "Sales Optimization", description: "AI-driven pricing strategies, promotions, and marketing campaigns maximize conversion rates and revenue." }
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
      <SideImage src={EcommerceImg} alt="Decorative Agriculture" />
      <MainCard>
        <CloseButton onClick={() => navigate("/landing#area")}>
          Back to Areas
        </CloseButton>

        <HeaderSection />

        <ContentSection>
          <Title>E-commerce AI Solutions</Title>
          <Description>
            Revolutionizing online retail with cutting-edge AI for personalized shopping, inventory management, and enhanced customer experiences.
          </Description>

          <TabContainer>
            <TabList>
              <Tab $active={activeTab === "solutions"} onClick={() => setActiveTab("solutions")}>AI Solutions</Tab>
              <Tab $active={activeTab === "implementation"} onClick={() => setActiveTab("implementation")}>Implementation Methods</Tab>
            </TabList>
          </TabContainer>

          <TabContent
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "solutions" && (
              <Section>
                <SectionTitle>Key Features</SectionTitle>
                <List>
                  {features.map((feature, index) => (
                    <ListItem key={index}>
                      <strong>{feature.title}:</strong> {feature.description}
                    </ListItem>
                  ))}
                </List>

                <SectionTitle>Impact Metrics</SectionTitle>
                <StatsGrid>
                  {stats.map((stat, index) => (
                    <StatCard key={index}>
                      <StatNumber>{stat.number}</StatNumber>
                      <StatLabel>{stat.label}</StatLabel>
                    </StatCard>
                  ))}
                </StatsGrid>
              </Section>
            )}

            {activeTab === "implementation" && (
              <Section>
                <SectionTitle>Implementation Process</SectionTitle>
                {processSteps.map((step, index) => (
                  <ProcessStep key={index}>
                    <StepNumber>{index + 1}</StepNumber>
                    <StepContent>
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </StepContent>
                  </ProcessStep>
                ))}
              </Section>
            )}
          </TabContent>

          <ActionButtons>
            <ApplyButton onClick={() => navigate("/landing#contact")}>
              Get Started with E-commerce AI
            </ApplyButton>
          </ActionButtons>
        </ContentSection>
      </MainCard>
    </PageContainer>
  );
};

export default EcommercePage;
