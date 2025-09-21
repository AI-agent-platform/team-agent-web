import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AgricultureImg from "../Assets/areas/aggriculture.jpg";
import barlyImg from "../Assets/areas/barly.jpg";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
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
  background: #a5d6a7;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: #062d03ff;
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    background: #e5e7eb;
  }

  @media (max-width: 480px) {
  font-size: 0.75rem;
  padding: 0.4rem 0.6rem;
}
`;


const HeaderSection = styled.div`
  position: relative;
  height: 200px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${barlyImg});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
  height: 150px;
}
`;

const FloatingImages = styled.div`
  position: absolute;
  top: -20px;
  right: 20px;
  display: flex;
  gap: 1rem;
  transform: perspective(800px) rotateX(15deg) rotateY(-10deg);
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
  color: ${props => props.$active ? '#10b981' : '#6b7280'};
  border-bottom: 2px solid ${props => props.$active ? '#10b981' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #10b981;
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
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
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
    color: #10b981;
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

// const ImageGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 1rem;
//   margin: 2rem 0;
//   @media (max-width: 768px) {
//   grid-template-columns: repeat(2, 1fr);
// }
// @media (max-width: 480px) {
//   grid-template-columns: 1fr;
// }

// `;

// const ImageCard = styled.div`
//   aspect-ratio: 4/3;
//   background: ${props => props.color || '#f3f4f6'};
//   border-radius: 8px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 2rem;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
// `;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  @media (max-width: 480px) {
  flex-direction: column;
}

`;


const ApplyButton = styled.button`
  flex: 2;
  background: #10b981;
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #059669;
  }
  @media (max-width: 480px) {
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
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
  color: #10b981;
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
  border-left: 4px solid #10b981;
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  background: #10b981;
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
  width: 4px;
  height: 4px;
  background: #10b981;
  border-radius: 50%;
  opacity: 0.2;
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

const AgriculturePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('solutions');
  const [elements] = useState(Array.from({ length: 8 }, (_, i) => i));

  const features = [
    {
      title: "Smart Crop Monitoring",
      description: "Advanced AI sensors and drones monitor crop health, detect diseases early, and optimize growth patterns for maximum yield."
    },
    {
      title: "Intelligent Irrigation",
      description: "AI-powered irrigation systems that automatically adjust water usage based on soil moisture, weather forecasts, and crop requirements."
    },
    {
      title: "Predictive Analytics",
      description: "Machine learning algorithms predict crop yields, market trends, and optimal planting times using historical and real-time data."
    },
    {
      title: "Automated Harvesting",
      description: "Robotic systems with computer vision that identify ripe crops and harvest them at the perfect time for maximum quality."
    },
    {
      title: "Climate Control",
      description: "Smart greenhouse systems that automatically regulate temperature, humidity, and lighting for optimal plant growth conditions."
    },
    {
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
      <SideImage src={AgricultureImg} alt="Decorative Agriculture" />
      <FloatingElements>
        {elements.map((i) => (
          <FloatingElement
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </FloatingElements>

      <MainCard>


        <CloseButton onClick={() => navigate('/landing#area')}>
          Back to Areas
        </CloseButton>

        <HeaderSection>
          <FloatingImages>

          </FloatingImages>
        </HeaderSection>

        <ContentSection>
          <Title>Agriculture AI Solutions</Title>

          <Description>
            Revolutionizing farming with cutting-edge AI solutions for sustainable agriculture,
            optimized crop yields, and intelligent resource management
          </Description>

          <TabContainer>
            <TabList>
              <Tab
                $active={activeTab === 'solutions'}
                onClick={() => setActiveTab('solutions')}
              >
                AI Solutions
              </Tab>
              <Tab
                $active={activeTab === 'implementation'}
                onClick={() => setActiveTab('implementation')}
              >
                Implementation Methods
              </Tab>
            </TabList>
          </TabContainer>

          <TabContent
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'solutions' && (
              <div>
                <Section>
                  <SectionTitle>Overview of Solutions</SectionTitle>
                  <Description>
                    Comprehensive AI-powered agricultural solutions designed to revolutionize farming practices,
                    optimize crop yields, and promote sustainable agriculture through cutting-edge technology
                    and intelligent resource management.
                  </Description>
                </Section>

                <Section>
                  <SectionTitle>Key Technologies</SectionTitle>
                  <List>
                    {features.map((feature, index) => (
                      <ListItem key={index}>
                        <strong>{feature.title}:</strong> {feature.description}
                      </ListItem>
                    ))}
                  </List>
                </Section>

                <Section>
                  <SectionTitle>Performance Metrics</SectionTitle>
                  <StatsGrid>
                    {stats.map((stat, index) => (
                      <StatCard key={index}>
                        <StatNumber>{stat.number}</StatNumber>
                        <StatLabel>{stat.label}</StatLabel>
                      </StatCard>
                    ))}
                  </StatsGrid>
                </Section>

                {/* <ImageGrid>
                  <ImageCard color="#dcfce7">🌱</ImageCard>
                  <ImageCard color="#dbeafe">📊</ImageCard>
                  <ImageCard color="#fef3c7">🤖</ImageCard>
                </ImageGrid> */}
              </div>
            )}

            {activeTab === 'implementation' && (
              <div>
                <Section>
                  <SectionTitle>Implementation Process</SectionTitle>
                  <Description>
                    Our systematic approach ensures seamless integration of AI technology into your
                    agricultural operations with minimal disruption and maximum efficiency.
                  </Description>
                </Section>

                <Section>
                  <SectionTitle>Step-by-Step Process</SectionTitle>
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


              </div>
            )}
          </TabContent>

          <ActionButtons>
            <ApplyButton onClick={() => navigate('/landing#contact')}>
              Get Started with Agriculture AI
            </ApplyButton>
          </ActionButtons>
        </ContentSection>
      </MainCard>
    </PageContainer>
  );
};

export default AgriculturePage;