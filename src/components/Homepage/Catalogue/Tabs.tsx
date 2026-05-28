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
      <TabsContainer role="tablist" aria-label="Filtrer le catalogue">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            $active={activeTab === tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
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
    gap: 0.6rem;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;

    @media (max-width: ${theme.breakpoints.sm}) {
      justify-content: center;
    }
  `;

  const Tab = styled.button<{ $active: boolean }>`
    font-family: ${theme.fontBody};
    background: ${({ $active }) => ($active ? theme.gradientGold : 'transparent')};
    color: ${({ $active }) => ($active ? theme.black : theme.gray600)};
    padding: 0.6rem 1.35rem;
    border: 1px solid ${({ $active }) => ($active ? 'transparent' : theme.lineStrong)};
    cursor: pointer;
    border-radius: ${theme.borderRadius.full};
    font-weight: ${({ $active }) => ($active ? 700 : 600)};
    font-size: 0.88rem;
    letter-spacing: 0.01em;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: ${({ $active }) => ($active ? theme.shadowCopper : 'none')};

    &:hover {
      ${({ $active }) =>
        $active
          ? ''
          : `
        border-color: ${theme.copperLine};
        color: ${theme.white};
        background: rgba(199, 123, 59, 0.08);
      `}
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    &:focus-visible {
      outline: 2px solid ${theme.primary};
      outline-offset: 3px;
    }
  `;
