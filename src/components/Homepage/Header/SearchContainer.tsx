import styled from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";
import theme from "../../../utils/Theme/theme";
import { useUIStore } from "../../../stores";

function SearchContainer() {
  const { searchQuery, setSearchQuery } = useUIStore();

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <SearchContainerStyle>
      <SearchIcon>
        <FaSearch />
      </SearchIcon>
      <SearchInput
        type="search"
        placeholder="Rechercher un service, produit..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Rechercher un service ou produit"
      />
      {searchQuery && (
        <ClearButton onClick={handleClear} aria-label="Effacer la recherche">
          <FaTimes aria-hidden="true" />
        </ClearButton>
      )}
    </SearchContainerStyle>
  );
}

export default SearchContainer;

const SearchContainerStyle = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: ${theme.borderRadius.full};
  padding: 0.65rem 1.15rem;
  width: 100%;
  max-width: 480px;
  flex-shrink: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus-within {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(200, 150, 62, 0.4);
    box-shadow: 0 0 0 3px rgba(200, 150, 62, 0.1);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
  margin-right: 0.65rem;
  transition: color 0.3s ease;

  ${SearchContainerStyle}:focus-within & {
    color: ${theme.secondary};
  }
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  flex: 1;
  font-size: 0.9rem;
  color: ${theme.white};
  font-weight: 400;
  letter-spacing: 0.01em;

  &::placeholder {
    color: rgba(255, 255, 255, 0.35);
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }
`;

const ClearButton = styled.button`
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.6);
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  margin-left: 0.5rem;

  &:hover {
    background: rgba(239, 68, 68, 0.25);
    color: #fca5a5;
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid ${theme.secondary};
    outline-offset: 1px;
  }

  svg {
    font-size: 0.65rem;
  }
`;
