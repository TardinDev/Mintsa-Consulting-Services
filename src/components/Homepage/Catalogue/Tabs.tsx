import styled from "styled-components";
import theme from "../../../utils/Theme/theme";

type TabsType = {
    activeTab: "all" | "voiture" | "home" | "electronic" | "terrain";
    onTabChange: (tab: "all" | "voiture" | "home" | "electronic" | "terrain") => void;
  }
  
  const Tabs: React.FC<TabsType> = ({ activeTab, onTabChange }) => {
    
    const tabs = [
      { id: "all", label: "Tout" },
      { id: "voiture", label: "Voiture" },
      { id: "home", label: "Maison" },
      { id: "electronic", label: "Appareils" },
      { id: "terrain", label: "Terrain" },
    ];
  
    return (
      <TabsContainer>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => onTabChange(tab.id as "all" | "voiture" | "home" | "electronic" | "terrain")}
          >
            {tab.label}
          </Tab>
        ))}
      </TabsContainer>
    );
  };
  
    export default Tabs;

  const TabsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  `;

  const Tab = styled.button<{ active: boolean }>`
    background: ${({ active }) => (active ? theme.gradientPrimary : theme.white)};
    color: ${({ active }) => (active ? theme.white : theme.gray700)};
    padding: 0.875rem 2rem;
    border: 2px solid ${({ active }) => (active ? theme.primary : theme.gray300)};
    cursor: pointer;
    border-radius: ${theme.borderRadius.full};
    font-weight: 600;
    font-size: 0.95rem;
    transition: all ${theme.transition.normal};
    position: relative;
    overflow: hidden;
    box-shadow: ${({ active }) => (active ? theme.shadowMd : theme.shadowSm)};

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: ${theme.primaryLight};
      transform: translate(-50%, -50%);
      transition: width 0.5s, height 0.5s;
    }

    &:hover::before {
      width: 300px;
      height: 300px;
    }

    & > * {
      position: relative;
      z-index: 1;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadowLg};
      border-color: ${theme.primary};
      color: ${({ active }) => (active ? theme.white : theme.primary)};
    }

    &:active {
      transform: translateY(0);
    }
  `;