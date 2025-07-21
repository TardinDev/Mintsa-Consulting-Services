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
    justify-content: flex-start;
    gap: 4px;
    margin-bottom: 10px;
  `;
  
  const Tab = styled.button<{ active: boolean }>`
    background: ${({ active }) => (active ? "#333" : "#eee")};
    color: ${({ active }) => (active ? `${theme.white}` : "#333")};
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  
    &:hover {
      background: ${theme.grey};
    }
  `;